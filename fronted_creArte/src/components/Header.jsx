import React from "react";

function Header() {
  return (
    <div className="border-bottom" style={{backgroundColor:"#C77C57"}} >
      <nav className="navbar navbar-expand-lg w-75 mx-auto container">
  <div className="container-fluid px-4">
    <div className="d-flex align-items-center justify-content-between w-100">
      {/* --- IZQUIERDA: Logo + Links --- */}
      <div className="d-flex align-items-center flex-shrink-0 mx-auto">
        <a style={{color:"#FFFFFF"}} className="navbar-brand fw-bold me-2" href="/">
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
          style={{color:"#FFFFFF"}}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links visibles solo en escritorio */}
        <div className="collapse navbar-collapse d-none d-lg-block mx-auto" id="navbarLinks">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" style={{color:"#FFFFFF"}} href="/">Tienda</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{color:"#FFFFFF"}} href="/">Sobre mí</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{color:"#FFFFFF"}} href="/">Contacto</a>
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
        <div className="shadow rounded  d-flex justify-content-center align-items-center me-3" style={{width: "40px", height:" 40px"}}>
        <a href="/cuenta" className="">
          <i style={{color:"#FFFFFF"}} className="bi bi-person fs-4 "></i>
        </a>
        </div>
        <div className="shadow rounded  d-flex justify-content-center align-items-center me-3" style={{width: "40px", height:" 40px"}}>
        <a href="/carrito">
          <i  style={{color:"#FFFFFF"}}className="bi bi-cart fs-4 "></i>
        </a>
        </div>
      </div>
    </div>
  </div>

  {/* --- En móvil: los links se despliegan debajo --- */}
  <div className="collapse navbar-collapse d-lg-none" id="navbarLinks">
    <ul className="navbar-nav ms-3 mb-2">
      <li className="nav-item">
        <a style={{color:"#FFFFFF"}} className="nav-link d-lg-none" href="/">Tienda</a>
      </li>
      <li className="nav-item">
        <a style={{color:"#FFFFFF"}} className="nav-link d-lg-none" href="/">Sobre mí</a>
      </li>
      <li className="nav-item">
        <a style={{color:"#FFFFFF"}} className="nav-link d-lg-none" href="/">Contacto</a>
      </li>
    </ul>
  </div>
</nav>

    </div>
  );
}

export default Header;
