import { describe, expect, it } from "bun:test";
import { renderToString } from "react-dom/server";
import TargetsPage from "./page";

describe("TargetsPage", () => {
  it("selects the requested class from the sinif query parameter", async () => {
    const page = await TargetsPage({ searchParams: Promise.resolve({ sinif: "4" }) });
    const html = renderToString(page);

    expect(html).toContain("M4 Müfredatına Git");
    expect(html).toContain("/mufredat?sinif=4");
  });

  it("falls back to M1 for a non-integer class", async () => {
    const page = await TargetsPage({ searchParams: Promise.resolve({ sinif: "1.5" }) });
    const html = renderToString(page);

    expect(html).toContain("M1 Müfredatına Git");
    expect(html).toContain("/mufredat?sinif=1");
  });
});
