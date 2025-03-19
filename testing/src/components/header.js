"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={logoStyle}>🌾 pragatiAI</h1>
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/Features" style={linkStyle}>Features</Link>
        <Link href="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link href="/about" style={linkStyle}>About</Link>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "rgba(241, 245, 249, 0.8)",
  borderBottom: "1px solid #ddd",
  position: "fixed",
  width: "100%",
  backdropFilter: "blur(px)",
  zIndex: 50,
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
};

const navStyle = {
  display: "flex",
  gap: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "16px",
};

export default Header;
