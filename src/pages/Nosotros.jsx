// src/pages/Nosotros.jsx
// ============================================================================
// Nosotros — coherente con el resto del sitio (sin dependencias extra):
// - Hero con fondo suave y sublínea
// - Texto institucional con el contenido del cliente (NO se modifica copy)
// - Tarjetas de valores (Servicio, Sostenibilidad, Innovación)
// - Banda de métricas para reforzar confianza
// - SEO on-page con Helmet
//
// AJUSTE SOLICITADO (dueño):
// - Se elimina foto de equipo en "Quiénes somos"
// - Se reemplaza por LOGO grande + CTA de contacto debajo (misma columna lateral)
// ============================================================================

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Nosotros.module.css";

export default function Nosotros() {
  // CTA WhatsApp con fallback mailto (sin romper si falta la env var)
  const waPhone = import.meta.env?.VITE_WHATSAPP_PHONE || "";
  const msg = encodeURIComponent(
    "Hola, vengo del sitio PRONTO OFFICE. Quiero conocer más de la empresa."
  );

  // Enlace final: WhatsApp si hay número, si no, mailto
  const waHref = waPhone
    ? `https://wa.me/${waPhone}?text=${msg}`
    : `mailto:pronto2012@hotmail.com?subject=Información%20Pronto%20Office&body=${msg}`;

  return (
    <>
      <Helmet>
        <title>Nosotros – Pronto Office</title>
        <meta
          name="description"
          content="Empresa colombiana con más de 20 años fabricando tableros en acrílico y carteleras de corcho. Conoce nuestra misión, trayectoria y valores: Servicio, Sostenibilidad e Innovación."
        />
        <link rel="canonical" href="https://www.pronto-office.com/nosotros" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nosotros – Pronto Office" />
        <meta
          property="og:description"
          content="20+ años de experiencia. Estándares de calidad y servicio efectivo."
        />
      </Helmet>

      {/* HERO */}
      <section className={styles.hero} aria-label="Presentación de la empresa">
        <div className={styles.heroBg} aria-hidden="true" />
        <Container>
          <div className={styles.heroInner}>
            <h1 className={styles.title}>
              Sobre <span className={styles.brand}>Pronto Office</span>
            </h1>

            <p className={styles.subtitle}>
              20+ años fabricando tableros y carteleras con{" "}
              <strong>estándares de calidad</strong> y{" "}
              <strong>servicio efectivo</strong>. <br className="d-none d-md-inline" />
              <span className={styles.subline}>
                Soluciones para empresas, educación y hogar — con instalación profesional.
              </span>
            </p>

            <div className={styles.heroCtas}>
              <a
                className={styles.ctaPrimary}
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hablar por WhatsApp
              </a>
              <a className={styles.ctaGhost} href="#quienes-somos">
                Conócenos
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="quienes-somos" className={styles.about} aria-labelledby="h-somos">
        <Container>
          <Row className="g-5 align-items-start">
            {/* Columna de texto (NO se cambia el copy) */}
            <Col lg={7}>
              <h2 id="h-somos" className={styles.h2}>
                Quiénes somos
              </h2>

              <p className={styles.lead}>
                Somos una <strong>Empresa Colombiana</strong>, que nace con la misión de proveer
                soluciones de <strong>Tableros en acrílicos y corcho</strong> para Empresas, Sector
                Educativo y hogar.
              </p>

              <p className={styles.copy}>
                Tenemos una trayectoria de <strong>más de 20 años</strong> en el mercado, en la que
                nos hemos caracterizado en producir tableros con altos estándares de calidad y
                ofrecer un <strong>servicio efectivo</strong>.
              </p>
            </Col>

            {/* Columna lateral: LOGO grande + CTA (reemplaza foto del equipo) */}
            <Col lg={5} className="d-flex align-items-center">
              {/* 
                BrandBlock:
                - Reemplaza imagen de equipo por identidad visual (logo)
                - Mantiene la composición de 2 columnas sin que se vea “vacío”
              */}
              <div className={styles.brandBlock} aria-label="Identidad Pronto Office">
                <img
                  src="/img/logo.png"
                  alt="Pronto Office"
                  className={styles.brandLogo}
                  loading="lazy"
                  decoding="async"
                />

                {/* CTA a contacto (usa mismo waHref con fallback mailto) */}
                <a
                  href={waHref}
                  className={styles.brandCta}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar a Pronto Office"
                >
                  Contáctanos
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VALORES */}
      <section className={styles.values} aria-labelledby="h-valores">
        <Container>
          <h3 id="h-valores" className={styles.h3}>
            Nuestros valores empresariales
          </h3>

          <ul className={styles.valuesList}>
            <li className={styles.valueItem}>
              <span className={styles.valueIcon} aria-hidden="true">
                {/* Headset icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12a7 7 0 0 1 14 0v6a2 2 0 0 1-2 2h-2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <rect
                    x="3"
                    y="11"
                    width="4"
                    height="6"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <rect
                    x="17"
                    y="11"
                    width="4"
                    height="6"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path d="M10 20h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <strong>Servicio al Cliente</strong>
                <p>Atención y asesoría oportuna de acuerdo a las necesidades del cliente.</p>
              </div>
            </li>

            <li className={styles.valueItem}>
              <span className={styles.valueIcon} aria-hidden="true">
                {/* Leaf icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 3c-6 0-10 2-13 5-3 3-4 7-3 10 3 1 7 0 10-3 3-3 5-7 6-12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 15c0-2 1-4 3-6s4-3 6-3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Sostenibilidad</strong>
                <p>Utilizamos materias primas sostenible con el medio ambiente.</p>
              </div>
            </li>

            <li className={styles.valueItem}>
              <span className={styles.valueIcon} aria-hidden="true">
                {/* Spark icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Innovación</strong>
                <p>
                  Desarrollamos estrategias internas para mejorar procesos que benefician a nuestros
                  Clientes.
                </p>
              </div>
            </li>
          </ul>
        </Container>
      </section>

      {/* MÉTRICAS */}
      <section className={styles.metrics} aria-label="Métricas de confianza">
        <Container>
          <ul className={styles.metricsList}>
            <li>
              <span className={styles.metricNumber}>20+</span>
              <span className={styles.metricLabel}>Años de experiencia</span>
            </li>
            <li>
              <span className={styles.metricNumber}>+20k</span>
              <span className={styles.metricLabel}>Proyectos entregados</span>
            </li>
            <li>
              <span className={styles.metricNumber}>24/7</span>
              <span className={styles.metricLabel}>Soporte y atención</span>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}
