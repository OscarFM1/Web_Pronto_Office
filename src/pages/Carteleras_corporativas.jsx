// src/pages/Carteleras_corporativas.jsx
// ============================================================================
// Carteleras corporativas — sin filtros/chips
// - Hero con parallax
// - Grilla responsive (Bootstrap) + Modal accesible
// - SEO on-page con Helmet y JSON-LD sobre TODOS los ítems
// ============================================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Card, Badge, Modal } from "react-bootstrap";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../styles/Carteleras_corporativas.module.css";

// -------------------- DATA --------------------
// Mantengo solo las dos imágenes que dejaste vigentes (paño rojo / paño azul)
const ITEMS = [
  { file: "cartelera_pano1.jpg", title: "Cartelera corporativa en paño rojo", category: "pano", alt: "Cartelera tapizada en paño rojo" },
  { file: "cartelera_pano2.jpg", title: "Cartelera corporativa en paño azul", category: "pano", alt: "Cartelera tapizada en paño azul" },
];

const imgPath = (name) => `/img/suministros/${name}`;

// Animaciones
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

export default function CartelerasCorporativas() {
  // Parallax HERO
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0vh", "20vh"]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Estado UI
  const [preview, setPreview] = useState(null);

  // Lista sin filtros (todos los ítems)
  const list = useMemo(() => ITEMS, []);

  // CTA WhatsApp
  const waHref = `https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || "573000000000"}?text=${encodeURIComponent("Hola, quiero cotizar carteleras corporativas. Vengo de la web.")}`;

  // SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Carteleras corporativas",
    itemListElement: list.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.title,
      image: imgPath(item.file),
      url: typeof window !== "undefined" ? window.location.href : "https://example.com/carteleras/corporativas",
    })),
  };

  return (
    <>
      <Helmet>
        <title>Carteleras corporativas | En paño</title>
        <meta
          name="description"
          content="Carteleras corporativas elegantes en paño. Personalización con logo y medidas especiales. Acabados premium e instalación profesional."
        />
        <link rel="canonical" href="https://www.pronto-office.com/carteleras/corporativas" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <section className={styles.hero} ref={heroRef} aria-label="Hero Carteleras corporativas">
        {!prefersReducedMotion && (
          <motion.div className={styles.heroBg} style={{ y: yParallax }} aria-hidden="true" />
        )}
        <Container>
          <motion.div variants={stagger} initial="initial" animate="animate" className={styles.heroInner}>
            <motion.h1 variants={fadeUp} className={styles.title}>Carteleras corporativas</motion.h1>
            <motion.p variants={fadeUp} className={styles.subtitle}>
              Carteleras corporativas <strong>en paño</strong> y con el logo de su <strong>empresa ó Colegio</strong>.
              Medidas especiales de acuerdo a sus necesidades.
            </motion.p>
            <motion.div variants={fadeUp} className={styles.heroCtas}>
              <a className={styles.ctaPrimary} href="/contacto">Cotizar ahora</a>
              <a className={styles.ctaGhost} href={waHref} target="_blank" rel="noopener noreferrer">Hablar por WhatsApp</a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* GRID (sin chips) */}
      <section className={styles.gridSection} aria-label="Galería de carteleras corporativas">
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
                    <Badge bg="secondary">En paño</Badge>
                    <Card.Text className={styles.cardText}>
                      Personalización disponible. Solicita tu cotización sin compromiso.
                    </Card.Text>
                    <div className={styles.cardActions}>
                      <a href="/contacto" className={styles.link}>Cotizar</a>
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

      {/* MODAL */}
      <Modal show={!!preview} onHide={() => setPreview(null)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{preview?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {preview && <img src={imgPath(preview.file)} alt={preview.alt} className={styles.lightboxImg} />}
        </Modal.Body>
        <Modal.Footer>
          <a href="/contacto" className={styles.ctaPrimary}>Quiero este producto</a>
        </Modal.Footer>
      </Modal>
    </>
  );
}
