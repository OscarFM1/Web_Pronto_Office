// src/components/Navbar.jsx
// -----------------------------------------------------------------------------
// Navbar con orden actualizado de enlaces (UX/SEO coherente con Footer):
// Home → Tableros → Corcho → Corporativas → Otros productos → Nosotros → Contáctanos
// - Logo servido desde /public/img/ con BASE_URL (robusto en deploys).
// - Mantiene tus clases y compatibilidad con React-Bootstrap.
// -----------------------------------------------------------------------------

import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

export default function MainNavbar() {
  // Orden solicitado
  const links = [
    { to: '/', label: 'Home' },
    { to: '/tableros', label: 'Tableros en Acrilico' },
    { to: '/carteleras/corcho', label: 'Carteleras de corcho' },
    { to: '/carteleras/corporativas', label: 'Carteleras corporativas' },
    { to: '/otros', label: 'Otros productos' },       // ⬅️ movido aquí
    { to: '/nosotros', label: 'Nosotros' },           // ⬅️ al final
    { to: '/contacto', label: 'Contáctanos' },        // ⬅️ al final
  ];

  return (
    <Navbar expand="lg" className={styles.navbar} sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className={styles.brand}>
          {/* Logo desde /public/img (seguro en Vite y producción) */}
          <img
            src={`${import.meta.env.BASE_URL}img/logo.png`}
            alt="Pronto Office"
            className={styles.logo}
            loading="lazy"
            decoding="async"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" className={styles.toggle} />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            {links.map(({ to, label }) => (
              <Nav.Link
                as={NavLink}
                to={to}
                key={to}
                className={styles.navLink}
                activeClassName={styles.active} // se conserva para tu CSS actual
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
