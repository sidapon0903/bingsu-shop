"use client";

import "@/styles/login.css";
import Image from "next/image";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Login สำเร็จ → กลับหน้าแรก
      window.location.href = "/";
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="phone-wrap">
      <div className="phone-frame">
        {/* LOGO */}
        <div className="logo-circle">
          <Image src="/logo.png" alt="Bing Bing Day" width={44} height={44} />
        </div>

        {/* BRAND */}
        <h1 className="brand-title">Bing Bing Day</h1>
        <p className="brand-sub">Sweeten your day ✨</p>

        {/* CARD */}
        <div className="login-card">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="forgot">Forgot Password?</div>

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="or">OR CONTINUE WITH</div>

          <div className="social">
            <button className="social-btn">🍎</button>
            <button className="social-btn">🟢</button>
            <button className="social-btn">📘</button>
          </div>
        </div>

        <p className="register">
          New to the shop? <a href="/register">Create an account</a>
        </p>
      </div>
    </div>
  );
}