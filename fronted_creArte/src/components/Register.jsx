import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("COMPRADOR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const payload = { name, email, password, role };
  axios.post("http://localhost:8080/api/users/register", payload)
    .then((response) => {
      console.log("Usuario creado:", response.data);
      navigate("/login");
    })
    .catch((error) => {
      setError("Error al crear usuario: " + (error.response?.data?.message || error.message));
    })
    .finally(() => setLoading(false));
};


  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#F5EDE0" }}
    >
      <div
        className="border rounded-4 shadow p-5"
        style={{
          backgroundColor: "#FAF6F0",
          borderColor: "#D9CFC3",
          width: "400px",
        }}
      >
        
        <h2 className="text-center mb-4" style={{ color: "#2B2B2B" }}>
          Crear Cuenta
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
              style={{ color: "#2B2B2B" }}
            >
              Nombre
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="form-control"
              placeholder="Introduce el nombre"
              style={{ backgroundColor: "#FCFBF9" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: "#2B2B2B" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Introduce el email"
              style={{ backgroundColor: "#FCFBF9" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="pass"
              className="form-label"
              style={{ color: "#2B2B2B" }}
            >
              Contraseña
            </label>
            <input
              type="password"
              id="pass"
              name="pass"
              className="form-control"
              placeholder="Introduce la contraseña"
              style={{ backgroundColor: "#FCFBF9" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-block" style={{ color: "#2B2B2B" }}>
              Selecciona tu rol:
            </label>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="purchaser"
                value="COMPRADOR"
                checked={role == "COMPRADOR"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="purchaser">
                Comprador
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="seller"
                value="VENDEDOR"
                checked={role == "VENDEDOR"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="seller">
                Vendedor
              </label>
            </div>
          </div>

          <button
    type="submit"
    className="btn w-100 fw-semibold"
    style={{
      backgroundColor: "#E3B23C",
      color: "#2B2B2B",
      border: "none",
    }}
    disabled={loading}
  >
    {loading ? (
      <>
        <span className="spinner-border spinner-border-sm me-2"></span>
        Creando...
      </>
    ) : (
      "Crear cuenta"
    )}
  </button>

        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
