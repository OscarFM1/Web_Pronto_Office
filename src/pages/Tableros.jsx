// src/pages/Tableros.jsx
// ============================================================================
// “Tableros en Acrílico” SIN filtros/chips/búsqueda/orden:
// - Hero con parallax
// - Masonry + Tilt 3D
// - Modal accesible
// - CTA WhatsApp (mensaje genérico)
// - SEO JSON-LD con TODOS los ítems
// ============================================================================

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../styles/Tableros.module.css";

// Hook accesible
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

// Datos base
const BOARD_ITEMS = [
  { id: 1, name: "Tablero Acrílico ", size: "120×240 cm", acrTag: "estandar", src: "/img/tableros/tablero_acrilico_1.jpg" },
  { id: 2, name: "Tablero Acrílico ",  size: "120×160 cm",  acrTag: "estandar", src: "/img/tableros/tablero_acrilico_2.jpg" },
  { id: 3, name: "Tablero Acrílico",size: "80×120 cm", acrTag: "estandar", src: "/img/tableros/tablero_acrilico_3.jpg"},
  { id: 4, name: "Tablero Acrílico",size: "60x80 cm", acrTag: "estandar", src: "/img/tableros/tablero_acrilico_4.jpg"},
  { id: 5, name: "Caballete",size: "", acrTag: "estandar", src: "/img/tableros/caballete_1.png"},
  { id: 6, name: "Caballete",size: "", acrTag: "estandar", src: "/img/tableros/caballete_2.png"},
];

// Animaciones
const fadeUp  = { initial: { y:24, opacity:0 }, animate:{ y:0, opacity:1, transition:{ duration:0.6, ease:[0.22,1,0.36,1] } } };
const stagger = { animate:{ transition:{ staggerChildren:0.08, delayChildren:0.12 } } };

export default function Tableros() {
  // Parallax Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0,1], ["0vh","25vh"]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // UI state
  const [lightbox, setLightbox] = useState({ open:false, item:null });

  // Lista completa (SIN filtros)
  const list = useMemo(() => BOARD_ITEMS, []);

  // CTA WhatsApp / fallback mailto (mensaje genérico)
  const waPhone = import.meta.env.VITE_WHATSAPP_PHONE || "";
  const waMsg = encodeURIComponent(`Hola, me interesa cotizar tableros acrílicos.`);
  const waHref = waPhone
    ? `https://wa.me/${waPhone}?text=${waMsg}`
    : `mailto:pronto2012@hotmail.com?subject=Cotización%20Tableros&body=${waMsg}`;

  // JSON-LD para SEO
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"ItemList",
    name:"Tableros en acrílico",
    itemListElement: list.map((item, idx) => ({
      "@type":"ListItem",
      position: idx+1,
      name: item.name,
      url: typeof window !== "undefined" ? window.location.href : "",
      image: item.src
    }))
  };

  return (
    <>
      {/* SEO on-page */}
      <Helmet>
        <title>Tableros acrílicos | Pronto Office</title>
        <meta name="description" content="Tableros acrílicos estándar y personalizados. Con trípode y rodachines. Fabricación a medida e instalación profesional." />
        <link rel="canonical" href="https://tusitio.com/tableros/acrilico" />
        <meta property="og:title" content="Tableros acrílicos | Pronto Office" />
        <meta property="og:description" content="Estándar, personalizados, trípodes y rodachines. Cotiza por WhatsApp." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <section className={styles.hero} ref={heroRef} aria-label="Hero Tableros en acrílico">
        {!prefersReducedMotion && (
          <motion.div className={styles.heroBg} style={{ y:yParallax }} aria-hidden="true"/>
        )}
        <Container>
          <motion.div variants={stagger} initial="initial" animate="animate" className={styles.heroInner}>
            <motion.h1 variants={fadeUp} className={styles.title}>Tableros en acrílico</motion.h1>
            <motion.p variants={fadeUp} className={styles.subtitle}>
              Tableros en Acrílico Borrables para Oficinas, Educacion y hogar.
              En color blanco ó cuadriculados; marcos de aluminio ó madera; 
              
              <strong> Medidas estándares y personalizadas.</strong>
              <span className={styles.subline}>
                Ofrecemos trípodes en madera y metálicos. 
                Tableros con rodachines.
              </span>
            </motion.p>
            <motion.div variants={fadeUp} className={styles.heroCtas}>
              <a className={styles.ctaPrimary} href={waHref} target="_blank" rel="noopener noreferrer">
                Cotizar por WhatsApp
              </a>
              <a className={styles.ctaGhost} href="#galeria">Ver galería</a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* GALERÍA (sin filtros) */}
      <section id="galeria" className={styles.gallerySection} aria-label="Galería de tableros acrílicos">
        <Container fluid="lg">
          <div className={styles.masonry}>
            {list.map(item=>(
              <motion.article
                key={item.id}
                className={styles.card}
                whileInView={{ y:[24,0], opacity:[0,1] }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
              >
                <Tilt>
                  <button
                    className={styles.mediaBtn}
                    onClick={()=>setLightbox({open:true,item})}
                    aria-label={`Abrir ${item.name}`}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width:576px) 90vw, (max-width:992px)45vw,30vw"
                      srcSet={`${item.src} 800w`}
                      className={styles.media}
                    />
                  </button>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.name}</h3>
                    <p className={styles.meta}>
                      <span className={styles.badge}>{item.size}</span>
                      <span className={styles.badgeSecondary}>{labelFromAcrTag(item.acrTag)}</span>
                    </p>
                    <div className={styles.actions}>
                      <a className={styles.link} href={waHref} target="_blank" rel="noopener noreferrer">
                        Cotizar ahora
                      </a>
                      <button className={styles.previewBtn} onClick={()=>setLightbox({open:true,item})}>
                        Vista rápida
                      </button>
                    </div>
                  </div>
                </Tilt>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* LIGHTBOX */}
      <Modal
        show={lightbox.open}
        onHide={()=>setLightbox({open:false,item:null})}
        centered
        aria-labelledby="modal-foto"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-foto">{lightbox.item?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {lightbox.item && (
            <img
              src={lightbox.item.src}
              alt={lightbox.item.name}
              className={styles.lightboxImg}
              loading="eager"
              decoding="sync"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button as="a" href={waHref} target="_blank" rel="noopener noreferrer" variant="primary">
            Cotizar por WhatsApp
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// Helpers
function labelFromAcrTag(tag) {
  return {
    estandar: "Estándar",
    personalizados: "Personalizados",
    tripodes: "Trípodes",
    rodachines: "Rodachines",
  }[tag] || "Acrílico";
}

// Tilt 3D suave
function Tilt({ children, max = 8 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * max;
      const ry = (px - 0.5) * -max;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [max]);

  return <div ref={ref} className={styles.tilt}>{children}</div>;
}
