// src/components/Footer.jsx
import React, { useState, lazy, Suspense } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import styles from "../styles/Footer.module.css";

// Carga diferida del mapa
const MapEmbed = lazy(() => import("./MapEmbed"));

export default function Footer() {
  const year = new Date().getFullYear();
  const [showMap, setShowMap] = useState(false);
  const address = "Calle 14 Nro. 12-31 Of. 306, Bogotá, Colombia";

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* SEO: Organization */}
      <div itemScope itemType="https://schema.org/Organization">
        <meta itemProp="name" content="Pronto Office" />

        <Container className={styles.top}>
          <Row className="gy-4">
            {/* Columna 1: Marca */}
            <Col md={4}>
              <div className={styles.brand}>
                {/* Tarjeta del logo (glass + glow) */}
                <div className={styles.logoCard} aria-label="Pronto Office">
                  <picture>
                    <img
                      src={`${import.meta.env.BASE_URL}img/logo.png`}
                      alt="Pronto Office - logo institucional"
                      className={styles.logo}
                      loading="lazy"
                      decoding="async"
                      width="220"
                      height="56"
                      style={{ objectFit: "contain", display: "block" }}
                    />
                  </picture>
                </div>

                <p className={styles.tagline} itemProp="description">
                  Tableros, suministros y soluciones gráficas con calidad y estilo.
                </p>

                {/* Social (SameAs para SEO) */}
                <div className={styles.social} aria-label="Redes sociales">
                  <a
                    href="https://www.facebook.com/share/1599zuG32L/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Facebook de Pronto Office"
                    className={styles.socialLink}
                    itemProp="sameAs"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://www.instagram.com/pronto_office2012?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label="Instagram de Pronto Office"
                    className={styles.socialLink}
                    itemProp="sameAs"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=573144435763"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp de Pronto Office"
                    className={styles.socialLink}
                    itemProp="sameAs"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </Col>

            {/* Columna 2: Navegación */}
            <Col md={4}>
              <nav aria-label="Navegación del sitio" className={styles.navBlock}>
                <h3 className={styles.blockTitle}>Navegación</h3>
                <ul className={styles.linkList}>
                  <li><Link className={styles.link} to="/">Home</Link></li>
                  <li><Link className={styles.link} to="/tableros">Tableros</Link></li>
                  <li><Link className={styles.link} to="/carteleras/corcho">Carteleras de Corcho</Link></li>
                  <li><Link className={styles.link} to="/carteleras/corporativas">Carteleras Corporativas</Link></li>
                  <li><Link className={styles.link} to="/otros">Otros productos</Link></li>
                  <li><Link className={styles.link} to="/suministros">Suministros</Link></li>
                  <li><Link className={styles.link} to="/nosotros">Nosotros</Link></li>
                  <li><Link className={styles.link} to="/contacto">Contáctanos</Link></li>
                </ul>

              </nav>
            </Col>

            {/* Columna 3: Contacto */}
            <Col md={4}>
              <div className={styles.navBlock}>
                <h3 className={styles.blockTitle}>Contacto</h3>

                <address
                  className={styles.address}
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">Calle 14 Nro. 12-31 Of. 306</span>
                  <br />
                  <span itemProp="addressLocality">Bogotá</span>,{" "}
                  <span itemProp="addressCountry">Colombia</span>
                </address>

                <p className={styles.contactItem}>
                  <a className={styles.link} href="tel:+573144435763" itemProp="telephone">
                    +57 314 443 5763
                  </a>
                </p>

                <p className={styles.contactItem}>
                  <a className={styles.link} href="mailto:pronto2012@hotmail.com" itemProp="email">
                    pronto2012@hotmail.com
                  </a>
                </p>

                <p className={styles.schedule}>Lunes a Viernes: 8:00–18:00</p>

                <div className={styles.mapCtas}>
                  <Button
                    variant="light"
                    size="sm"
                    className={styles.mapBtn}
                    onClick={() => setShowMap(true)}
                  >
                    Ver mapa
                  </Button>
                  <a
                    className={styles.link}
                    href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "0.75rem" }}
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Banda inferior */}
        <div className={styles.bottom}>
          <Container className={styles.bottomInner}>
            <span>© {year} Pronto Office. Todos los derechos reservados.</span>
            <div className={styles.legal}>
              <Link className={styles.link} to="/privacidad">Privacidad</Link>
              <span className={styles.sep} aria-hidden="true">•</span>
              <Link className={styles.link} to="/terminos">Términos</Link>
              <span className={styles.sep} aria-hidden="true">•</span>
              <a className={styles.link} href="mailto:pronto2012@hotmail.com">Soporte</a>
            </div>
          </Container>
        </div>
      </div>

      {/* Modal con mapa (lazy) */}
      <Modal show={showMap} onHide={() => setShowMap(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Ubicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<div style={{ height: 220 }} />}>
            <MapEmbed address={address} />
          </Suspense>
        </Modal.Body>
      </Modal>
    </footer>
  );
}
