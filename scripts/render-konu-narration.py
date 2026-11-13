"""Turn lesson paragraphs into MP3 and sample-based paragraph timings."""

import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
from supertonic import TTS

ARABIC_WORD = r"[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]+"
ARABIC = re.compile(rf"{ARABIC_WORD}(?:\s+{ARABIC_WORD})*")
QURAN_ANNOTATIONS = re.compile(r"[\u06d6-\u06e0\u06e2-\u06ed\u0640]")
ARABIC_SPEECH_MARKS = str.maketrans({"ٱ": "ا", "ۡ": "ْ", "ٗ": "ً"})


def speakable_turkish(text):
    # Typography in older headings is uppercase; feed Turkish casing to the voice.
    if len(re.findall(r"[^\W\d_]+", text, re.UNICODE)) >= 2 and text.isupper():
        return text.translate(str.maketrans({"I": "ı", "İ": "i"})).lower()
    return text


def split_long_passage(text, limit=360):
    """Keep long Turkish quotations inside the model's comfortable input length."""
    text = text.strip()
    while len(text) > limit:
        window = text[:limit + 1]
        sentence_ends = list(re.finditer(r"[.!?…][”’\"]?\s+", window))
        clauses = list(re.finditer(r"[,;:]\s+", window))
        pauses = [m for m in sentence_ends if m.end() >= limit // 2] or clauses
        cut = pauses[-1].end() if pauses and pauses[-1].end() >= limit // 2 else window.rfind(" ")
        if cut <= 0:
            break
        yield text[:cut].rstrip()
        text = text[cut:].lstrip()
    if text:
        yield text


class MlxTts:
    def __init__(self):
        import mlx.core as mx
        from supertonic_3_mlx import Pipeline

        # Bound the temporary allocator cache during long runs with many paragraph lengths.
        mx.set_cache_limit(256 * 1024 * 1024)
        model_dir = Path(os.environ.get("SUPERTONIC_MODEL_DIR", Path.home() / ".cache/supertonic3"))
        self.pipeline = Pipeline.from_pretrained(model_dir)
        self.sample_rate = self.pipeline.sample_rate

    def get_voice_style(self, voice_name):
        return voice_name

    def synthesize(self, text, voice_style, *, lang, **_settings):
        signal = self.pipeline.generate(text, voice=voice_style, lang=lang, n_steps=12, seed=23)
        return signal[None, :], [signal.size / self.sample_rate]


def render(tts, style, job):
    samples = 0
    cues = []
    rate = tts.sample_rate
    output = Path(job["output"])
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=output.parent) as tmp:
        wav_path = Path(tmp) / "speech.wav"
        with sf.SoundFile(wav_path, "w", rate, 1, subtype="PCM_16") as wav:
            for paragraph in job["paragraphs"]:
                start = samples
                for part in re.split(f"({ARABIC.pattern})", paragraph):
                    if not any(c.isalnum() for c in part):
                        continue
                    language = "ar" if ARABIC.fullmatch(part) else "tr"
                    if language == "tr":
                        phrases = split_long_passage(speakable_turkish(part))
                    else:
                        phrases = [QURAN_ANNOTATIONS.sub("", part.translate(ARABIC_SPEECH_MARKS)).strip()]
                    for phrase in phrases:
                        if samples > start:
                            gap = round(rate * 0.10)
                            wav.write(np.zeros(gap, dtype=np.float32))
                            samples += gap
                        speech, duration = tts.synthesize(
                            phrase, style, lang=language, speed=1.0, total_steps=12,
                            max_chunk_length=max(360, len(phrase) + 1),
                        )
                        signal = speech[0, :round(float(duration[0]) * rate)]
                        if not signal.size or not np.isfinite(signal).all():
                            raise ValueError(f"Geçersiz ses: {paragraph}")
                        if np.max(np.abs(signal)) < 0.003:
                            raise ValueError(f"Duyulabilir ses üretilemedi: {paragraph}")
                        wav.write(signal)
                        samples += signal.size
                if samples == start:
                    raise ValueError(f"Boş ses: {paragraph}")
                cues.append({"start": round(start / rate, 4), "end": round(samples / rate, 4)})
                gap = round(rate * 0.10)
                wav.write(np.zeros(gap, dtype=np.float32))
                samples += gap
        mp3_path = Path(tmp) / "speech.mp3"
        subprocess.run(
            ["ffmpeg", "-nostdin", "-v", "error", "-i", wav_path, "-ac", "1", "-codec:a", "libmp3lame", "-b:a", "64k", mp3_path],
            check=True,
        )
        mp3_path.replace(output)
    output.with_suffix(".json").write_text(json.dumps(cues), encoding="utf-8")


def main():
    jobs = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    engine = sys.argv[2] if len(sys.argv) > 2 else "onnx"
    tts = MlxTts() if engine == "mlx" else TTS(
        model="supertonic-3",
        auto_download=True,
        intra_op_num_threads=int(os.environ.get("SUPERTONIC_INTRA_OP_THREADS", "4")),
        inter_op_num_threads=1,
    )
    styles = {voice: tts.get_voice_style(voice) for voice in {job["voice"] for job in jobs}}
    for job in jobs:
        output = Path(job["output"])
        if output.is_file() and output.with_suffix(".json").is_file():
            continue
        render(tts, styles[job["voice"]], job)
        print(f'{job["output"]}: {len(job["paragraphs"])} paragraf', flush=True)


if __name__ == "__main__":
    main()
