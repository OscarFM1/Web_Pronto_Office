// src/pages/Carteleras_corcho.jsx
// ============================================================================
// “Carteleras de corcho” SIN filtros/chips:
// - Hero con parallax
// - Masonry + Tilt 3D suave
// - Modal accesible
// - CTA WhatsApp (mensaje genérico)
// - SEO on-page (JSON-LD con TODOS los ítems)
// ============================================================================

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../styles/Carteleras_corcho.module.css";

// Hook accesible: respeta prefers-reduced-motion
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

// Datos base (usa carpeta /public/img/carteleras_corcho/*)
const BOARD_ITEMS = [
  { id: 1, name: "Cartelera de Corcho ",  size: "90×120 cm",  corTag: "estandar",       src: "/img/carteleras_corcho/cartelera_corcho1.jpg" },
  { id: 2, name: "Cartelera de Corcho ", size: "30×40 cm", corTag: "estandar",       src: "/img/carteleras_corcho/cartelera_corcho2.jpg" },
  { id: 3, name: "Cartelera Personalizada ", size: "60x90", corTag: "personalizadas", src: "/img/carteleras_corcho/cartelera_corcho3.png" },
  { id: 4, name: "Cartelera Con Rodachines",     size: "peronalizada",  corTag: "mixtas",        src: "/img/carteleras_corcho/cartelera_corcho4.jpg" },
  { id: 5, name: "Cartelera de Corcho extra",                size: "personalizada",  corTag: "rodachines",    src: "/img/carteleras_corcho/cartelera_corcho5.jpg" },
  { id: 6, name: "Cartelera Mixta (Corcho + Acrílico)",               size: "Personalizada", corTag: "estandar",       src: "/img/carteleras_corcho/cartelera_corcho6.jpg" },
];

// Animaciones base
const fadeUp  = { initial:{ y:24, opacity:0 }, animate:{ y:0, opacity:1, transition:{ duration:0.6, ease:[0.22,1,0.36,1] } } };
const stagger = { animate:{ transition:{ staggerChildren:0.08, delayChildren:0.12 } } };

export default function CartelerasCorcho() {
  // Parallax Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0,1], ["0vh","20vh"]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // UI state
  const [lightbox, setLightbox] = useState({ open:false, item:null });

  // Lista completa (SIN filtros)
  const list = useMemo(() => BOARD_ITEMS, []);

  // CTA WhatsApp / mailto (mensaje genérico)
  const waPhone = import.meta.env.VITE_WHATSAPP_PHONE||"";
  const waMsg = encodeURIComponent(`Hola, me interesa cotizar carteleras de corcho.`);
  const waHref = waPhone
    ? `https://wa.me/${waPhone}?text=${waMsg}`
    : `mailto:pronto2012@hotmail.com?subject=Cotización%20Carteleras%20de%20corcho&body=${waMsg}`;

  // JSON-LD SEO (con TODOS los ítems)
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"ItemList",
    name:"Carteleras de corcho",
    itemListElement: list.map((item,idx)=>({
      "@type":"ListItem", position:idx+1,
      name:item.name, image:item.src,
      url: typeof window!=="undefined" ? window.location.href : ""
    }))
  };

  return (
    <>
      {/* SEO on-page */}
      <Helmet>
        <title>Carteleras de corcho | Pronto Office</title>
        <meta name="description" content="Carteleras de corcho estándar, personalizadas, mixtas y con rodachines. Calidad premium e instalación profesional."/>
        <link rel="canonical" href="https://tusitio.com/carteleras/corcho"/>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <section className={styles.hero} ref={heroRef} aria-label="Hero Carteleras de corcho">
        {!prefersReducedMotion && (
          <motion.div className={styles.heroBg} style={{ y:yParallax }} aria-hidden="true"/>
        )}
        <Container>
          <motion.div variants={stagger} initial="initial" animate="animate" className={styles.heroInner}>
            <motion.h1 variants={fadeUp} className={styles.title}>Carteleras de corcho</motion.h1>
            <motion.p variants={fadeUp} className={styles.subtitle}>
              Carteleras de corcho de excelente calidad,  <strong>medidas estándares ó especiales</strong>.
              <span className={styles.subline}>
                <strong>También podemos personalizarlas</strong>
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
      <section id="galeria" className={styles.gallerySection} aria-label="Galería de carteleras de corcho">
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
                      sizes="(max-width:576px)90vw,(max-width:992px)45vw,30vw"
                      srcSet={`${item.src} 800w`}
                      className={styles.media}
                    />
                  </button>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.name}</h3>
                    <p className={styles.meta}>
                      <span className={styles.badge}>{item.size}</span>
                      <span className={styles.badgeSecondary}>{labelFromCorTag(item.corTag)}</span>
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
        aria-labelledby="modal-corcho"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-corcho">{lightbox.item?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {lightbox.item && (
            <img
              src={lightbox.item.src}
              alt={lightbox.item.name}
              className={styles.lightboxImg}
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
function labelFromCorTag(tag) {
  return {
    estandar:       "Estándar",
    personalizadas: "Personalizadas",
    mixtas:         "Mixtas",
    rodachines:     "Con rodachines",
  }[tag] || "Corcho";
}

// Tilt 3D suave (igual que en Tableros)
function Tilt({children,max=8}){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    let raf=0;
    const onMove = e=>{
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width;
      const py=(e.clientY-r.top)/r.height;
      const rx=(py-0.5)*max, ry=(px-0.5)*-max;
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>el.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`);
    };
    const reset = ()=>{
      cancelAnimationFrame(raf);
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("pointermove",onMove);
    el.addEventListener("pointerleave",reset);
    return ()=>{
      el.removeEventListener("pointermove",onMove);
      el.removeEventListener("pointerleave",reset);
    };
  },[max]);
  return <div ref={ref} className={styles.tilt}>{children}</div>;
}
