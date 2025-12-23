// src/pages/Suministros.jsx

import React from 'react';
import { Helmet } from 'react-helmet-async';
// Layout y grid de React-Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
// Componente de tarjeta reutilizable
import ProductCard from '../components/ProductCard';
// Datos de productos desde JSON
import products from '../data/products.json';

/**
 * Página que muestra todos los suministros de oficina disponibles.
 * Usa Helmet para SEO dinámico, React-Bootstrap para el layout
 * y ProductCard para cada producto.
 */
const Suministros = () => {
  // Filtrar sólo los productos cuya categoría es "suministros"
  const suministros = products.filter((p) => p.category === 'suministros');

  return (
    <>
      {/* SEO dinámico: título y meta descripción específicos */}
      <Helmet>
        <title>Suministros – Pronto Office</title>
        <meta
          name="description"
          content="Descubre nuestros suministros de oficina: lapiceros, cuadernos y más en Pronto Office."
        />
      </Helmet>

      {/* Sección principal con padding vertical */}
      <section className="py-5">
        <Container>
          {/* Título de la sección */}
          <h2 className="mb-4">Suministros de Oficina</h2>

          {/* Grid responsive: xs=1, md=2, lg=3 columnas */}
          <Row xs={1} md={2} lg={3} className="g-4">
            {suministros.map((prod) => (
              <Col key={prod.id}>
                {/* Cada tarjeta recibe todas las props del producto */}
                <ProductCard
                  id={prod.id}
                  title={prod.title}
                  description={prod.description}
                  image={prod.image}
                  alt={prod.alt}
                  link={`/suministros/${prod.id}`}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Suministros;
