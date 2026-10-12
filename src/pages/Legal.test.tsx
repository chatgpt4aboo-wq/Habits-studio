import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Legal from "./Legal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { legal } from "@/data/legal";
import { policies } from "@/data/policies";

const future = { v7_startTransition: true, v7_relativeSplatPath: true };

describe("legal pages", () => {
  it("gives every document a unique slug and something to read", () => {
    expect(new Set(legal.map((doc) => doc.slug)).size).toBe(legal.length);
    for (const doc of legal) {
      expect(doc.sections.length).toBeGreaterThan(0);
      for (const section of doc.sections) expect(section.paragraphs.length).toBeGreaterThan(0);
    }
  });

  it("quotes the returns window from the policies, not a copy of it", () => {
    const terms = legal.find((doc) => doc.slug === "terms")!;
    const text = terms.sections.flatMap((section) => section.paragraphs).join(" ");
    expect(text).toContain(policies.returns.window);
  });

  it("renders a document with links to the others", () => {
    render(
      <MemoryRouter initialEntries={["/privacy"]} future={future}>
        <Legal doc={legal[1]} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(legal[1].title);
    const nav = screen.getByRole("navigation", { name: "Legal" });
    expect(within(nav).getAllByRole("link")).toHaveLength(legal.length);
  });
});

describe("footer", () => {
  it("carries contact, shipping and every legal page under Help", () => {
    render(
      <MemoryRouter future={future}>
        <SiteFooter />
      </MemoryRouter>,
    );
    const help = screen.getByRole("navigation", { name: "Help" });
    const hrefs = within(help)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(["/contact", "/shipping", ...legal.map((doc) => `/${doc.slug}`)]);
  });
});
