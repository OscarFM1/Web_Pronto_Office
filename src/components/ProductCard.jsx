import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ title, description, image, alt, link }) => (
  <Card className={styles.card}>
    <Card.Img
      className={styles.img}
      variant="top"
      src={image}
      alt={alt}
      loading="lazy"
    />
    <Card.Body className={styles.body}>
      <Card.Title as="h3" className={styles.title}>
        {title}
      </Card.Title>
      <Card.Text className={styles.text}>
        {description}
      </Card.Text>
      <div className={styles.buttonWrapper}>
        <Button href={link} variant="primary" size="sm">
          Ver más
        </Button>
      </div>
    </Card.Body>
  </Card>
);

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  link: PropTypes.string
};

export default ProductCard;
