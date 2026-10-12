/**
 * The legal pages: terms, privacy, cookies, accessibility.
 *
 * ⚠ THESE ARE PLACEHOLDERS, written to be plausible for a small studio that
 * sells one capsule online from Los Angeles and New York. They are not legal
 * advice and nobody has reviewed them. Have them read by someone qualified
 * before the site is public, and keep `effective` honest when they change.
 *
 * Contact details and the returns terms are not repeated here: they are read
 * from `policies.ts`, so a change there carries through to every page.
 */

import { house } from "./collection";
import { policies } from "./policies";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  slug: string;
  /** The page heading. */
  title: string;
  effective: string;
  intro: string;
  sections: LegalSection[];
}

const email = policies.contact.email;

/** The legal entity named in the documents. Invented: replace it. */
export const entity = {
  name: "Habits Studio LLC",
  address: "000 Placeholder Street, Los Angeles, CA 90000, United States",
  governingLaw: "the State of California",
};

const terms: LegalDocument = {
  slug: "terms",
  title: "Terms of sale",
  effective: "1 October 2026",
  intro: `These terms apply to every order placed on this site. By placing an order you agree to them. The site is run by ${entity.name} ("${house.name}", "we", "us").`,
  sections: [
    {
      heading: "The pieces",
      paragraphs: [
        `Every piece is made in a numbered series of ${house.edition.size}. We describe each one as accurately as we can, but garment dyeing and enzyme washing mean colour and texture vary slightly from piece to piece and from the photographs. That variation is part of the garment, not a fault.`,
        "Every piece is cut in one size. The measurements on each product page are the ones to go by.",
      ],
    },
    {
      heading: "Prices and payment",
      paragraphs: [
        `Prices are in ${house.currency} and include any applicable sales tax shown at checkout. Shipping is added at checkout. International orders may be charged import duties and taxes by the destination country; those are paid by the customer.`,
        "Payment is taken when the order is placed. We may correct a price that has been displayed in error and will contact you before your order is dispatched if that happens.",
      ],
    },
    {
      heading: "Orders",
      paragraphs: [
        "An order is accepted when we send the dispatch confirmation, not when you place it. Because each series is limited, we may cancel an order if the piece has sold out, in which case you are refunded in full.",
        "We may limit quantities per customer so that a series reaches more than a handful of people.",
      ],
    },
    {
      heading: "Delivery",
      paragraphs: [
        "Delivery times are on the Shipping & returns page and are estimates, not guarantees. Responsibility for the parcel passes to you once it is delivered to the address you gave us.",
      ],
    },
    {
      heading: "Returns and refunds",
      paragraphs: [
        `You can return a piece within ${policies.returns.window} of delivery. ${policies.returns.condition} ${policies.returns.postage}`,
        "Refunds are made to the original payment method within 10 working days of the return arriving with us. Nothing in these terms affects your rights under consumer law.",
      ],
    },
    {
      heading: "Faulty pieces",
      paragraphs: [
        `If a piece arrives damaged or faulty, email ${email} within 14 days of delivery with your order number and a photograph. We will replace it if the series allows, or refund it, and cover the postage either way.`,
      ],
    },
    {
      heading: "Our work",
      paragraphs: [
        `The designs, graphics, photographs, films and writing on this site belong to ${house.name}. You may share them with credit; you may not reproduce them for sale.`,
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "We are responsible for loss that is a foreseeable result of us breaking these terms. We are not responsible for loss that was not foreseeable, or for business losses. Our total liability for any order is limited to the price paid for it, except where the law does not allow that limit.",
      ],
    },
    {
      heading: "Law",
      paragraphs: [
        `These terms are governed by the laws of ${entity.governingLaw}. If you live elsewhere, you keep any protection the law where you live gives you.`,
        "We may update these terms. The version that applies to an order is the one on the site when the order was placed.",
      ],
    },
  ],
};

const privacy: LegalDocument = {
  slug: "privacy",
  title: "Privacy policy",
  effective: "1 October 2026",
  intro: `This explains what personal information ${house.name} collects, why, and what you can ask us to do with it. We collect as little as running a shop needs.`,
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "When you order: your name, email, delivery and billing address, phone number if you give one, and what you bought. Card details are handled by our payment provider and never reach us.",
        "When you join the list or write to us: your email address and whatever you choose to tell us.",
        "When you browse: the contents of your bag, kept in your own browser. See the cookie policy.",
      ],
    },
    {
      heading: "Why",
      paragraphs: [
        "To make, send and support your order; to answer you when you write; to tell you about new releases if you asked us to; and to meet our legal and tax obligations.",
      ],
    },
    {
      heading: "Who else sees it",
      paragraphs: [
        "Only the services that help us do the above: our payment provider, our shop platform, our email provider and the carriers that deliver parcels. Each sees only what its job needs. We do not sell your information, and we do not share it for advertising.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "Order records are kept for seven years for tax purposes. List subscriptions last until you unsubscribe. Messages are kept for two years and then deleted.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        `You can ask for a copy of what we hold about you, ask us to correct or delete it, or withdraw consent to marketing at any time. Every list email has an unsubscribe link. For anything else, write to ${email} and we will reply within 30 days.`,
        "If you are in California, you have the rights given by the CCPA, including the right to know and the right to delete. We do not sell or share personal information as that law defines it. If you are in the UK or the EU, you have the rights given by the GDPR and may complain to your local data protection authority.",
      ],
    },
    {
      heading: "Films",
      paragraphs: [
        "The films on the Studio page are hosted elsewhere. Nothing loads from the host until you press play; after that, the host's own privacy policy applies.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`${entity.name}, ${entity.address}. ${email}.`],
    },
  ],
};

const cookies: LegalDocument = {
  slug: "cookies",
  title: "Cookie policy",
  effective: "1 October 2026",
  intro: "Short, because there is not much to say. This site does not use advertising or tracking cookies.",
  sections: [
    {
      heading: "What the site stores",
      paragraphs: [
        "Your bag is kept in your browser's local storage so it survives a reload. It never leaves your device until you check out, and you can clear it by emptying the bag or clearing your browser's site data.",
      ],
    },
    {
      heading: "What it does not",
      paragraphs: [
        "No analytics, no advertising pixels, no third-party fonts. The typefaces are served from this domain.",
      ],
    },
    {
      heading: "Third parties",
      paragraphs: [
        "If you press play on a film, the video host may set its own cookies. At checkout, the payment provider may set cookies needed to process the payment securely.",
        "If this changes, this page will change first.",
      ],
    },
  ],
};

const accessibility: LegalDocument = {
  slug: "accessibility",
  title: "Accessibility",
  effective: "1 October 2026",
  intro: "We want everyone to be able to see the collection and buy from it. The site aims to meet WCAG 2.2 at level AA.",
  sections: [
    {
      heading: "What we have done",
      paragraphs: [
        "Text and accent colours are chosen by measured contrast. Every page can be used with a keyboard alone, with a skip link to the content. Images of the pieces carry descriptions, and the films never play with sound on their own.",
      ],
    },
    {
      heading: "Where we fall short",
      paragraphs: [
        "Some films have no captions yet. We are adding them.",
      ],
    },
    {
      heading: "Tell us",
      paragraphs: [
        `If something on the site does not work for you, write to ${email}. We will reply within five working days and, where we can, take your order by email instead.`,
      ],
    },
  ],
};

export const legal = [terms, privacy, cookies, accessibility] as const;
