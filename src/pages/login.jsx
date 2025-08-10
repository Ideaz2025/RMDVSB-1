import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // Your Firebase initialization file
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

function AdminLogin({ onLoginSuccess, onLogout }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        onLoginSuccess && onLoginSuccess(currentUser);
      } else {
        setUser(null);
        onLogout && onLogout();
      }
    });

    return () => unsubscribe();
  }, [onLoginSuccess, onLogout]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      // onLoginSuccess called by onAuthStateChanged listener
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Incorrect email or password.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFormData({ email: "", password: "" });
      onLogout && onLogout();
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout, please try again.");
    }
  };

  if (user) {
    return (
      <div
        style={{
          maxWidth: 320,
          margin: "5rem auto",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "'Manrope', sans-serif",
          background: "#f8fbff",
          borderRadius: "10px",
          boxShadow: "0 6px 18px rgba(28, 101, 140, 0.15)",
          border: "1px solid #ccc",
        }}
      >
        <h2 style={{ color: "#1c658c", marginBottom: "1.2rem" }}>
          Welcome Back, Admin!
        </h2>
        <p>Email: <strong>{user.email}</strong></p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.2rem",
            backgroundColor: "#c53030",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "700",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#9b2c2c")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#c53030")}
          aria-label="Logout"
        >
          Logout
        </button>
        {error && (
          <div
            role="alert"
            style={{
              color: "#c53030",
              background: "#fed7d7",
              borderRadius: "6px",
              padding: "0.8rem",
              marginTop: "1rem",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  }

  // Show login form if not logged in:
  return (
    <div
      style={{
        maxWidth: "320px",
        margin: "5rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 6px 18px rgba(28, 101, 140, 0.15)",
        fontFamily: "'Manrope', sans-serif",
        background: "#f8fbff",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#1c658c", marginBottom: "1.2rem" }}>
        Admin Login
      </h2>
      {error && (
        <div
          role="alert"
          style={{
            color: "#c53030",
            background: "#fed7d7",
            borderRadius: "6px",
            padding: "0.8rem",
            marginBottom: "1rem",
            fontWeight: "600",
          }}
        >
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          style={{
            display: "block",
            marginBottom: ".25rem",
            color: "#163147",
            fontWeight: 600,
          }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "0.6rem 0.9rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1.4px solid #c2d1f0",
            fontSize: "1rem",
            outlineColor: "#226ab7",
          }}
          autoComplete="email"
          required
        />

        <label
          htmlFor="password"
          style={{
            display: "block",
            marginBottom: ".25rem",
            color: "#163147",
            fontWeight: 600,
          }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "0.6rem 0.9rem",
            marginBottom: "1.4rem",
            borderRadius: "6px",
            border: "1.4px solid #c2d1f0",
            fontSize: "1rem",
            outlineColor: "#226ab7",
          }}
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            backgroundColor: "#1c658c",
            color: "#fff",
            fontWeight: "700",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#398ab9")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1c658c")}
          aria-label="Login as Admin"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
