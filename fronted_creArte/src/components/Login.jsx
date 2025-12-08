import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = { email, password };
    const cookies = new Cookies();

    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 1);

    axios
      .post("http://localhost:8080/api/users/login", payload)
      .then((response) => {
        console.log("Login exitoso:", response.data);
        cookies.set("token", response.data.jwt, {
          path: "/",
          expires: expiracion,
        });

        // ---- GUARDAR USUARIO EN COOKIE ----
        const usuario = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          img: response.data.img,
          token: response.data.token,
        };

        cookies.set("user", JSON.stringify(usuario), {
          path: "/",
          expires: expiracion,
        });

        // ---- GUARDAR SESIÓN ----
        cookies.set("session", "active", {
          path: "/",
          expires: expiracion,
        });

        // ---- REDIRECCIÓN SEGÚN ROLE ----
        if (response.data.role === "ADMIN") {
          navigate("/admin");
        } else if (response.data.role === "COMPRADOR") {
          navigate("/");
        } else if (response.data.role === "VENDEDOR") {
          navigate("/sellerDashboard");
        }
      })
      .catch((error) => {
        setError(
          "Error al iniciar sesión: " +
            (error.response?.data?.message || error.message)
        );
      })
      .finally(() => setLoading(false));
  };

  const goToRegister = () => navigate("/register");

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#FFFDF6" }}
    >
      <div
        className="border rounded-4 shadow p-5"
        style={{ backgroundColor: "#F5EDE0", width: "400px" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#2B2B2B" }}>
          Iniciar sesión
        </h2>
        <form onSubmit={login}>
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
              className="form-control"
              placeholder="Introduce el email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: "#FCFBF9" }}
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
              className="form-control"
              placeholder="Introduce la contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: "#FCFBF9" }}
            />
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
                Iniciando...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        <hr className="my-4" style={{ backgroundColor: "#D9CFC3" }} />
        <p className="text-center" style={{ color: "#2B2B2B" }}>
          ¿No tienes una cuenta?
        </p>
        <button
          onClick={goToRegister}
          type="button"
          className="btn w-100 fw-semibold mt-3"
          style={{
            backgroundColor: "#C89A2F",
            color: "#FAF6F0",
            border: "none",
          }}
        >
          Crear cuenta
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
