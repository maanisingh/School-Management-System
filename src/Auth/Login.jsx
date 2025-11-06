import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ 8 Role-based credentials (email, password, and redirect path)
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

  // ✅ Handle form submit
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
        backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Login Card — Updated with dark theme colours */}
      <div
        className="card shadow p-4"
        style={{
          width: "400px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(30, 42, 56, 0.85)", // #1e2a38 with opacity
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="text-center mb-4">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "700",
              color: "#A5B4FC", // Matches navbar logo
              fontSize: "2.2rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Sunbuild
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#E2E8F0", fontSize: "0.95rem" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#E2E8F0",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label" style={{ color: "#E2E8F0", fontSize: "0.95rem" }}>
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#E2E8F0",
                  borderRadius: "8px",
                  padding: "8px 12px 8px 12px",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: "pointer", color: "#CBD5E1" }}
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
                style={{ accentColor: "#4F46E5" }}
              />
              <label className="form-check-label" htmlFor="remember" style={{ color: "#E2E8F0" }}>
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-decoration-none small"
              style={{ color: "#94A3B8" }}
            >
              Forgot Password?
            </a>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn w-50"
              style={{
                backgroundColor: "transparent",
                color: "#E2E8F0",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
              }}
              onClick={() => alert("Create Account clicked")}
            >
              Create Account
            </button>
            <button
              type="submit"
              className="btn w-50"
              style={{
                backgroundColor: "#4F46E5", // Primary purple
                color: "#FFFFFF",
                borderRadius: "8px",
                border: "none",
              }}
            >
              Login
            </button>
          </div>
        </form>

        {/* ✅ Test Credentials — Styled to match theme */}
        <div
          className="mt-4 p-3 rounded small"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#E2E8F0",
          }}
        >
          <strong style={{ color: "#A5B4FC" }}>Test Credentials:</strong>
          <ul className="mb-0" style={{ paddingLeft: "16px", marginTop: "4px" }}>
            {Object.entries(roleCredentials).map(([role, cred]) => (
              <li key={role} style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                <strong style={{ color: "#A5B4FC" }}>{role}:</strong> {cred.email} / {cred.password}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;