import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import VoiceflowWidget from "./VoiceflowWidget";

const AboutUs = () => {
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
          Sobre Nosotros
        </h1>
      </div>

      {/* Contenido */}
      <div className="container my-5 " >
        <div className="p-4 rounded shadow "style={{ backgroundColor: "#F5EDE0" }} >
          <h2 className="mb-3">Nuestra Historia</h2>
          <p>
            CreArte nace con la misión de ofrecer productos únicos y personalizados,
            creados con pasión y creatividad. Nuestro objetivo es acercar el arte y
            la artesanía a todos nuestros clientes.
          </p>

          <h2 className="mb-3 mt-4">Nuestro Equipo</h2>
          <p>
            Contamos con un equipo de diseñadores, artesanos y profesionales del
            marketing, todos comprometidos con brindar la mejor experiencia de compra.
          </p>

          <h2 className="mb-3 mt-4">Nuestros Valores</h2>
          <ul>
            <li>Calidad y creatividad en todos nuestros productos.</li>
            <li>Atención cercana y personalizada al cliente.</li>
            <li>Compromiso con la sostenibilidad y el medio ambiente.</li>
          </ul>
        </div>
        <VoiceflowWidget />
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
