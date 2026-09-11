import { describe, expect, it } from "bun:test";
import manifest from "./manifest";

describe("PWA Web App Manifest", () => {
  it("should return valid manifest configuration", () => {
    const config = manifest();

    expect(config.name).toBe("JetAcademie | Modern Full-Stack Starter");
    expect(config.short_name).toBe("JetAcademie");
    expect(config.start_url).toBe("/");
    expect(config.display).toBe("standalone");
    expect(config.orientation).toBe("any");
    expect(config.background_color).toBe("#140205");
    expect(config.theme_color).toBe("#be123c");
  });

  it("should include necessary icons with maskable support", () => {
    const config = manifest();
    expect(config.icons).toBeDefined();
    expect(config.icons?.length).toBe(3);

    const icon192 = config.icons?.find((i) => i.sizes === "192x192");
    expect(icon192).toBeDefined();
    expect(icon192?.src).toBe("/icon-192.png");
    expect(icon192?.type).toBe("image/png");

    const icon512 = config.icons?.find((i) => i.sizes === "512x512" && !i.purpose);
    expect(icon512).toBeDefined();
    expect(icon512?.src).toBe("/icon-512.png");

    const maskable512 = config.icons?.find((i) => i.purpose === "maskable");
    expect(maskable512).toBeDefined();
    expect(maskable512?.sizes).toBe("512x512");
  });
});
