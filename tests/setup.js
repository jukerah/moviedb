import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// executa uma limpeza após cada caso de teste (por exemplo, limpar jsdom)
afterEach(() => {
  cleanup();
});
