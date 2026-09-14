import { describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { BagProvider, parseBag, useBag } from "./store";
import { pieces } from "@/data/collection";

function Probe() {
  const bag = useBag();
  return (
    <div>
      <p data-testid="count">{bag.count}</p>
      <p data-testid="subtotal">{bag.subtotal}</p>
      <button onClick={() => bag.add(pieces[0].slug, "M")}>add</button>
      <button onClick={() => bag.add(pieces[1].slug, "M", 2)}>add two</button>
      <button onClick={() => bag.setQuantity(pieces[0].slug, "M", 4)}>set four</button>
      <button onClick={() => bag.setQuantity(pieces[0].slug, "M", 0)}>set zero</button>
      <button onClick={() => bag.remove(pieces[1].slug, "M")}>remove</button>
      <button onClick={bag.clear}>clear</button>
    </div>
  );
}

function setup(initial: Parameters<typeof BagProvider>[0]["initial"] = []) {
  render(
    <BagProvider initial={initial}>
      <Probe />
    </BagProvider>,
  );
  return {
    count: () => Number(screen.getByTestId("count").textContent),
    subtotal: () => Number(screen.getByTestId("subtotal").textContent),
    press: (name: string) => act(() => screen.getByRole("button", { name }).click()),
  };
}

describe("the bag", () => {
  it("starts empty and totals nothing", () => {
    const bag = setup();
    expect(bag.count()).toBe(0);
    expect(bag.subtotal()).toBe(0);
  });

  it("adds a piece and totals it at 75", () => {
    const bag = setup();
    bag.press("add");
    expect(bag.count()).toBe(1);
    expect(bag.subtotal()).toBe(75);
  });

  it("stacks a repeat add onto the same line", () => {
    const bag = setup();
    bag.press("add");
    bag.press("add");
    expect(bag.count()).toBe(2);
    expect(bag.subtotal()).toBe(150);
  });

  it("totals a mixed bag", () => {
    const bag = setup();
    bag.press("add");
    bag.press("add two");
    expect(bag.count()).toBe(3);
    expect(bag.subtotal()).toBe(225);
  });

  it("changes quantity, and a quantity of zero removes the line", () => {
    const bag = setup();
    bag.press("add");
    bag.press("set four");
    expect(bag.count()).toBe(4);
    bag.press("set zero");
    expect(bag.count()).toBe(0);
  });

  it("removes and clears", () => {
    const bag = setup();
    bag.press("add");
    bag.press("add two");
    bag.press("remove");
    expect(bag.count()).toBe(1);
    bag.press("clear");
    expect(bag.count()).toBe(0);
  });

  it("restores a stored bag", () => {
    const bag = setup([{ slug: pieces[0].slug, size: "M", quantity: 2 }]);
    expect(bag.count()).toBe(2);
    expect(bag.subtotal()).toBe(150);
  });
});

describe("stored bags are untrusted", () => {
  it("drops anything that is not a real line", () => {
    expect(parseBag(null)).toEqual([]);
    expect(parseBag("not json")).toEqual([]);
    expect(parseBag('{"nope":1}')).toEqual([]);
    expect(
      parseBag(
        JSON.stringify([
          { slug: pieces[0].slug, size: "M", quantity: 2 },
          { slug: "deleted-piece", size: "M", quantity: 1 },
          { slug: pieces[0].slug, size: "XXL", quantity: 1 },
          { slug: pieces[0].slug, size: "M", quantity: 0 },
          { slug: pieces[0].slug, size: "M", quantity: "lots" },
          "junk",
        ]),
      ),
    ).toEqual([{ slug: pieces[0].slug, size: "M", quantity: 2 }]);
  });

  it("caps a silly quantity", () => {
    expect(parseBag(JSON.stringify([{ slug: pieces[0].slug, size: "M", quantity: 9999 }]))).toEqual(
      [{ slug: pieces[0].slug, size: "M", quantity: 10 }],
    );
  });
});
