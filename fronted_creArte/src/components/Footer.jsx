import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div style={{ backgroundColor: "#A3B18A", color: "#FAF7F2" }}>
      <div className="border-top border-bottom">
        {/* Emporio artesanal */}
        <div className="container p-3 ">
          <div className="row">
            <div className="col-4 d-column align-items-center justify-content-center">
              <h5>Emporio artesanal</h5>
              <p className="mb-0">Celebramos la artesanía de todo el mundo.</p>
              <p>
                Descubre productos únicos, hechos a mano, que cuentan una
                historia.
              </p>
            </div>

            {/* Servicio al cliente */}
            <div className="col-4 d-column align-items-center justify-content-center">
              <h5>Servicio al cliente</h5>
              <Link to={"/contact"} className="mb-0 text-decoration-none" style={{color:"#FFFFFF"}}>Contacto</Link><br />
              <Link to={"/faq"} className="mb-0 text-decoration-none" style={{color:"#FFFFFF"}}>FAQ</Link><br />
              <Link to={"/privacyPolicy"} className="mb-0 text-decoration-none" style={{color:"#FFFFFF"}}>Política de privacidad</Link>
            </div>

            {/* Redes sociales*/}
            <div className="col-4 flex-column align-items-center justify-content-center">
              <h5>Siguenos</h5>
              <div className="row gap-3">
                <div className="col-6 mx-3">
                  <a href="https://www.instagram.com/">
                    <i
                      style={{ color: "#FAF7F2" }}
                      className="bi bi-instagram fs-5 me-3"
                    ></i>
                  </a>
                  <a href="https://www.instagram.com/">
                    <i
                      style={{ color: "#FAF7F2" }}
                      className="bi bi-twitter-x fs-5"
                    ></i>
                  </a>
                </div>
                <div className="col-6 mx-3">
                  <a href="https://www.instagram.com/">
                    <i
                      style={{ color: "#FAF7F2" }}
                      className="bi bi-facebook fs-5 me-3"
                    ></i>
                  </a>
                  <a href="https://www.instagram.com/">
                    <i
                      style={{ color: "#FAF7F2" }}
                      className="bi bi-tiktok fs-5"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-4">
        @2025 Emporio artesanal. Reservados todos los derechos
      </div>
    </div>
  );
}

export default Footer;
