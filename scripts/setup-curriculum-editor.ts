import { randomBytes } from "node:crypto";
import { chmod } from "node:fs/promises";
import { hashEditorPassword } from "../src/lib/editor/auth";

const envFile = Bun.file(".env");
const contents = (await envFile.exists()) ? await envFile.text() : "";
if (/^CURRICULUM_ADMIN_PASSWORD_HASH=.+$/m.test(contents) && !Bun.argv.includes("--rotate")) {
  console.log(
    "Editor credentials already exist. Use --rotate to explicitly replace them and revoke existing sessions."
  );
  process.exit(0);
}
const username = "mufredat-admin";
const password = `Ja!${randomBytes(18).toString("base64url")}`;
const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const values: Record<string, string> = {
  CURRICULUM_ADMIN_USERNAME: username,
  CURRICULUM_ADMIN_PASSWORD_HASH: await hashEditorPassword(password),
  CURRICULUM_ADMIN_SECRET: randomBytes(32).toString("hex"),
  CURRICULUM_ADMIN_ORIGIN: origin,
};
let updated = contents;
for (const [key, value] of Object.entries(values)) {
  const pattern = new RegExp(`^${key}=.*$`, "m");
  updated = pattern.test(updated)
    ? updated.replace(pattern, `${key}=${value}`)
    : `${updated.trimEnd()}\n${key}=${value}\n`;
}
await Bun.write(".env", updated);
await chmod(".env", 0o600);
console.log(
  `Editor configured in ignored .env.\nUsername: ${username}\nPassword: ${password}\nAddress: ${origin}/duzenle\nStore the password securely; .env contains only its scrypt hash. Production needs the generated editor secrets and its external HTTPS origin.`
);
