import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Footer from "./Footer";

function SellerDashboard() {
  const [openMenu, setOpenMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const session = cookies.get("session");

  const user = cookies.get("user");
  const userName = user?.name;
  const userImg = user?.img;
  // Redirigir si no hay sesión o no es vendedor
  useEffect(() => {
    if (!user || user.role !== "VENDEDOR" || !session) {
      navigate("/");
    }
  }, [user, navigate, session]);

  const handleLogout = () => {
    cookies.remove("session", { path: "/" });
    cookies.remove("user", { path: "/" });
    window.location.href = "/login";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/user/" + user.id)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, [user.id]);

  return (
    <div>
      <header className="border-bottom" style={{ backgroundColor: "#C77C57" }}>
        <nav className="navbar navbar-expand-lg w-75 mx-auto container">
          <div className="container-fluid px-4">
            {/* --- IZQUIERDA: Logo --- */}
            <div className="d-flex align-items-center justify-content-between w-100">
              <Link
                to="/sellerDashboard"
                className="navbar-brand fw-bold me-2"
                style={{ color: "#FFFFFF" }}
              >
                creArte
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
                    <img
                      src={userImg || "img/sbcf-default-avatar.webp"}
                      className="img-fluid rounded-circle h-75 me-2 mx-2"
                      alt="avatar"
                    />
                    <span
                      className="me-2"
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {userName}
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
                              to="/perfil"
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
                  to="/sellerDashboard/misProductos"
                  className="text-decoration-none"
                >
                  <h5 className="mx-2 sidebar-item">Mis productos</h5>
                </Link>

                <Link
                  to="/sellerDashboard/misPedidos"
                  className="text-decoration-none"
                >
                  <h5 className="mx-2 mt-3 sidebar-item">Pedidos</h5>
                </Link>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="col-12 col-md-9">
              <div
                className="p-4 rounded shadow"
                style={{ backgroundColor: "#F5EDE0" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="fw-bold">Mis Productos</h2>
                  <Link to={"/sellerDashboard/add"}><button
                    className="btn rounded-pill px-4 py-2"
                    style={{
                      backgroundColor: "#D28C64",
                      color: "#FFFFFF",
                      fontWeight: "500",
                    }}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Añadir nuevo producto
                  </button></Link>
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
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        style={{
                          borderBottom: "1px solid #f0e6d9",
                        }}
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
                          {product.stock}
                        </td>
                        <td
                          className="text-center"
                          style={{ color: "#7A5A46" }}
                        >
                          {product.price} €
                        </td>

                        <td className="text-center">
                          {/* Edit button con color cálido */}
                          <i className="bi bi-pencil text-success me-4"></i>

                          {/* Delete button armonizado */}
                          <i className="bi bi-trash3 text-danger"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SellerDashboard;
