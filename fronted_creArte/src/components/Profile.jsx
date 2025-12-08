import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../messaging/firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const Perfil = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const normalizeAvatar = (img) => {
    if (!img) return "/img/sbcf-default-avatar.webp";
    if (img.startsWith("data:image")) return img;
    if (/^[A-Za-z0-9+/=]+$/.test(img)) return `data:image/png;base64,${img}`;
    return img;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    phone: "",
    avatar: "/img/sbcf-default-avatar.webp",
  });

  const [preview, setPreview] = useState("/img/sbcf-default-avatar.webp");
  const [imageFile, setImageFile] = useState(null);
  const [hoverImg, setHoverImg] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/user/${id}`)
      .then((response) => {
        const normalized = normalizeAvatar(response.data.avatar);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          avatar: normalized,
          oldPassword: "",
          newPassword: "",
        });
        setPreview(normalized);
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleSubmit = async () => {
    let avatarToSend = preview;
    if (imageFile) avatarToSend = await toBase64(imageFile);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      avatar: avatarToSend,
    };

    if (formData.newPassword?.trim() !== "") {
      payload.password = formData.newPassword;
      payload.oldPassword = formData.oldPassword;
    }

    axios
      .put(`http://localhost:8080/api/users/update/${id}`, payload)
      .then((response) => {
        const updatedAvatar = normalizeAvatar(
          response.data.avatar || avatarToSend
        );
        setPreview(updatedAvatar);
        setFormData({ ...formData, avatar: updatedAvatar });
        alert("Perfil actualizado correctamente");
      })
      .catch(console.error);
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/orders/buyer/${id}`)
      .then((response) => setOrders(response.data))
      .catch(console.error);
  }, [id]);

  const handleReturn = (orderId) => {
    axios
      .put(`http://localhost:8080/api/orders/cancel/${orderId}`)
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "DEVUELTO" } : order
          )
        );
        alert("Pedido devuelto correctamente");
      })
      .catch(console.error);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prev) =>
        prev.filter(
          (order) => order.status !== "CANCELADO" && order.status !== "DEVUELTO"
        )
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const openChat = async (sellerId) => {
    const buyerId = id; // <-- ID del usuario logueado, no de la URL

    const chatId =
      buyerId < sellerId ? `${buyerId}_${sellerId}` : `${sellerId}_${buyerId}`;
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [buyerId, sellerId],
        messages: [],
        createdAt: serverTimestamp(),
      });
      console.log("Chat creado con éxito");
    } else {
      console.log("Chat existente cargado");
    }

    navigate(`/chat/${chatId}`);
  };

  return (
    <div style={{ backgroundColor: "#FFFDF6", minHeight: "100vh" }}>
      <Header />
      {/* Banner */}
      <div
        style={{ height: "300px", backgroundColor: "#C77C57" }}
        className="position-relative"
      >
        <img
          src="/img/imgi_4_generated-image-de879b25-a970-4b20-935f-866d61d738ce.jpg"
          alt="Banner"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Contenido principal */}
      <div className="container mt-5">
        <div className="row">
          {/* FORMULARIO + IMAGEN */}
          <div className="col-lg-12 mb-4">
            <div
              className="p-4 border rounded shadow"
              style={{ backgroundColor: "#F5EDE0" }}
            >
              <h4 className="mb-4">Perfil</h4>
              <form onSubmit={handleSubmit}>
                <div className="row align-items-center">
                  {/* IMAGEN */}
                  <div className="col-md-4 text-center mb-3">
                    <div
                      className="position-relative d-inline-block"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => setHoverImg(true)}
                      onMouseLeave={() => setHoverImg(false)}
                      onClick={handleImageClick}
                    >
                      <img
                        src={preview}
                        alt="Usuario"
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                          filter: hoverImg ? "grayscale(50%)" : "none",
                          transition: "0.3s",
                          cursor: "pointer",
                        }}
                      />
                      {hoverImg && (
                        <div
                          className="position-absolute top-50 start-50 translate-middle"
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.3)",
                            color: "#FFF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "1.5rem",
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {/* CAMPOS */}
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Contraseña antigua
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Nueva contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-hero btn px-4 py-2 fw-semibold rounded-pill w-100"
                      style={{
                        backgroundColor: "#D28C64",
                        color: "#FAF6F0",
                        border: "none",
                      }}
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Productos pedidos */}
          <div className="col-lg-12 mb-3">
            <div
              className="p-3 border rounded shadow"
              style={{ backgroundColor: "#F5EDE0" }}
            >
              <h4>Productos pedidos</h4>
              <table
                className="table align-middle table-hover shadow-sm"
                style={{
                  backgroundColor: "#FFFDF6",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <thead
                  style={{
                    backgroundColor: "#E8DCC8",
                    color: "#6B4F3F",
                    fontWeight: "600",
                  }}
                >
                  <tr>
                    <th className="text-center">Pedido</th>
                    <th className="text-center">Productos</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(orders) &&
                  orders.filter(
                    (order) =>
                      order.status !== "CANCELADO" &&
                      order.status !== "DEVUELTO"
                  ).length > 0 ? (
                    orders
                      .filter((order) => order.status !== "CANCELADO")
                      .map((order) => (
                        <tr
                          key={order.id}
                          style={{ borderBottom: "1px solid #f0e6d9" }}
                        >
                          <td className="text-center fw-semibold text-uppercase">
                            Pedido #{order.id}
                          </td>
                          <td className="text-center">
                            {order.items?.map((item) => (
                              <div
                                key={item.productId}
                                style={{ marginBottom: "0.5em" }}
                              >
                                {item.productName || item.productId} x{" "}
                                {item.quantity}{" "}
                              </div>
                            ))}
                          </td>
                          <td className="text-center">
                            {order.total?.toFixed(2) || "0.00"} €
                          </td>
                          <td className="text-center">
                            <span
                              className={`badge ${
                                order.status === "PENDIENTE"
                                  ? "bg-warning text-dark"
                                  : order.status === "ENVIADO"
                                  ? "bg-info text-dark"
                                  : order.status === "ENTREGADO"
                                  ? "bg-success"
                                  : "bg-devuelto"
                              }`}
                              style={{
                                fontWeight: 600,
                                padding: "0.5em 0.75em",
                              }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="text-center">
                            {order.status === "PENDIENTE" ? (
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleReturn(order.id)}
                              >
                                Cancelar
                              </button>
                            ) : (
                              <span
                                style={{ color: "#888", fontSize: "0.85rem" }}
                              >
                                No disponible
                              </span>
                            )}
                            {order.items?.map((item) => (
                              <button
                                className="btn btn-sm"
                                style={{
                                  marginLeft: "0.5em",
                                  color: "#C77C57",
                                }}
                                onClick={() => openChat(item.sellerId)}
                              >
                                <i class="bi bi-chat-fill"></i>
                              </button>
                            ))}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No hay pedidos
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
