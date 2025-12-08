import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import VoiceflowWidget from "./VoiceflowWidget";

const PrivacyPolicy = () => {
  return (
    <div style={{ backgroundColor: "#FFFDF6", minHeight: "100vh" }}>
      <Header />

      {/* Banner */}
      <div
        style={{ height: "250px", backgroundImage: 'url("/img/imgi_5_generated-image-edb10665-d6fa-4908-aad6-850410c594d1.jpg")' , backgroundSize: "cover", backgroundPosition: "center" }}
        className="position-relative"
      >
        <h1
          className="position-absolute top-50 start-50 translate-middle text-white fw-bold"
          style={{ fontSize: "2.5rem" }}
        >
          Política de Privacidad
        </h1>
      </div>

      {/* Contenido */}
      <div className="container my-5">
        <div className="p-4 rounded shadow" style={{ backgroundColor: "#F5EDE0" }}>
          <h2 className="mb-3">Recopilación de Datos</h2>
          <p>
            Recopilamos información personal necesaria para procesar pedidos, enviar
            comunicaciones y mejorar la experiencia del usuario.
          </p>

          <h2 className="mb-3 mt-4">Uso de la Información</h2>
          <p>
            La información proporcionada se utiliza únicamente para fines internos,
            incluyendo gestión de pedidos, atención al cliente y envío de ofertas
            personalizadas.
          </p>

          <h2 className="mb-3 mt-4">Protección de Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger
            los datos personales de accesos no autorizados o pérdidas.
          </p>

          <h2 className="mb-3 mt-4">Cookies</h2>
          <p>
            Nuestro sitio utiliza cookies para mejorar la navegación, recordar
            preferencias y analizar el tráfico del sitio.
          </p>
        </div>
        <VoiceflowWidget />
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
