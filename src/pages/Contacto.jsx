// src/pages/Contacto.jsx
// =============================================================================
// Contacto (con Formspree opcional) + validación + honeypot + checkbox obligatorio
// de aceptación de Política de Tratamiento de Datos Personales (Ley 1581 / Habeas Data).
//
// Implementación clave:
// - Link directo a PDF estático en /public
// - URL codificada (acentos + espacios)
// - Evidencia de consentimiento enviada al backend
// - Accesibilidad (ARIA) y UX correctas
// =============================================================================

import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import styles from "../styles/Contacto.module.css";

/**
 * Construye URL de WhatsApp con mensaje prellenado.
 * El número se toma desde variables de entorno.
 */
const buildWhatsAppLink = (text = "") => {
  const phone = import.meta.env.VITE_WHATSAPP_PHONE || "573000000000";
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encoded}`;
};

/**
 * Fallback mailto si no existe Formspree.
 */
const buildMailtoHref = ({ name, email, phone, message }) => {
  const to = "ventas@pronto-office.com";
  const subject = `Contacto desde la web - ${name || "Sin nombre"}`;
  const body = `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`.replace(
    /\n/g,
    "%0D%0A"
  );
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
};

export default function Contacto() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState("");

  // Consentimiento explícito (obligatorio)
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  // Endpoint Formspree
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const action = useMemo(
    () => (formspreeId ? `https://formspree.io/f/${formspreeId}` : undefined),
    [formspreeId]
  );

  /**
   * Validación en cliente
   */
  const validate = () => {
    const e = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      e.name = "Escribe tu nombre (mínimo 2 caracteres).";
    }

    if (!form.email.trim()) {
      e.email = "El email es obligatorio.";
    }

    if (
      !form.phone.trim() ||
      !/^\+?\d[\d\s\-().]{6,}$/.test(form.phone.trim())
    ) {
      e.phone = "Ingresa un teléfono válido.";
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      e.message = "Cuéntanos más detalles (mínimo 10 caracteres).";
    }

    if (!acceptedPolicy) {
      e.policy = "Debes aceptar la Política de Tratamiento de Datos Personales.";
    }

    return e;
  };

  const onChange = (ev) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const e = validate();
    setErrors(e);

    if (!acceptedPolicy) {
      setPolicyError("Debes aceptar la Política de Tratamiento de Datos Personales.");
      return;
    } else {
      setPolicyError("");
    }

    if (Object.keys(e).length) return;

    // Fallback sin Formspree
    if (!action) {
      window.location.href = buildMailtoHref(form);
      return;
    }

    try {
      setStatus("loading");
      setServerMsg("");

      const res = await fetch(action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,

          // Evidencia legal de consentimiento
          acceptedPolicy: true,
          policyVersion: "2025-01",

          _subject: `Nuevo contacto: ${form.name || "Sin nombre"}`,
          _replyto: form.email,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setServerMsg("¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.");
        setForm({ name: "", phone: "", email: "", message: "" });
        setAcceptedPolicy(false);
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.errors?.[0]?.message || "No se pudo enviar el formulario."
        );
      }
    } catch (err) {
      setStatus("error");
      setServerMsg(err.message || "Ocurrió un error al enviar el mensaje.");
    } finally {
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Pronto Office</title>
        <meta
          name="description"
          content="Contáctanos para cotizar tableros, carteleras y soluciones corporativas. Atención rápida por email o WhatsApp."
        />
        <link rel="canonical" href="https://www.pronto-office.com/contacto" />
      </Helmet>

      <section className={styles.section}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} xl={7}>
              <header className={styles.header}>
                <h1 className={styles.title}>Hablemos de tu proyecto</h1>
                <p className={styles.subtitle}>
                  Respuesta en menos de 24 horas. También puedes escribirnos por WhatsApp.
                </p>
              </header>

              <div role="status" aria-live="polite">
                {status === "loading" && (
                  <Alert variant="info">
                    <Spinner size="sm" className="me-2" /> Enviando…
                  </Alert>
                )}
                {status === "success" && <Alert variant="success">{serverMsg}</Alert>}
                {status === "error" && <Alert variant="danger">{serverMsg}</Alert>}
              </div>

              <Form onSubmit={onSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Tu nombre"
                    required
                  />
                  {errors.name && <div className={styles.error}>{errors.name}</div>}
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="+57 300 000 0000"
                        required
                      />
                      {errors.phone && <div className={styles.error}>{errors.phone}</div>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="tu@correo.com"
                        required
                      />
                      {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Cuéntanos qué necesitas (medidas, cantidades, plazos)…"
                    required
                  />
                  {errors.message && <div className={styles.error}>{errors.message}</div>}
                </Form.Group>

                {/* Honeypot */}
                <input type="text" name="_gotcha" className={styles.honeypot} />

                {/* Aceptación Política de Datos */}
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    checked={acceptedPolicy}
                    onChange={(e) => setAcceptedPolicy(e.target.checked)}
                    label={
                      <>
                        Acepto la{" "}
                        <a
                          href="/POL%C3%8DTICA%20DE%20TRATAMIENTO%20DE%20DATOS%20PERSONALES.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.policyLink}
                        >
                          Política de Tratamiento de Datos Personales
                        </a>
                      </>
                    }
                  />
                  {(policyError || errors.policy) && (
                    <div className={styles.error}>{policyError || errors.policy}</div>
                  )}
                </Form.Group>

                <div className={styles.actions}>
                  <Button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Enviando…" : "Enviar"}
                  </Button>

                  <a
                    href={buildWhatsAppLink(
                      "Hola, vengo de la web y quiero cotizar productos. ¿Me ayudas?"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsapp}
                  >
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
