import React, { useEffect, useState } from "react";
import { db } from "../messaging/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import Cookies from "universal-cookie";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [buyer, setBuyer] = useState(null);
  const [seller, setSeller] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [chatName, setChatName] = useState("");

  const cookies = new Cookies();
  const user = cookies.get("user");
  const userIdLocal = user ? user.id : null;
  const navigate = useNavigate();

  // Normalizar avatar
  const normalizeAvatar = (img) => {
    if (!img) return "/img/sbcf-default-avatar.webp";
    if (img.startsWith("data:image")) return img;
    if (/^[A-Za-z0-9+/=]+$/.test(img)) return `data:image/png;base64,${img}`;
    return img;
  };

  // Traer mensajes del chat
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Traer el nombre del producto y participantes
  useEffect(() => {
    if (!chatId) return;

    const fetchChat = async () => {
      const chatRef = doc(db, "chats", chatId);
      const chatSnap = await getDoc(chatRef);

      if (chatSnap.exists()) {
        const data = chatSnap.data();
        setChatName(data.productName || "Producto desconocido");
        setParticipants(data.participants || []);
      }
    };

    fetchChat();
  }, [chatId]);

  // Traer información del comprador
  useEffect(() => {
    if (!participants.length || !userIdLocal) return;

    const buyerId = participants.find((id) => id !== userIdLocal);

    if (!buyerId) return;

    axios
      .get(`http://localhost:8080/api/users/user/${buyerId}`)
      .then((response) => {
        const data = response.data;
        setBuyer({
          ...data,
          avatar: normalizeAvatar(
            data.avatar || data.image || data.profileImage
          ),
        });
      })
      .catch(console.error);
  }, [participants, userIdLocal]);

  // Traer información del vendedor
  useEffect(() => {
    if (!participants.length) return;

    Promise.all(
      participants.map((id) =>
        axios.get(`http://localhost:8080/api/users/user/${id}`)
      )
    )
      .then((responses) => {
        const users = responses.map((r) => r.data);
        const sellerUser = users.find((u) => u.role === "VENDEDOR");
        if (!sellerUser) return;

        setSeller({
          ...sellerUser,
          avatar: normalizeAvatar(
            sellerUser.avatar || sellerUser.image || sellerUser.profileImage
          ),
        });
      })
      .catch(console.error);
  }, [participants]);

  // Enviar mensaje
  const sendMessage = async () => {
    if (!message.trim() || !userIdLocal) return;

    await addDoc(collection(db, `chats/${chatId}/messages`), {
      senderId: userIdLocal,
      text: message,
      createdAt: serverTimestamp(),
    });

    setMessage("");
  };

  const handleGoBack = () => {
    if (user?.role === "VENDEDOR") navigate("/sellerDashboard/chats");
    else navigate(`/profile/${userIdLocal}`);
  };

  return (
    <div className="container" style={{ maxWidth: "700px", marginTop: "50px" }}>
      {/* Botón de volver */}
      <button
        onClick={handleGoBack}
        className="btn btn-light mb-3 d-flex align-items-center"
        style={{ gap: "5px" }}
      >
        <i className="bi bi-arrow-left"></i> Volver
      </button>

      {/* Cabecera chat con producto y avatar del otro usuario */}
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: "#F5EDE0",
          padding: "10px 15px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >

        <div className="d-flex align-items-center gap-2">
          {user?.role === "VENDEDOR" && buyer && (
            <>
              <img
                src={buyer.avatar}
                alt="Avatar comprador"
                width={38}
                height={38}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <span style={{ fontSize: "0.85rem", color: "#5A3E2B" }}>
                {buyer.username || buyer.name}
              </span>
            </>
          )}

          {user?.role !== "VENDEDOR" && seller && (
            <>
              <img
                src={seller.avatar}
                alt="Avatar vendedor"
                width={38}
                height={38}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <span style={{ fontSize: "0.85rem", color: "#5A3E2B" }}>
                {seller.username || seller.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Mensajes */}
      <div
        className="p-3 rounded"
        style={{
          backgroundColor: "#FFFDF6",
          maxHeight: "450px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        {messages.length === 0 && (
          <p className="text-center text-muted">No hay mensajes aún</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex ${
              msg.senderId === userIdLocal
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className="p-2"
              style={{
                backgroundColor:
                  msg.senderId === userIdLocal ? "#D28C64" : "#E0E0E0",
                color: msg.senderId === userIdLocal ? "#fff" : "#5A3E2B",
                borderRadius: "20px",
                maxWidth: "70%",
                wordBreak: "break-word",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {msg.text}
              {msg.createdAt && (
                <div
                  className="text-end"
                  style={{
                    fontSize: "0.7rem",
                    color: "#7A5A46",
                    marginTop: "3px",
                  }}
                >
                  {new Date(msg.createdAt.seconds * 1000).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input para enviar mensaje */}
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Escribe tu mensaje..."
          style={{ borderRadius: "25px 0 0 25px", borderColor: "#ccc" }}
        />
        <button
          className="btn"
          onClick={sendMessage}
          style={{
            backgroundColor: "#D28C64",
            color: "#fff",
            fontWeight: "500",
            borderRadius: "0 25px 25px 0",
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
