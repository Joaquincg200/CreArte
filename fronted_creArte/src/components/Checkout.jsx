import React, { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Checkout({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const user = cookies.get("user");

  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Cargar la dirección del localStorage al montar el componente
  const address = JSON.parse(localStorage.getItem("address"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe no está inicializado");
      setLoading(false);
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);

    stripe.createToken(cardNumber).then(({ error: stripeError, token }) => {
      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      console.log("Token generado:", token);

      // Agrupar productos por vendedor
      const ordersBySeller = {};
      cart.forEach((item) => {
        const sellerId = item.sellerId || item.idUser;
        if (!ordersBySeller[sellerId]) ordersBySeller[sellerId] = [];
        ordersBySeller[sellerId].push({
          productId: item.id,
          quantity: item.quantity,
        });
      });

      // Validar que exista la dirección
      if (!address) {
        setError("No se proporcionó la dirección del usuario");
        setLoading(false);
        return;
      }

      console.log("Dirección del usuario:", address);

      // Enviar órdenes por vendedor
      Object.keys(ordersBySeller).forEach((sellerId) => {
        const orderData = {
          idUser: parseInt(sellerId), // vendedor
          buyer: user.id, // comprador
          orderItems: ordersBySeller[sellerId],
          stripeToken: token?.id,
          // toda la dirección como objeto
          name: address?.name,
          lastname: address?.lastname,
          phone: address?.phone,
          address: address?.address,
          number: address?.number,
          floor: address?.floor,
          city: address?.city,
          postalCode: address?.postalCode,
        };

        axios
          .post("http://localhost:8080/api/orders/new", orderData, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            console.log("Orden creada:", response.data);
          })
          .catch((err) => {
            console.error(
              "Error al crear orden:",
              err.response?.data?.message || err.message
            );
          });
      });

      // Limpiar carrito y redirigir
      localStorage.removeItem("cart");
      setCart([]);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate("/"), 1000);
    });
  };

  const baseStyle = {
    fontSize: "16px",
    color: "#000",
    "::placeholder": { color: "#888" },
  };

  console.log(address);
  return (
    <div
      className="p-4 border rounded shadow-sm"
      style={{ backgroundColor: "#F5EDE0" }}
    >
      <h4 className="fw-bold mb-4">Pago con tarjeta</h4>

      {success ? (
        <div className="alert alert-success">Pago realizado con éxito ✅</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Número de tarjeta</label>
            <div className="form-control">
              <CardNumberElement options={{ style: { base: baseStyle } }} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <label className="form-label fw-semibold">Expiración</label>
              <div className="form-control">
                <CardExpiryElement options={{ style: { base: baseStyle } }} />
              </div>
            </div>
            <div className="col-6">
              <label className="form-label fw-semibold">CVV</label>
              <div className="form-control">
                <CardCvcElement options={{ style: { base: baseStyle } }} />
              </div>
            </div>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#C1A16A", color: "#fff" }}
            disabled={!stripe || loading}
          >
            {loading ? "Procesando..." : `Pagar ${amount?.toFixed(2)} €`}
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
