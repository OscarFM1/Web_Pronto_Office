// src/components/MapEmbed.jsx
import React from 'react';
import styles from '../styles/MapEmbed.module.css';

/**
 * MapEmbed
 * - Mapa responsive con Google Maps (sin API key).
 * - Accesible, con lazy-loading y referrer policy.
 * - Acepta cualquier dirección en texto.
 */
export default function MapEmbed({ address }) {
  const q = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${q}&z=17&output=embed`;

  return (
    <div className={styles.mapWrapper}>
      <iframe
        className={styles.mapFrame}
        src={src}
        loading="lazy"
        allowFullScreen
        title={`Mapa: ${address}`}
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className={styles.mapActions}>
        <a
          href={`https://www.google.com/maps?q=${q}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapLink}
        >
          Ver en Google Maps
        </a>
      </div>
    </div>
  );
}
