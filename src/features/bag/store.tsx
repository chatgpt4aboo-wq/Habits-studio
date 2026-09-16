/* eslint-disable react-refresh/only-export-components -- the provider and its
   hook are one unit. */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { pieceBySlug, pieces } from "@/data/collection";
import type { Piece } from "@/data/types";

export interface BagLine {
  slug: string;
  size: string;
  quantity: number;
}

export interface BagItem extends BagLine {
  piece: Piece;
  lineTotal: number;
}

const STORAGE_KEY = "habits-studio:bag";
const MAX_PER_LINE = 10;

/** Stored bags are untrusted: drop anything that is no longer a real piece. */
export function parseBag(raw: string | null): BagLine[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.flatMap((entry): BagLine[] => {
      if (!entry || typeof entry !== "object") return [];
      const { slug, size, quantity } = entry as Record<string, unknown>;
      if (typeof slug !== "string" || typeof size !== "string") return [];
      const piece = pieces.find((item) => item.slug === slug);
      if (!piece || !piece.sizes.includes(size)) return [];
      const count = Math.round(Number(quantity));
      if (!Number.isFinite(count) || count < 1) return [];
      return [{ slug, size, quantity: Math.min(MAX_PER_LINE, count) }];
    });
  } catch {
    return [];
  }
}

export interface BagApi {
  lines: BagLine[];
  items: BagItem[];
  count: number;
  subtotal: number;
  add: (slug: string, size: string, quantity?: number) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
}

const BagContext = createContext<BagApi | null>(null);

export function BagProvider({ children, initial }: { children: ReactNode; initial?: BagLine[] }) {
  const [lines, setLines] = useState<BagLine[]>(() => {
    if (initial) return initial;
    try {
      return parseBag(localStorage.getItem(STORAGE_KEY));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage blocked. The bag still works for this session */
    }
  }, [lines]);

  const add = useCallback((slug: string, size: string, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.slug === slug && line.size === size);
      if (!existing) return [...current, { slug, size, quantity }];
      return current.map((line) =>
        line === existing
          ? { ...line, quantity: Math.min(MAX_PER_LINE, line.quantity + quantity) }
          : line,
      );
    });
  }, []);

  const setQuantity = useCallback((slug: string, size: string, quantity: number) => {
    setLines((current) =>
      quantity < 1
        ? current.filter((line) => !(line.slug === slug && line.size === size))
        : current.map((line) =>
            line.slug === slug && line.size === size
              ? { ...line, quantity: Math.min(MAX_PER_LINE, quantity) }
              : line,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setLines((current) => current.filter((line) => !(line.slug === slug && line.size === size)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const api = useMemo<BagApi>(() => {
    const items = lines.flatMap((line): BagItem[] => {
      const piece = pieceBySlug(line.slug);
      if (!piece) return [];
      return [{ ...line, piece, lineTotal: piece.price * line.quantity }];
    });

    return {
      lines,
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.lineTotal, 0),
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, add, setQuantity, remove, clear]);

  return <BagContext.Provider value={api}>{children}</BagContext.Provider>;
}

export function useBag(): BagApi {
  const api = useContext(BagContext);
  if (!api) throw new Error("useBag must be used inside <BagProvider>");
  return api;
}
