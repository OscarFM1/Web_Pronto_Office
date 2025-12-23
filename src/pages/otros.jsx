// src/pages/otros.jsx
// ============================================================================
// Página "Otros productos" — sin filtros/chips
// - Hero con parallax
// - Galería completa con modal
// - CTA WhatsApp + SEO JSON-LD
// ============================================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, Col, Card, Badge, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../styles/Otros.module.css";

// Usa exactamente las imágenes que tienes en /public/img/otros_productos/
const ITEMS = [
  { file: "otros_1.png", title: "Papelógrafo", cat: "otros", alt: "Producto 1 - Otros" },
  { file: "otros_2.jpg", title: "Borradores", cat: "otros", alt: "Producto 2 - Otros" },
  { file: "otros_3.jpg", title: "Murales", cat: "otros", alt: "Producto 3 - Otros" },
  { file: "otros_4.png", title: "Tablero de Vidrio", cat: "otros", alt: "Producto 4 - Otros" },
  { file: "otros_5.png", title: "Tablero de Vidrio", cat: "otros", alt: "Producto 5 - Otros" },
];

const imgPath = (name) => `/img/otros_productos/${name}`;
const fadeUp  = { initial: { y: 24, opacity: 0 }, animate: { y: 0, opacity: 1, transition: { duration: .6, ease: [0.22,1,0.36,1] } } };
const stagger = { animate: { transition: { staggerChildren: .08, delayChildren: .12 } } };

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

export default function Otros() {
  // Parallax HERO
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0vh", "20vh"]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Estado UI
  const [preview, setPreview] = useState(null);

  // Lista completa (sin filtros)
  const list = useMemo(() => ITEMS, []);

  // CTA WhatsApp + fallback mailto
  const waPhone = import.meta.env.VITE_WHATSAPP_PHONE || "";
  const waMsg = encodeURIComponent(`Hola, vengo del sitio PRONTO OFFICE. Me interesan otros productos. ¿Podemos hablar?`);
  const waHref = waPhone ? `https://wa.me/${waPhone}?text=${waMsg}` : `mailto:pronto2012@hotmail.com?subject=Cotización%20Otros%20productos&body=${waMsg}`;

  // SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Otros productos | Pronto Office",
    itemListElement: list.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.title,
      image: imgPath(item.file),
      url: typeof window !== "undefined" ? window.location.href : "https://example.com/otros",
    })),
  };

  return (
    <>
      <Helmet>
        <title>Otros productos | Pronto Office</title>
        <meta
          name="description"
          content="Otros productos complementarios para tu proyecto. Solicita tu cotización sin compromiso."
        />
        <link rel="canonical" href="https://www.pronto-office.com/otros" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Otros productos | Pronto Office" />
        <meta property="og:description" content="Explora otros productos y cotiza por WhatsApp." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <section className={styles.hero} ref={heroRef} aria-label="Hero Otros productos">
        {!prefersReducedMotion && (
          <motion.div className={styles.heroBg} style={{ y: yParallax }} aria-hidden="true" />
        )}
        <Container>
          <motion.div variants={stagger} initial="initial" animate="animate" className={styles.heroInner}>
            <motion.h1 variants={fadeUp} className={styles.title}>Otros productos</motion.h1>
            <motion.p variants={fadeUp} className={styles.subtitle}>
              Otros productos complementarios, 
              papelógrafos, Borradores y Murales.
            </motion.p>
            <motion.div variants={fadeUp} className={styles.heroCtas}>
              <a className={styles.ctaPrimary} href={waHref} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp</a>
              <a className={styles.ctaGhost} href="#galeria">Ver galería</a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* GALERÍA (sin chips) */}
      <section id="galeria" className={styles.gallerySection} aria-label="Galería de otros productos">
        <Container>
          <Row xs={1} sm={2} md={3} xl={4} className={`g-4 ${styles.gridAnim}`}>
            {list.map((item, idx) => (
              <Col key={item.file} style={{ animationDelay: `${idx * 60}ms` }}>
                <Card className={`${styles.card} ${styles.cardIn}`} onClick={() => setPreview(item)}>
                  <div className={styles.thumb}>
                    <img
                      src={imgPath(item.file)}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className={styles.img}
                      sizes="(max-width: 576px) 90vw, (max-width: 992px) 45vw, 30vw"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>{item.title}</Card.Title>
                    <Badge bg="secondary">Otros</Badge>
                    <Card.Text className={styles.cardText}>
                      Solicita tu cotización sin compromiso.
                    </Card.Text>
                    <div className={styles.cardActions}>
                      <a href={waHref} className={styles.link} target="_blank" rel="noopener noreferrer">Cotizar</a>
                      <button
                        type="button"
                        className={styles.previewBtn}
                        onClick={(e) => { e.stopPropagation(); setPreview(item); }}
                      >
                        Ver foto
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* MODAL accesible */}
      <Modal show={!!preview} onHide={() => setPreview(null)} centered size="lg" aria-labelledby="modal-foto-otros">
        <Modal.Header closeButton>
          <Modal.Title id="modal-foto-otros">{preview?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {preview && <img src={imgPath(preview.file)} alt={preview.alt} className={styles.lightboxImg} />}
        </Modal.Body>
        <Modal.Footer>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>Cotizar por WhatsApp</a>
        </Modal.Footer>
      </Modal>
    </>
  );
}
