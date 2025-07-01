"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";

const sections = [
  {
    label: "Langue",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>
    ),
  },
  {
    label: "IA",
    icon: (
      <svg width="28" height="28" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#6366f1"/><ellipse cx="24" cy="30" rx="3" ry="4" fill="#fff"/><ellipse cx="40" cy="30" rx="3" ry="4" fill="#fff"/><ellipse cx="24" cy="30" rx="1.2" ry="2" fill="#6366f1"/><ellipse cx="40" cy="30" rx="1.2" ry="2" fill="#6366f1"/></svg>
    ),
  },
  {
    label: "Thème",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    ),
  },
  {
    label: "Info",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    ),
  },
  {
    label: "Contact",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
    ),
  },
  {
    label: "Autres Produits",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
  },
];

export default function ParametrePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 800;
  const router = useRouter();
  const navLinks = [
    { label: "Accueil", onClick: () => router.push("/") },
    { label: "Brouillons", onClick: () => router.push("/drafts") },
    { label: "Projets", onClick: () => router.push("/projet") },
    { label: "Paramètres", onClick: () => router.push("/parametre") },
  ];
  const userLinks = [
    { label: "Log in", onClick: () => alert("Connexion à venir") },
    { label: "Sign up", onClick: () => alert("Inscription à venir") },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <NavBar
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navLinks={navLinks}
        userLinks={userLinks}
      />
      <main style={{ maxWidth: 480, margin: "90px auto 0 auto", padding: "0 16px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#3730a3", marginBottom: 32 }}>Paramètres</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {sections.map((section) => (
            <section key={section.label} style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px #e0e7ef",
              padding: "18px 20px"
            }}>
              {section.icon}
              <span style={{ fontSize: 20, fontWeight: 600, color: "#3730a3" }}>{section.label}</span>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
} 