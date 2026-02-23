"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import "@/styles/auth.css";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function RegisterPage() {
 const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleRegister() {
  if (!name || !email || !password) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  try {
    setLoading(true);

    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    // 🔐 บันทึกข้อมูลลง Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: serverTimestamp(),
    });

    setSuccess(true);

    setTimeout(() => {
      window.location.href = "/login";
    }, 1200);

  } catch (err) {
    alert((err as Error).message);
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="auth-page">
      <div className={`auth-card ${success ? "success" : ""}`}>
        {/* LOGO */}
        <div className="login-logo">
          <img src="/logo.png" alt="Bing Bing Day" />
        </div>

        <h1 className="brand-title">Bing Bing Day</h1>
        <p className="brand-subtitle">Sweeten your day ✨</p>

        {/* FORM */}
         <div className="auth-form">

  {/* 👤 NAME */}
  <input
    type="text"
    placeholder="Your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  {/* 📧 EMAIL */}
  <input
    type="email"
    placeholder="Email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  {/* 🔐 PASSWORD */}
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    className={`auth-btn ${loading ? "loading" : ""}`}
    onClick={handleRegister}
    disabled={loading}
  >
    {loading ? "Creating..." : "Create Account"}
  </button>
</div>

        <p className="auth-footer">
          มีบัญชีอยู่แล้ว? <a href="/login">Log In</a>
        </p>
      </div>
   
    </div>
    
  );
}