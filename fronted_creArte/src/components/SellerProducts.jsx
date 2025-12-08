import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { db } from "../messaging/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

function SellerProducts() {
  const [chats, setChats] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedStock, setEditedStock] = useState(0);
  const [editedPrice, setEditedPrice] = useState(0);

  const navigate = useNavigate();
  const cookies = new Cookies();

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const productsPerPage = 8; // Productos por página

  const handlePageChange = (page) => {
    if (page < 1) return;
    if (page > totalPages) return;
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const session = cookies.get("session");
  const user = cookies.get("user");
  const userId = user?.id;

  useEffect(() => {
    if (!user || user.role !== "VENDEDOR" || !session) {
      navigate("/");
    }
  }, [user, navigate, session]);

  const handleLogout = () => {
    cookies.remove("session", { path: "/" });
    cookies.remove("user", { path: "/" });
    window.location.href = "/";
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:8080/api/products/user/" + user.id)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditedStock(product.stock);
    setEditedPrice(product.price);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = (id) => {
    axios
      .put(`http://localhost:8080/api/products/update/${id}`, {
        stock: editedStock,
        price: editedPrice,
      })
      .then(() => {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, stock: editedStock, price: editedPrice } : p
          )
        );
        setEditingId(null);
      })
      .catch((err) => console.error("Error al actualizar producto:", err));
  };

  const [users, setUsers] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/user/${user?.id}`)
      .then((response) => {
        // Podrías actualizar la cookie si quieres la imagen más reciente
        const updatedUser = { ...user, img: response.data.avatar || user.img };
        cookies.set("user", updatedUser, { path: "/" });
        setUsers(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!userId) return;

    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("participants", "array-contains", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let unreadFound = false;

      snapshot.docs.forEach((docSnap) => {
        const chatData = { id: docSnap.id, ...docSnap.data() };
        const messagesRef = collection(db, `chats/${chatData.id}/messages`);
        const lastMessageQuery = query(
          messagesRef,
          orderBy("createdAt", "desc"),
          limit(1)
        );

        onSnapshot(lastMessageQuery, (msgSnap) => {
          if (!msgSnap.empty) {
            const lastMsg = msgSnap.docs[0].data();

            // Comprobar si hay mensajes no leídos
            if (
              lastMsg.senderId !== userId &&
              !lastMsg.readBy?.includes(userId)
            ) {
              unreadFound = true;
              setHasUnread(true);
            } else if (!unreadFound) {
              setHasUnread(false);
            }

            setChats((prev) => {
              const other = prev.filter((c) => c.id !== chatData.id);
              return [...other, { ...chatData, lastMessage: lastMsg }];
            });
          } else {
            // Chat sin mensajes
            setChats((prev) => {
              const other = prev.filter((c) => c.id !== chatData.id);
              return [...other, { ...chatData, lastMessage: null }];
            });
          }
        });
      });
    });

    return () => unsubscribe();
  }, [userId]);

  if (user.role === "COMPRADOR") {
    navigate("/");
  }
  return (
    <div>
      <header className="border-bottom" style={{ backgroundColor: "#C77C57" }}>
        <nav className="navbar navbar-expand-lg w-75 mx-auto container">
          <div className="container-fluid px-4">
            {/* --- IZQUIERDA: Logo --- */}
            <div className="d-flex align-items-center justify-content-between w-100">
              <Link
                style={{ color: "#FFFFFF" }}
                className="navbar-brand fw-bold me-2"
                to="/sellerDashboard"
              >
                <img
                  src="/img/unnamed-removebg-preview.png"
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>

              {/* --- DERECHA: Cuenta + Carrito --- */}
              <div className="d-flex align-items-center">
                {/* Usuario */}
                <div
                  className="links-Header shadow rounded d-flex justify-content-center align-items-center me-3"
                  onClick={() => setOpenMenu(!openMenu)}
                  style={{ height: "40px", cursor: "pointer" }}
                >
                  <>
                    {users?.avatar ? (
                      <img
                        src={users?.avatar}
                        className="img-fluid rounded-circle me-2 mx-2"
                        alt="Foto usuario"
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-2 mx-2"
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "white",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        {users?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span
                      className="me-2"
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {users?.name}
                    </span>

                    {openMenu && (
                      <div
                        className="menu position-absolute shadow-lg rounded bg-white"
                        style={{
                          top: "50px",
                          right: "0",
                          width: "145px",
                          zIndex: 1000,
                          animation: "fadeIn 0.2s ease-in-out",
                        }}
                      >
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link
                              to={`/sellerDashboard/profile/${user.id}`}
                              className="dropdown-item py-2 px-3 text-dark text-decoration-none d-block"
                            >
                              <i className="bi bi-person me-2"></i> Perfil
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="dropdown-item py-2 px-3 w-100 text-start text-danger border-0 bg-transparent"
                            >
                              <i className="bi bi-box-arrow-right me-2"></i>
                              Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main style={{ backgroundColor: "#FFFDF6", minHeight: "100vh" }}>
        <div className="container py-5">
          <div className="row">
            {/* Sidebar */}
            <div className="col-12 col-md-3 mb-3">
              <div
                className="p-4 rounded shadow h-100"
                style={{ backgroundColor: "#F5EDE0" }}
              >
                <h3 className="fw-bold">Dashboard</h3>
                <hr />

                <Link
                  to="/sellerDashboard/products"
                  className="text-decoration-none"
                >
                  <h5
                    className="mx-2 sidebar-item"
                    style={{ color: "#000000" }}
                  >
                    Mis productos
                  </h5>
                </Link>

                <Link
                  to="/sellerDashboard/orders"
                  className="text-decoration-none"
                >
                  <h5
                    className="mx-2 mt-3 sidebar-item"
                    style={{ color: "#000000" }}
                  >
                    Pedidos
                  </h5>
                </Link>

                <div className="position-relative">
                  <h5
                    className="mx-2 mt-3 sidebar-item"
                    style={{ color: "#000000", cursor: "pointer" }}
                    onClick={() => navigate("/sellerDashboard/chats")}
                  >
                    Chats
                  </h5>
                  {hasUnread && (
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                        position: "absolute",
                        top: "8px",
                        right: "10px",
                        display: "inline-block",
                      }}
                    ></span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-9">
              <div
                className="p-4 rounded shadow"
                style={{ backgroundColor: "#F5EDE0" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="fw-bold">Mis Productos</h2>
                  <Link to={"/sellerDashboard/add"}>
                    <button
                      className="btn rounded-pill px-4 py-2"
                      style={{
                        backgroundColor: "#D28C64",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Añadir nuevo producto
                    </button>
                  </Link>
                </div>

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
                      <th className="text-center">Producto</th>
                      <th className="text-center">ID</th>
                      <th className="text-center">Stock</th>
                      <th className="text-center">Precio</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentProducts.map((product) => (
                      <tr
                        key={product.id}
                        style={{ borderBottom: "1px solid #f0e6d9" }}
                      >
                        <td className="d-flex justify-content-center align-items-center">
                          <img
                            src={product.image || "img/shopping.webp"}
                            alt=""
                            className="rounded me-3 shadow-sm"
                            style={{
                              height: "65px",
                              width: "65px",
                              objectFit: "cover",
                            }}
                          />
                          <span style={{ fontWeight: "500", color: "#5A3E2B" }}>
                            {product.name}
                          </span>
                        </td>
                        <td
                          className="text-center"
                          style={{ color: "#7A5A46" }}
                        >
                          {product.id}
                        </td>
                        <td
                          className="text-center"
                          style={{ color: "#7A5A46" }}
                        >
                          {editingId === product.id ? (
                            <input
                              type="number"
                              value={editedStock}
                              onChange={(e) =>
                                setEditedStock(parseInt(e.target.value))
                              }
                              className="form-control form-control-sm"
                              style={{ width: "70px", margin: "0 auto" }}
                            />
                          ) : (
                            product.stock
                          )}
                        </td>
                        <td
                          className="text-center"
                          style={{ color: "#7A5A46" }}
                        >
                          {editingId === product.id ? (
                            <input
                              type="number"
                              value={editedPrice}
                              onChange={(e) =>
                                setEditedPrice(parseFloat(e.target.value))
                              }
                              className="form-control form-control-sm"
                              style={{ width: "70px", margin: "0 auto" }}
                            />
                          ) : (
                            product.price + " €"
                          )}
                        </td>
                        <td className="text-center">
                          {editingId === product.id ? (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleSave(product.id)}
                              >
                                Guardar
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={handleCancel}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <i
                              className="bi bi-pencil text-success"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(product)}
                            ></i>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <ul
                    style={{
                      display: "flex",
                      listStyle: "none",
                      padding: 0,
                      gap: "8px",
                    }}
                  >
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                          padding: "6px 12px",
                          border: "1px solid #C77C57",
                          borderRadius: "6px",
                          backgroundColor: "#FAF7F2",
                          color: "#6B4F3A",
                          cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        }}
                      >
                        Anterior
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handlePageChange(i + 1)}
                          style={{
                            padding: "6px 12px",
                            border: "1px solid #C77C57",
                            borderRadius: "6px",
                            backgroundColor:
                              currentPage === i + 1 ? "#C77C57" : "#FAF7F2",
                            color:
                              currentPage === i + 1 ? "#FAF7F2" : "#6B4F3A",
                            cursor: "pointer",
                          }}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                          padding: "6px 12px",
                          border: "1px solid #C77C57",
                          borderRadius: "6px",
                          backgroundColor: "#FAF7F2",
                          color: "#6B4F3A",
                          cursor:
                            currentPage === totalPages
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        Siguiente
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SellerProducts;
