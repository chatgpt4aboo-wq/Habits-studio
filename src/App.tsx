import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import Bag from "@/pages/Bag";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Lookbook from "@/pages/Lookbook";
import NotFound from "@/pages/NotFound";
import Piece from "@/pages/Piece";
import Shipping from "@/pages/Shipping";
import Studio from "@/pages/Studio";
import { BagProvider } from "@/features/bag/store";

/** Route changes start at the top; anchored links still find their section. */
function ScrollBehaviour() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      return;
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

/** Carries the piece slug across from the retired /collection path. */
function RedirectToPiece() {
  const { pathname } = useLocation();
  return <Navigate to={pathname.replace("/collection", "/lookbook")} replace />;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <BagProvider>
      <ScrollBehaviour />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-4 focus:py-2 focus:spec focus:text-ink"
      >
        Skip to content
      </a>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/lookbook/:slug" element={<Piece />} />
            {/* The shop and the lookbook were the same page; keep the old links alive. */}
            <Route path="/collection" element={<Navigate to="/lookbook" replace />} />
            <Route path="/collection/:slug" element={<RedirectToPiece />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
      </BagProvider>
    </BrowserRouter>
  );
}
