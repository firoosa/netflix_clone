import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bg1 from "../assets/bg1.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.error || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.65)), url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {/* Netflix Logo Top-Left */}
      <img
        className="register-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
        width={150}
        style={{
          margin: "20px 160px",
        }}
      />

      <div
        className="login-box"
        style={{
          maxWidth: "350px",
          margin: "0 auto",
          marginTop: "40px",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          padding: "60px 40px",
          borderRadius: "4px",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Sign In</h2>
        
        {error && (
          <div
            style={{
              backgroundColor: "#e87c03",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#999" : "red",
              border: "none",
              color: "white",
              fontWeight: "bold",
              marginTop: "10px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "10px", textAlign: "center" }}>OR</div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <a href="#">Forgot password?</a>
        </div>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          New to Netflix? <a href="/register">Sign up now.</a>
        </p>

        <div style={{ fontSize: "12px", marginTop: "20px", color: "#999" }}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#">Learn more.</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

