import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { PageHeader } from "./page-header";

describe("PageHeader", () => {
  it("renders a centered h1 with standardized typography classes", () => {
    const html = renderToString(<PageHeader title="Hedefler ve Yıllık Planlar" />);

    expect(html).toContain("Hedefler ve Yıllık Planlar");
    expect(html).toContain("page-header");
    expect(html).toContain("text-center");
    expect(html).toContain("page-header__title");
    expect(html).toContain("text-zinc-900");
    expect(html).toContain("dark:text-white");
  });
});
