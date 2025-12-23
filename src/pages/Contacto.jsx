// src/pages/Contacto.jsx
// =============================================================================
// Contacto (con Formspree opcional) + validación + honeypot + checkbox obligatorio
// de aceptación de Política de Tratamiento de Datos (Ley 1581 / Habeas Data).
//
// Nota:
// - NO se altera tu copy existente.
// - Se añade: acceptedPolicy + validación + bloque UI del check + envío explícito.
// =============================================================================

import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import styles from "../styles/Contacto.module.css";

/**
 * Construye URL de WhatsApp con mensaje prellenado.
 * - Toma el número desde env para no “quemarlo” en el código.
 */
const buildWhatsAppLink = (text = "") => {
  const phone = import.meta.env.VITE_WHATSAPP_PHONE || "573000000000";
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encoded}`;
};

/**
 * Mailto de respaldo si no hay Formspree ID.
 */
const buildMailtoHref = ({ name, email, phone, message }) => {
  const to = "ventas@pronto-office.com"; // <-- cámbialo si usas otro correo
  const subject = `Contacto desde la web - ${name || "Sin nombre"}`;
  const body = `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`.replace(
    /\n/g,
    "%0D%0A"
  );
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
};

export default function Contacto() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState("");

  // ✅ NUEVO: consentimiento explícito (obligatorio)
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [policyError, setPolicyError] = useState("");

  // Endpoint de Formspree
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const action = useMemo(
    () => (formspreeId ? `https://formspree.io/f/${formspreeId}` : undefined),
    [formspreeId]
  );

  // Validación ligera en cliente
  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Escribe tu nombre (mín. 2 caracteres).";
    if (!form.email.trim()) e.email = "El email es obligatorio.";
    if (!form.phone.trim() || !/^\+?\d[\d\s\-().]{6,}$/.test(form.phone.trim())) e.phone = "Ingresa un teléfono válido.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Cuéntanos más (mín. 10 caracteres).";

    // ✅ NUEVO: política obligatoria
    if (!acceptedPolicy) e.policy = "Debes aceptar la Política de Tratamiento de Datos Personales.";

    return e;
  };

  const onChange = (ev) => {
    const { name, value } = ev.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const e = validate();
    setErrors(e);

    // ✅ NUEVO: muestra error del check en UI
    if (!acceptedPolicy) {
      setPolicyError("Debes aceptar la Política de Tratamiento de Datos Personales.");
      return;
    } else {
      setPolicyError("");
    }

    if (Object.keys(e).length) return;

    if (!action) {
      // Fallback sin Formspree
      window.location.href = buildMailtoHref(form);
      return;
    }

    try {
      setStatus("loading");
      setServerMsg("");

      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,

          // ✅ NUEVO: evidencia de consentimiento (buenas prácticas legales)
          acceptedPolicy: true,
          policyVersion: "2025-01",

          _subject: `Nuevo contacto: ${form.name || "Sin nombre"}`, // ✅ ayuda en el inbox
          _replyto: form.email, // ✅ permite “Reply” directo
        }),
      });

      if (res.ok) {
        setStatus("success");
        setServerMsg("¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.");
        setForm({ name: "", phone: "", email: "", message: "" });
        setAcceptedPolicy(false);
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || "No pudimos enviar el formulario.");
      }
    } catch (err) {
      setStatus("error");
      setServerMsg(err.message || "Ocurrió un error al enviar. Intenta de nuevo.");
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
          content="¿Necesitas tableros, carteleras o soluciones en acrílico/corcho? Escríbenos y recibe atención rápida por email o WhatsApp."
        />
        <link rel="canonical" href="https://www.pronto-office.com/contacto" />
      </Helmet>

      <section className={styles.section}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} xl={7}>
              <header className={styles.header}>
                <h1 className={styles.title}>Hablemos de tu proyecto</h1>
                <p className={styles.subtitle}>Respuesta en menos de 24h. También puedes escribirnos por WhatsApp.</p>
              </header>

              {/* Mensajes accesibles */}
              <div role="status" aria-live="polite" className={styles.liveRegion}>
                {status === "loading" && (
                  <Alert variant="info" className="mb-3">
                    <Spinner animation="border" size="sm" className="me-2" /> Enviando…
                  </Alert>
                )}
                {status === "success" && <Alert variant="success" className="mb-3">{serverMsg}</Alert>}
                {status === "error" && <Alert variant="danger" className="mb-3">{serverMsg}</Alert>}
              </div>

              <Form className={styles.form} action={action} method="POST" onSubmit={onSubmit} noValidate>
                <Form.Group className="mb-3" controlId="contactName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={onChange}
                    required
                    minLength={2}
                    autoComplete="name" /* ✅ */
                    aria-invalid={!!errors.name}
                    aria-describedby="nameHelp nameError"
                  />
                  <Form.Text id="nameHelp">Cómo te llamamos 🙌</Form.Text>
                  {errors.name && (
                    <div id="nameError" className={styles.error} role="alert">
                      {errors.name}
                    </div>
                  )}
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="contactPhone">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="Ej: +57 300 000 0000"
                        value={form.phone}
                        onChange={onChange}
                        required
                        autoComplete="tel" /* ✅ */
                        aria-invalid={!!errors.phone}
                        aria-describedby="phoneHelp phoneError"
                      />
                      <Form.Text id="phoneHelp">Preferible WhatsApp</Form.Text>
                      {errors.phone && (
                        <div id="phoneError" className={styles.error} role="alert">
                          {errors.phone}
                        </div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="contactEmail">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={form.email}
                        onChange={onChange}
                        required
                        autoComplete="email" /* ✅ */
                        aria-invalid={!!errors.email}
                        aria-describedby="emailError"
                      />
                      {errors.email && (
                        <div id="emailError" className={styles.error} role="alert">
                          {errors.email}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="contactMessage">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Cuéntanos qué necesitas (medidas, cantidades, plazos)…"
                    value={form.message}
                    onChange={onChange}
                    required
                    minLength={10}
                    maxLength={1500}
                    autoComplete="off" /* ✅ */
                    aria-invalid={!!errors.message}
                    aria-describedby="messageError"
                  />
                  {errors.message && (
                    <div id="messageError" className={styles.error} role="alert">
                      {errors.message}
                    </div>
                  )}
                </Form.Group>

                {/* Honeypot anti-spam */}
                <input type="text" name="_gotcha" className={styles.honeypot} tabIndex="-1" autoComplete="off" />

                {/* ✅ NUEVO: Aceptación Política de Datos (obligatoria) */}
                <Form.Group className="mb-3" controlId="acceptPolicy">
                  <Form.Check
                    type="checkbox"
                    id="policyCheck"
                    checked={acceptedPolicy}
                    onChange={(e) => setAcceptedPolicy(e.target.checked)}
                    required
                    aria-required="true"
                    aria-invalid={!!policyError}
                    label={
                      <>
                        Acepto la{" "}
                        <a href="/privacidad" target="_blank" rel="noopener noreferrer">
                          Política de Tratamiento de Datos Personales
                        </a>
                      </>
                    }
                  />
                  {(policyError || errors.policy) && (
                    <div className={styles.error} role="alert">
                      {policyError || errors.policy}
                    </div>
                  )}
                </Form.Group>

                <div className={styles.actions}>
                  <Button type="submit" variant="primary" className={styles.submit} disabled={status === "loading"}>
                    {status === "loading" ? "Enviando…" : "Enviar"}
                  </Button>

                  <a
                    className={styles.whatsapp}
                    href={buildWhatsAppLink("Hola, vengo de la web y quiero cotizar tableros/carteleras. ¿Me ayudas?")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribir por WhatsApp"
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
