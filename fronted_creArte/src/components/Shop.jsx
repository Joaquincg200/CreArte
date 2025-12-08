import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import VoiceflowWidget from "./VoiceflowWidget";

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortOrder, setSortOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  // ------------------- OBTENER PRODUCTOS -------------------
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  // ------------------- FILTROS -------------------
  const filteredProducts = products.filter((product) => {
    const inCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
    return inCategory && inPriceRange;
  });

  // ------------------- ORDENACIÓN -------------------
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  // ------------------- PAGINACIÓN -------------------
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // ------------------- FUNCIONES AUXILIARES -------------------
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ backgroundColor: "#FFFDF6" }}>
      <header style={{ position: "sticky", top: "0", zIndex: "1000" }}>
        <Header />
      </header>

      <div className="container py-4" style={{ maxWidth: "1200px" }}>
        <div className="row">
          {/* FILTROS */}
          <div className="col-md-3 mb-4 " style={{ top: "80px" }}>
            <div className="p-3 rounded shadow" style={{ backgroundColor: "#A3B18A", border: "2px solid #C77C57", color: "#FAF7F2" }}>
              <h4 className="fw-bold mb-3">Filtros</h4>

              <h5 className="fw-semibold mt-3">Categoría</h5>
              {["ROPA","BISUTERIA","DECORACION","CERAMICA","MUEBLES","OTROS"].map((cat) => (
                <div className="form-check mb-1" key={cat}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    style={{ accentColor: "#C77C57" }}
                  />
                  <label htmlFor={cat} className="form-check-label" style={{ color: "#FAF7F2" }}>
                    {cat}
                  </label>
                </div>
              ))}

              <h5 className="fw-semibold mt-4">Precio</h5>
              <input
                type="range"
                min="0"
                max="500"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="form-range mb-2"
                style={{ accentColor: "#C77C57" }}
              />
              <input
                type="range"
                min="0"
                max="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="form-range"
                style={{ accentColor: "#C77C57" }}
              />
              <div className="d-flex justify-content-between mt-2 fw-semibold">
                <span>Mín: {minPrice} €</span>
                <span>Máx: {maxPrice} €</span>
              </div>
            </div>
          </div>

          {/* PRODUCTOS */}
          <div className="col-md-9">
            {/* Ordenación */}
            <div className="d-flex justify-content-end mb-3">
              <select
                className="form-select w-auto"
                value={sortOrder}
                onChange={handleSortChange}
                style={{ border: "2px solid #C77C57", color: "#6B4F3A", backgroundColor: "#FAF7F2" }}
              >
                <option value="recent">Más recientes</option>
                <option value="lowToHigh">Menor precio</option>
                <option value="highToLow">Mayor precio</option>
              </select>
            </div>

            {/* GRID de productos */}
            <div className="row g-3">
              {paginatedProducts.map((product) => (
                <div className="col-lg-4 col-md-6" key={product.id}>
                  <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <div className="card h-100 shadow-sm" style={{ border: "2px solid #C77C57", borderRadius: "12px", backgroundColor: "#FAF7F2" }}>
                      <img
                        src={product.image || "img/shopping.webp"}
                        className="card-img-top img-fluid rounded-top"
                        alt={product.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title" style={{ color: "#6B4F3A" }}>{product.name}</h5>
                        <p className="card-text fw-bold mt-auto" style={{ color: "#C77C57" }}>{product.price} €</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Paginación */}
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
                        color: currentPage === i + 1 ? "#FAF7F2" : "#6B4F3A",
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
                        currentPage === totalPages ? "not-allowed" : "pointer",
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
      <VoiceflowWidget />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Shop;
