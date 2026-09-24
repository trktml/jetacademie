import { describe, expect, it } from "bun:test";
import { GET } from "./route";

describe("curriculum API", () => {
  it("returns only the requested grade", async () => {
    const response = await GET(new Request("http://localhost/api/curriculum?sinif=4"));
    const entries = (await response.json()) as Array<{ grade: number }>;

    expect(response.status).toBe(200);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.grade === 4)).toBe(true);
  });

  it("rejects missing and invalid grades before querying", async () => {
    for (const query of ["", "?sinif=0", "?sinif=7", "?sinif=2.5", "?sinif=abc"]) {
      const response = await GET(new Request(`http://localhost/api/curriculum${query}`));
      expect(response.status).toBe(400);
    }
  });
});
