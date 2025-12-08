import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import VoiceflowWidget from "./VoiceflowWidget";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false); // para mostrar mensaje de envío

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitted(false); // ocultar mensaje si el usuario vuelve a escribir
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Mensaje enviado:", formData);

    // Limpiamos el formulario y mostramos mensaje
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitted(true);
  };

  return (
    <div>
      <Header></Header>
      <div className="container my-5" style={{ backgroundColor: "#FFFDF6" }}>
        <h2 className="mb-4 text-center">Contáctanos</h2>
        <div className="row">
          {/* Información de contacto */}
          <div className="col-md-4 mb-4">
            <div
              className="p-3 border rounded shadow-sm"
              style={{ backgroundColor: "#F5EDE0" }}
            >
              <h5>Información de Contacto</h5>
              <p>
                <strong>Correo:</strong> info@crearte.com
              </p>
              <p>
                <strong>Teléfono:</strong> +34 600 123 456
              </p>
              <p>
                <strong>Dirección:</strong> Calle País de las maravillas 2, Murcia, España
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="col-md-8">
            <div
              className="p-4 border rounded shadow-sm"
              style={{ backgroundColor: "#F5EDE0" }}
            >
              <h5>Envíanos un mensaje</h5>

              {submitted && (
                <div className="alert alert-success">
                  ¡Mensaje enviado correctamente!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Asunto</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mensaje</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    type="submit"
                    className="btn-hero btn px-4 py-2 fw-semibold rounded-pill"
                    style={{
                      backgroundColor: "#D28C64",
                      color: "#FAF6F0",
                      border: "none",
                    }}
                  >
                    Enviar
                  </button>
                  {submitted && (
                    <span className="text-success fw-semibold mx-2">
                      ¡Mensaje enviado!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <VoiceflowWidget />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Contact;
