import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const roleCredentials = {
    ceo: {
      email: "ceo@gmail.com",
      password: "ceo123",
      redirect: "/ceo-dashboard",
    },
    client: {
      email: "client@gmail.com",
      password: "client123",
      redirect: "/client-dashboard",
    },
    owner: {
      email: "owner@gmail.com",
      password: "owner123",
      redirect: "/owner-dashboard",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedRole = Object.values(roleCredentials).find(
      (role) => role.email === email && role.password === password
    );

    if (matchedRole) {
      const roleKey = Object.keys(roleCredentials).find(
        (key) => roleCredentials[key].email === email
      );
      localStorage.setItem("userRole", roleKey);
      localStorage.setItem("userEmail", email);
      navigate(matchedRole.redirect);
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", // Dark slate gradient
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#1e293b",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="text-center mb-4">
          <h2
            style={{
              fontWeight: "700",
              color: "#A5B4FC",
              fontSize: "2rem",
              letterSpacing: "-0.5px",
            }}
          >
            Sunbuild
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", marginTop: "6px" }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#E2E8F0", fontSize: "0.9rem" }}>
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              style={{
                backgroundColor: "rgba(30, 42, 66, 0.7)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                color: "#E2E8F0",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "0.95rem",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label" style={{ color: "#E2E8F0", fontSize: "0.9rem" }}>
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                style={{
                  backgroundColor: "rgba(30, 42, 66, 0.7)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  color: "#E2E8F0",
                  borderRadius: "10px",
                  padding: "10px 14px 10px 14px",
                  fontSize: "0.95rem",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: "pointer", color: "#94A3B8" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
                style={{ accentColor: "#6366F1" }}
              />
              <label className="form-check-label" htmlFor="remember" style={{ color: "#CBD5E1" }}>
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-decoration-none small"
              style={{ color: "#94A3B8" }}
            >
              Forgot password?
            </a>
          </div>

          <div className="d-grid gap-2 mb-4">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#6366F1",
                color: "#FFFFFF",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "1rem",
                fontWeight: "600",
                border: "none",
              }}
            >
              Sign In
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-link p-0"
              style={{ color: "#94A3B8", fontSize: "0.9rem" }}
              onClick={() => alert("Account creation not available yet.")}
            >
              Don’t have an account? Contact Admin
            </button>
          </div>
        </form>

        {/* Test Credentials */}
        <div
          className="mt-4 p-3 rounded"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(148, 163, 184, 0.15)",
            color: "#E2E8F0",
            fontSize: "0.85rem",
          }}
        >
          <strong style={{ color: "#A5B4FC", display: "block", marginBottom: "6px" }}>
            Test Credentials:
          </strong>
          {Object.entries(roleCredentials).map(([role, cred]) => (
            <div key={role} style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94A3B8", textTransform: "capitalize" }}>{role}:</span>
              <span style={{ color: "#CBD5E1" }}>
                {cred.email} / {cred.password}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;