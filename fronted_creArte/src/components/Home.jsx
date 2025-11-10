import React, { useEffect, useState } from "react";
import api from "../api/api";
import Header from "./Header";
import Footer from "./Footer";

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
      <header>
        <Header />
      </header>


      <main style={{ backgroundColor: "#FFFDF6" }}>
        {/* Imagen */}
        <div className="container p-3 position-relative">
          <img
            className="img-fluid w-100 rounded"
            src="/img/imgi_4_generated-image-de879b25-a970-4b20-935f-866d61d738ce.jpg"
            alt="Banner principal de creArte"
            style={{ objectFit: "cover", height: "auto" }}
          />
          {/* Texto encima de la imagen */}
          <div
            className="position-absolute top-50 start-50 translate-middle text-center px-3"
            style={{ width: "100%", maxWidth: "600px" }}
          >
            <h2
              className="fw-bold display-5"
              style={{
                color: "#E3B23C",
                textShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              Hecho a mano, diseñado para la vida
            </h2>
            <p
              className="lead mb-4"
              style={{
                color: "#FFFDF6",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              Descubre productos de alta calidad elaborados por talentosos
              artesanos de todo el mundo.
            </p>
            <button className="btn btn-outline-light px-4 py-2 fw-semibold rounded-pill">
              Explora nuestra colección
            </button>
          </div>
        </div>
        
        {/* Productos sugeridos*/}
        <div className="container p-3" style={{ color: "#2B2B2B" }}>
          <h2>Productos sugeridos</h2>
          <div className="container-fluid row">
            {products.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <img
                  className="img-fluid rounded"
                  src="img/shopping.webp"
                  alt=""
                />
                <h5 className="m-0" style={{ color: "#E3B23C" }}>
                  {product.name}
                </h5>
                <h6 className="m-0" style={{ color: "#E87A68" }}>
                  {product.description}
                </h6>
                <h6 className="m-0">{product.price}€</h6>
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
