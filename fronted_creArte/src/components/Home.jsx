import React, { useEffect, useState } from "react";
import api from "../api/api";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);
  return (
    <div>
      <header style={{ position: "sticky", top: "0", zIndex: "1000" }}>
        <Header />
      </header>

      <main style={{ backgroundColor: "#FFFDF6" }}>
        {/* Imagen */}
        <div className="container p-3 position-relative">
          <img
            className="img-fluid w-100 rounded"
            src="img/imgi_4_generated-image-de879b25-a970-4b20-935f-866d61d738ce.jpg"
            alt="Banner principal de creArte"
            style={{
              objectFit: "cover",
              height: "auto",
              filter: "grayscale(35%) blur(2px)",
            }}
          />
          {/* Texto encima de la imagen */}
          <div
            className="position-absolute top-50 start-50 translate-middle text-center px-3"
            style={{ width: "100%", maxWidth: "600px" }}
          >
            <h2
              className="fw-bold display-5"
              style={{
                color: "#FAF6F0",
                textShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              Hecho a mano, diseñado para la vida
            </h2>
            <p
              className="lead mb-4"
              style={{
                color: "#000000",
                textShadow: "0 2px 6px rgba(0,0,0,0.6)",
              }}
            >
              Descubre productos de alta calidad elaborados por talentosos
              artesanos de todo el mundo.
            </p>
            <button
              className="btn-hero btn px-4 py-2 fw-semibold rounded-pill"
              style={{
                backgroundColor: "#D28C64",
                color: "#FAF6F0",
                border: "none",
              }}
            >
              Explora nuestra colección
            </button>
          </div>
        </div>

        {/* Productos sugeridos*/}
        <div className="container p-3">
          <div className="row g-3">
            <h1>Productos Sugeridos</h1>
            {products.map((product) => (
              <div className="col-lg-3 col-md-6" key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card h-100 shadow-sm"
                    style={{
                      border: "2px solid #C77C57",
                      borderRadius: "12px",
                      backgroundColor: "#FAF7F2",
                    }}
                  >
                    <img
                      src={product.image || "img/shopping.webp"}
                      className="card-img-top img-fluid rounded-top"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title" style={{ color: "#6B4F3A" }}>
                        {product.name}
                      </h5>
                      <p
                        className="card-text fw-bold mt-auto"
                        style={{ color: "#C77C57" }}
                      >
                        {product.price} €
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
