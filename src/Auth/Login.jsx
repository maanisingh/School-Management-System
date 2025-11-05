import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ 8 Role-based credentials (email, password, and redirect path)
  const roleCredentials = {
  
    admin: {
      email: "admin@gmail.com",
      password: "admin123",
      redirect: "/admin-dashboard",
    },
    bookkeeper: {
      email: "bookkeeper@gmail.com",
      password: "book123",
      redirect: "/bookkeeper-dashboard",
    },
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
    projectmanager: {
      email: "pm@gmail.com",
      password: "pm123",
      redirect: "/project-manager-dashboard",
    },
    salesmanager: {
      email: "sales@gmail.com",
      password: "sales123",
      redirect: "/sales-manager-dashboard",
    },
    subcontractor: {
      email: "subcontractor@gmail.com",
      password: "sub123",
      redirect: "/subcontractor-dashboard",
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
      {/* Login Card */}
      <div
        className="card shadow p-4"
        style={{
          width: "400px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "1rem",
        }}
      >
        <div className="text-center mb-4">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "700",
              color: "#FF6B00",
              fontSize: "2.2rem",
            }}
          >
            Sunbuild
          </h2>
        </div>

        {/* <h4 className="text-center mb-4">Login</h4> */}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ cursor: "pointer" }}
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
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className="text-decoration-none small text-muted">
              Forgot Password?
            </a>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-50"
              onClick={() => alert("Create Account clicked")}
            >
              Create Account
            </button>
            <button
              type="submit"
              className="btn w-50"
              style={{ backgroundColor: "#FFC107", color: "#000" }}
            >
              Login
            </button>
          </div>
        </form>

        {/* ✅ Test Credentials */}
        <div className="mt-4 p-3 bg-light rounded small">
          <strong>Test Credentials:</strong>
          <ul className="mb-0">
            {Object.entries(roleCredentials).map(([role, cred]) => (
              <li key={role}>
                <strong>{role}:</strong> {cred.email} / {cred.password}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
