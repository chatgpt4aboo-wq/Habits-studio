/**
 * Contact details, shipping and returns.
 *
 * ⚠ THESE ARE PLACEHOLDERS. Every value listed in `needsConfirming` below is a
 * conventional default, not a fact about this business — the address does not
 * exist, and nobody has agreed to a returns window. Replace them before the
 * site is public. They live here, in one file, precisely so that is a five
 * minute job rather than a hunt through the pages.
 */

export const policies = {
  contact: {
    email: "hello@habitsstudio.com",
    instagram: "@habitsstudio",
    /** What each address is actually for, so mail lands in the right place. */
    lines: [
      { label: "Orders", detail: "Anything about a piece you have bought or are about to." },
      { label: "Press & stockists", detail: "Lookbook, line sheet and wholesale terms on request." },
    ],
  },

  shipping: {
    from: "Los Angeles",
    domestic: { where: "United States", time: "3–5 working days" },
    international: { where: "Everywhere else", time: "7–14 working days" },
    cost: "Calculated at checkout, by weight and destination.",
  },

  returns: {
    window: "14 days",
    condition: "Unworn, unwashed, with the tags still on.",
    postage: "Return postage is yours unless the piece arrived faulty.",
    /** One size means an exchange is really a return and a re-order. */
    exchanges: "Every piece is cut in one size, so there are no exchanges — return it and order again.",
  },
} as const;

/**
 * The values above that are invented. Keep this list honest: if you confirm
 * one, take it off the list; if you add a new guess, put it on.
 */
export const needsConfirming = [
  "contact.email",
  "contact.instagram",
  "shipping.from",
  "shipping.domestic.time",
  "shipping.international.time",
  "shipping.cost",
  "returns.window",
  "returns.condition",
  "returns.postage",
] as const;
