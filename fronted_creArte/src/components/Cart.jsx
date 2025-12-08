import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Cookies from "universal-cookie";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const cookies = new Cookies();

  const session = cookies.get("session");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const decreaseQuantity = (id) => {
    const updated = cart.map((product) => {
      if (product.id === id) {
        product.quantity = Math.max(1, product.quantity - 1);
      }
      return product;
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQuantity = (id) => {
    const updated = cart.map((product) => {
      if (product.id === id) {
        if (product.quantity < product.stock) {
          product.quantity += 1;
        }
      }
      return product;
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const newcart = cart.filter((product) => product.id !== id);
    setCart(newcart);
    localStorage.setItem("cart", JSON.stringify(newcart));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCost = subtotal > 10 ? 0 : 3.99;

  const total = subtotal + shippingCost;

  return (
    <div style={{ backgroundColor: "#FFFDF6", minHeight: "100vh" }}>
      <header>
        <Header />
      </header>

      <div className="container my-5">
        {/* Título */}
          <h1 className="fw-bold">Tu carrito de compra</h1>

        <div className="row mt-4">
          {/* LISTA DE PRODUCTOS */}
          <div className="col-md-8">
            {/* Encabezado */}
            <div className="d-flex border-bottom pb-2 fw-semibold">
              <div className="col-6">Producto</div>
              <div className="col-3 text-end">Cantidad</div>
            </div>

            {/* Productos */}
            {cart.length === 0 ? (
              <p className="mt-3">Tu carrito está vacío.</p>
            ) : (
              cart.map((product) => (
                <div
                  key={product.id}
                  className="d-flex align-items-center py-3 border-bottom"
                >
                  {/* Imagen + Nombre */}
                  <div className="col-6 d-flex align-items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-thumbnail me-3"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                      }}
                    />

                    {/* Contenedor vertical para nombre y precio */}
                    <div className="d-flex flex-column">
                      <span className="fw-medium">{product.name}</span>
                      <span className="fw-semibold text-muted">
                        {product.price} €
                      </span>
                      <button
                        className="btn btn-link text-danger p-0"
                        onClick={() => removeFromCart(product.id)}
                        style={{
                          textDecoration: "none",
                          fontWeight: "500",
                          cursor: "pointer",
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Cantidad con botones */}
                  <div className="col-3 d-flex justify-content-end align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      -
                    </button>

                    <span className="mx-3 fw-bold">{product.quantity}</span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => increaseQuantity(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Volver a tienda */}
            <Link to="/shop" className="btn mt-4" style={{ color: "#000000" }}>
              <i class="bi bi-arrow-left"></i> Volver a la tienda
            </Link>
          </div>

          {/* RESUMEN DEL PEDIDO */}
          <div className="col-md-4">
            <div
              className="p-4 border rounded shadow-sm"
              style={{ backgroundColor: "#F5EDE0" }}
            >
              <h4 className="fw-bold mb-3">Resumen del pedido</h4>

              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Envío:</span>
                <span>{shippingCost.toFixed(2)} €</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold mt-2">
                <span>Total:</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              {session ? (
                <Link
                  to={"/cart/address"}
                  className="btn w-100 mt-4"
                  style={{ backgroundColor: "#C1A16A", color: "#FFFFFF" }}
                >
                  Realizar pedido
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="btn w-100 mt-4"
                  style={{ backgroundColor: "#C1A16A", color: "#FFFFFF" }}
                >
                  Realizar pedido
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
