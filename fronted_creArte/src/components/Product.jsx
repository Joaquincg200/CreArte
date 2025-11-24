import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product/" + id)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error al obtener el producto:", error));
  }, [id]);

  const handleAddToCart = () => {
    alert("Producto añadido al carrito!");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="container my-5">
        {!product ? (
          <p>Cargando producto...</p>
        ) : (
          <div className="row align-items-start">
            {/* Imagen */}
            <div className="col-md-5 mb-3 d-flex flex-column align-items-center">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: "300px", objectFit: "contain" }}
              />
              <p className="mt-3 text-center">{product.description}</p>
            </div>

            {/* Información */}
            <div className="col-md-7">
              <div className="p-4 border rounded shadow bg-white">
                <h2>{product.name}</h2>
                <p>
                  <strong>Precio:</strong> {product.price} €
                </p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleAddToCart}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-5">
        <Footer />
      </footer>
    </div>
  );
}

export default Product;
