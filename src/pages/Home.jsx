// src/pages/Home.jsx
// =============================================================================
// Home con UI/UX moderna y foco en confianza:
// - Hero "glass" con borde degradado y animaciones suaves (Framer Motion).
// - Slogan central (no viñeta) usando utilidades globales .u-slogan-*.
// - Lista de beneficios con checks rojos (alto contraste, accesible).
// - Barra de confianza (logos SVG inline súper livianos).
// - Métricas clave en mini-tarjetas (hover/focus).
// - Badge flotante minimal (solo estrellas, sin textos).
// - SEO con Helmet + copy claro para conversión.
// =============================================================================

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";

/* --- Iconos SVG inline (heredan currentColor para que el color se controle via CSS) --- */
function CheckIcon({ className, size = 22 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

function ShieldIcon({ className, size = 18 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm0 18c-3.3-1.1-6-4.8-6-9V6.3l6-2.2 6 2.2V11c0 4.2-2.7 7.9-6 9z"
      />
    </svg>
  );
}

function StarIcon({ className, size = 16 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 17.3 6.8 20l1-5.9-4.3-4.2 6-0.9L12 3l2.5 5 6 .9-4.3 4.2 1 5.9z"
      />
    </svg>
  );
}

/* --- Variantes de animación --- */
const stagger = { show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  return (
    <>
      {/* SEO dinámico */}
      <Helmet>
        <title>Pronto Office – Tableros y soluciones confiables</title>
        <meta
          name="description"
          content="Tableros que inspiran y organizan tus ideas. Fabricación a medida, instalaciones profesionales y entregas a nivel nacional. Confía en Pronto Office."
        />
        <link rel="canonical" href="https://www.pronto-office.com/" />
      </Helmet>

      {/* HERO */}
      <section className={styles.hero} id="home" aria-labelledby="home-title">
        <span className={styles.bgDecor} aria-hidden="true" />
        <Container fluid="lg" className={styles.heroGrid}>
          <Row className="align-items-center g-4">
            {/* Columna: texto */}
            <Col md={6}>
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className={styles.textCard}
                role="region"
                aria-label="Presentación de Pronto Office"
              >
                {/* Borde degradado suave */}
                <span className={styles.cardGlow} aria-hidden="true" />

                <motion.h1 id="home-title" className={styles.title} variants={fadeUp}>
                  Bienvenido a{" "}
                  <span className={`${styles.highlight} ${styles.nowrap}`}>Pronto&nbsp;Office</span>
                </motion.h1>

                {/* SLOGAN CENTRAL (no viñeta) — utilidades globales .u-slogan-* */}
                <motion.div className="u-slogan-wrap" variants={fadeUp} aria-label="Slogan principal de marca">
                  <p className="u-slogan-text">
                    <span className="u-slogan-strong">Tableros</span> que{" "}
                    <span className="u-slogan-accent">inspiran</span> y{" "}
                    <span className="u-slogan-accent">organizan</span> tus ideas
                  </p>
                </motion.div>

                {/* Lista de beneficios */}
                <motion.ul className={styles.featureList} variants={stagger} aria-label="Beneficios principales">
                  <motion.li variants={fadeUp}>
                    <CheckIcon className={`${styles.check} ${styles.checkRed}`} />
                    <span className={styles.featureText}>
                      Producimos tableros <strong>a tu medida</strong>
                    </span>
                  </motion.li>
                  <motion.li variants={fadeUp}>
                    <CheckIcon className={`${styles.check} ${styles.checkRed}`} />
                    <span className={styles.featureText}>
                      <strong>Entregas a nivel nacional</strong>
                    </span>
                  </motion.li>
                </motion.ul>

                {/* CTAs */}
                <motion.div variants={fadeUp} className={styles.ctas}>
                  <Button
                    href="/contacto"
                    size="lg"
                    className={styles.ctaPrimary}
                    aria-label="Ir a Contacto para solicitar cotización"
                  >
                    Contáctanos
                  </Button>
                  <a
                    className={styles.ctaGhost}
                    href={
                      (import.meta.env.VITE_WHATSAPP_PHONE &&
                        `https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE}?text=${encodeURIComponent(
                          "Hola, me interesa cotizar tableros con Pronto Office."
                        )}`) ||
                      "mailto:pronto2012@hotmail.com?subject=Consulta%20Pronto%20Office"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp inmediato
                  </a>
                </motion.div>

                {/* Métricas (confianza social) */}
                <motion.div variants={fadeUp} className={styles.statsRow} aria-label="Métricas de confianza">
                  <div className={styles.statCard} tabIndex={0}>
                    <strong>20+</strong>
                    <span>Años de experiencia</span>
                  </div>
                  <div className={styles.statCard} tabIndex={0}>
                    <strong>+20k</strong>
                    <span>Proyectos entregados</span>
                  </div>
                  <div className={styles.statCard} tabIndex={0}>
                    <strong>24/7</strong>
                    <span>Soporte y atención</span>
                  </div>
                </motion.div>
              </motion.div>
            </Col>

            {/* Columna: imagen + badge flotante */}
            <Col md={6} className="text-center position-relative">
              <motion.img
                src="/img/img_home.jpg"
                alt="Oficina con tablero y laptop: espacio de trabajo moderno"
                className={styles.heroImage}
                loading="eager"
                decoding="async"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 90, damping: 12 }}
              />

              {/* Badge flotante minimal (solo estrellas) */}
              <motion.aside
                className={styles.floatBadge}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                aria-label="Calificación de clientes"
              >
                <span className={styles.stars} aria-hidden="true">
                  <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                </span>
              </motion.aside>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
