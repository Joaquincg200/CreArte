import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

function Header() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [users, setUsers] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const cookies = new Cookies();

  const session = cookies.get("session");
  const userId = user?.id;

  useEffect(() => {
    const storedUser = cookies.get("user");
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/users/user/${user?.id}`)
      .then((response) => {
        // Podrías actualizar la cookie si quieres la imagen más reciente
        const updatedUser = { ...user, img: response.data.avatar || user.img };
        cookies.set("user", updatedUser, { path: "/" });
        setUsers(response.data);
      })
      .catch((err) => console.error(err));
  }, [user?.id]);

  const wrapperRef = useRef(null);

  if (user?.role === "VENDEDOR") {
    navigate("/sellerDashboard");
  }

  const handleLogout = () => {
    cookies.remove("session", { path: "/" });
    cookies.remove("user", { path: "/" });
    window.location.href = "/";
  };

  // Maneja la búsqueda dinámica
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/products/search/${encodeURIComponent(value)}`
      );
      setSuggestions(res.data.slice(0, 5)); // máximo 5 sugerencias
      setShowDropdown(true);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  // Redirige al producto al hacer click
  const handleSelect = (product) => {
    localStorage.setItem("lastSearchProductId", product.id);
    setSearchTerm("");
    setSuggestions([]);
    setShowDropdown(false);
    navigate(`/product/${product.id}`);
  };

  // Cierra dropdown si clicas fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if(user.role === "VENDEDOR") {
    navigate("/sellerDashboard");
  }

  return (
    <div className="border-bottom" style={{ backgroundColor: "#C77C57" }}>
      <nav className="navbar navbar-expand-lg w-75 mx-auto container">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between w-100">
            {/* --- IZQUIERDA: Logo + Links --- */}
            <div className="d-flex align-items-center flex-shrink-0 mx-auto">
              <Link
                style={{ color: "#FFFFFF" }}
                className="navbar-brand fw-bold me-2"
                to="/"
              >
                <img
                  src="/img/unnamed-removebg-preview.png"
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
              </Link>

              {/* Links escritorio */}
              <div className="collapse navbar-collapse d-none d-lg-block mx-auto">
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#FFFFFF" }}
                      to="/shop"
                    >
                      Tienda
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#FFFFFF" }}
                      to="/aboutUs"
                    >
                      Sobre nosotros
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#FFFFFF" }}
                      to="/contact"
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Botón hamburguesa solo en móvil */}
            <button
              className="navbar-toggler d-lg-none border-0"
              type="button"
              onClick={() => setOpenHamburger(!openHamburger)}
            >
              <span style={{ color: "#FFFFFF" }}>&#9776;</span>
            </button>

            {/* --- CENTRO: Buscador dinámico --- */}
            <div
              className="flex-grow-1 d-flex justify-content-start me-5 mx-5"
              ref={wrapperRef}
            >
              <div className="w-100 position-relative">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={handleChange}
                  onFocus={() => searchTerm && setShowDropdown(true)}
                />
                {showDropdown && suggestions.length > 0 && (
                  <div
                    className="position-absolute bg-white shadow rounded w-100"
                    style={{
                      zIndex: 1000,
                      maxHeight: "250px",
                      overflowY: "auto",
                    }}
                  >
                    {suggestions.map((product) => (
                      <div
                        key={product.id}
                        className="d-flex align-items-center p-2 border-bottom"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSelect(product)}
                      >
                        <img
                          src={product.image || "img/shopping.webp"}
                          alt={product.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                        <span className="ms-2 flex-grow-1">{product.name}</span>
                        <span className="fw-bold" style={{ color: "#C77C57" }}>
                          {product.price} €
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* --- DERECHA: Cuenta + Carrito --- */}
            <div className="d-flex align-items-center flex-shrink-0 mx-auto">
              <div
                className="links-Header shadow rounded d-flex justify-content-center align-items-center me-3"
                onClick={() => setOpenMenu(!openMenu)}
                style={{ height: "40px", cursor: "pointer" }}
              >
                {session ? (
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
                          right: "110px",
                          width: "145px",
                          zIndex: 1000,
                        }}
                      >
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link
                              to={`/profile/${user.id}`}
                              className="dropdown-item py-2 px-3 text-dark text-decoration-none d-block"
                            >
                              Perfil
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="dropdown-item py-2 px-3 w-100 text-start text-danger border-0 bg-transparent"
                            >
                              Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="text-decoration-none">
                    <i
                      className="bi bi-person fs-4 me-2 mx-2"
                      style={{ color: "#FFFFFF" }}
                    ></i>
                  </Link>
                )}
              </div>

              <div
                className="links-Header shadow rounded d-flex justify-content-center align-items-center me-3"
                style={{ width: "40px", height: "40px" }}
              >
                <Link to="/cart">
                  <i
                    className="bi bi-cart fs-4"
                    style={{ color: "#FFFFFF" }}
                  ></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {openHamburger && (
          <div
            className="d-lg-none position-fixed start-0 end-0 px-3 pt-5"
            style={{
              backgroundColor: "#C77C57",
              zIndex: 2000,
              top: "56px",
            }}
          >
            <Link
              to="/shop"
              className="d-block py-2 text-white text-decoration-none fs-5"
              onClick={() => setOpenHamburger(false)}
            >
              Tienda
            </Link>

            <Link
              to="/aboutUs"
              className="d-block py-2 text-white text-decoration-none fs-5"
              onClick={() => setOpenHamburger(false)}
            >
              Sobre nosotros
            </Link>

            <Link
              to="/contact"
              className="d-block py-2 text-white text-decoration-none fs-5"
              onClick={() => setOpenHamburger(false)}
            >
              Contacto
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
