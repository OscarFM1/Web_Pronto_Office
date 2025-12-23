// src/App.jsx
import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Spinner } from "react-bootstrap";

import MainNavbar from "./components/Navbar";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";

const Home                   = lazy(() => import("./pages/Home.jsx"));
const Tableros               = lazy(() => import("./pages/Tableros.jsx"));
const Nosotros               = lazy(() => import("./pages/Nosotros.jsx"));
const Contacto               = lazy(() => import("./pages/Contacto.jsx"));
const CartelerasCorcho       = lazy(() => import("./pages/Carteleras_corcho.jsx"));
const CartelerasCorporativas = lazy(() => import("./pages/Carteleras_corporativas.jsx"));
const Otros                  = lazy(() => import("./pages/otros.jsx"));

function Loader() {
  return (
    <div style={{ minHeight: "40vh", display: "grid", placeItems: "center" }} aria-busy="true">
      <Spinner animation="border" role="status" aria-label="Cargando" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }, [pathname]);
  return null;
}

// ⭐️ NotFound simple para no “disfrazar” errores de ruta como Home
function NotFound() {
  return (
    <main style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>404</h1>
      <p>La ruta no existe. Verifica el enlace o el path.</p>
    </main>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <MainNavbar />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tableros" element={<Tableros />} />
          <Route path="/carteleras/corcho" element={<CartelerasCorcho />} />
          <Route path="/carteleras/corporativas" element={<CartelerasCorporativas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/otros" element={<Otros />} />
          {/* 👇 ahora muestra 404 si el path no matchea */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <FloatingWhatsApp />
      <Footer />
    </HelmetProvider>
  );
}
