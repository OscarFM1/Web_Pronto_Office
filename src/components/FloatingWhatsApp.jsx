// src/components/FloatingWhatsApp.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from '../styles/FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  // Número en E.164 SIN '+'
  const phone = '573144435763'; // <-- ajusta el tuyo

  // Mensaje profesional (sin saltos ni emojis para máxima compatibilidad)
  const raw = '¡Hola, estoy interesado en ... ';
  const text = encodeURIComponent(raw);

  // Detección muy simple de móvil
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Forzar Web en desktop (workaround) y usar API en móvil
  const href = isMobile
    ? `https://api.whatsapp.com/send?phone=${phone}&text=${text}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      aria-label="Chatea con nosotros en WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
