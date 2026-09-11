import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { QueryProvider } from "./query-provider";
import { useQueryClient, QueryClient } from "@tanstack/react-query";

function TestConsumer() {
  const queryClient = useQueryClient();
  const isClientValid = queryClient instanceof QueryClient;
  return <div data-testid="consumer">{isClientValid ? "CLIENT_VALID" : "NO_CLIENT"}</div>;
}

describe("QueryProvider", () => {
  it("should render children correctly during server-side rendering", () => {
    const html = renderToString(
      <QueryProvider>
        <span id="child-element">Provider Content</span>
      </QueryProvider>
    );

    expect(html).toContain("Provider Content");
    expect(html).toContain('id="child-element"');
  });

  it("should supply QueryClient context to descendant components", () => {
    const html = renderToString(
      <QueryProvider>
        <TestConsumer />
      </QueryProvider>
    );

    expect(html).toContain("CLIENT_VALID");
  });
});
