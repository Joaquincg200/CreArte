import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  
  const cookies = new Cookies();
  
  const session = cookies.get("session");
  // Obtener datos del usuario desde la cookie
  const userCookie = cookies.get("user");
  // Asegurarse de que userCookie no sea undefined antes de usarlo
  
  const user = userCookie;
  const userName = user?.name;
  const userImg = user?.img;
  

  

  const handleLogout = () => {
    cookies.remove("session", { path: "/" });
    window.location.href = "/login";
  };

  

  return (
    <div className="border-bottom" style={{ backgroundColor: "#C77C57" }}>
      <nav className="navbar navbar-expand-lg w-75 mx-auto container">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between w-100">
            {/* --- IZQUIERDA: Logo + Links --- */}
            <div className="d-flex align-items-center flex-shrink-0 mx-auto">
              <a
                style={{ color: "#FFFFFF" }}
                className="navbar-brand fw-bold me-2"
                href="/"
              >
                creArte
              </a>

              {/* Hamburguesa (solo en móvil) */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarLinks"
                aria-controls="navbarLinks"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ color: "#FFFFFF" }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Links visibles solo en escritorio */}
              <div
                className="collapse navbar-collapse d-none d-lg-block mx-auto"
                id="navbarLinks"
              >
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{ color: "#FFFFFF" }}
                      href="/shop"
                    >
                      Tienda
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{ color: "#FFFFFF" }}
                      href="/"
                    >
                      Sobre mí
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{ color: "#FFFFFF" }}
                      href="/"
                    >
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* --- CENTRO: Buscador --- */}
            <div className="flex-grow-1 d-flex justify-content-start me-5 mx-5">
              <form className="w-100" role="search">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                  />
                  <button className="btn btn-outline-light" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>

            {/* --- DERECHA: Cuenta + Carrito --- */}
            <div className="d-flex align-items-center flex-shrink-0 mx-auto">
              <div
                className="links-Header shadow rounded d-flex justify-content-center align-items-center me-3"
                onClick={() => setOpenMenu(!openMenu)}
                style={{
                  height: "40px",
                  cursor: "pointer",
                }}
              >
                {session ? (
                  <>
                  <img src={userImg || "img/sbcf-default-avatar.webp"} className="img-fluid rounded-circle h-75 me-2 mx-2"/>
                    {" "}
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
                    {/* --- MENÚ DESPLEGABLE --- */}
                    {openMenu && (
                      <div
                        className="menu position-absolute shadow-lg rounded bg-white"
                        style={{
                          top: "50px",
                          right: "110px",
                          width: "145px",
                          zIndex: 1000,
                          animation: "fadeIn 0.2s ease-in-out",
                        }}
                      >
                        <ul className="list-unstyled mb-0">
                          <li>
                            <a
                              href="/perfil"
                              className="dropdown-item py-2 px-3 text-dark text-decoration-none d-block"
                            >
                              <i className="bi bi-person me-2"></i> Perfil
                            </a>
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
                ) : (
                  // Usuario no logueado
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
                <a href="/cart">
                  <i
                    style={{ color: "#FFFFFF" }}
                    className="bi bi-cart fs-4"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- En móvil: los links se despliegan debajo --- */}
        <div className="collapse navbar-collapse d-lg-none" id="navbarLinks">
          <ul className="navbar-nav ms-3 mb-2">
            <li className="nav-item">
              <a
                style={{ color: "#FFFFFF" }}
                className="nav-link d-lg-none"
                href="/shop"
              >
                Tienda
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{ color: "#FFFFFF" }}
                className="nav-link d-lg-none"
                href="/"
              >
                Sobre mí
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{ color: "#FFFFFF" }}
                className="nav-link d-lg-none"
                href="/"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
