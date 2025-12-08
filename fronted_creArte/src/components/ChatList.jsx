import React, { useEffect, useState } from "react";
import { db } from "../messaging/firebaseConfig";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ChatList = ({ userId }) => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatDataArray = snapshot.docs.map((docSnap) => {
        const chat = { ...docSnap.data(), id: docSnap.id };
        return chat;
      });

      setChats(chatDataArray);

      // Por cada chat, escuchar el último mensaje y contar los no leídos
      chatDataArray.forEach((chat) => {
        const messagesRef = collection(db, `chats/${chat.id}/messages`);
        const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"), limit(1));

        onSnapshot(messagesQuery, (msgSnap) => {
          if (!msgSnap.empty) {
            const lastMsg = msgSnap.docs[0].data();
            setChats((prev) =>
              prev.map((c) =>
                c.id === chat.id
                  ? {
                      ...c,
                      lastMessage: lastMsg,
                      unreadCount: lastMsg.senderId !== userId && !(lastMsg.readBy?.includes(userId)) ? 1 : 0,
                    }
                  : c
              )
            );
          }
        });
      });
    });

    return () => unsubscribe();
  }, [userId]);

  const openChat = (chatId) => {
    navigate(`/sellerDashboard/chats/${chatId}`);
  };

  return (
    <div>
      {chats.length === 0 && <p>No tienes chats aún</p>}
      {chats.map((chat) => {
        const buyerId = chat.participants.find((p) => p !== userId);
        return (
          <div
            key={chat.id}
            className="p-3 mb-2 rounded shadow-sm d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#FFFDF6", cursor: "pointer" }}
            onClick={() => openChat(chat.id)}
          >
            <div>
              <strong>Comprador:</strong> {buyerId} <br />
              <small>
                {chat.lastMessage
                  ? `${chat.lastMessage.text.slice(0, 30)}${chat.lastMessage.text.length > 30 ? "..." : ""}`
                  : "Sin mensajes aún"}
              </small>
              <br />
              <small>
                {chat.lastMessage?.createdAt
                  ? new Date(chat.lastMessage.createdAt.seconds * 1000).toLocaleString()
                  : ""}
              </small>
            </div>
            {chat.unreadCount > 0 && (
              <span
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                }}
              >
                {chat.unreadCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
