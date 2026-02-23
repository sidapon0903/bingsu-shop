"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ✅ ADD */
import { useAuth } from "@/app/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const router = useRouter();
const { items } = useCart();
const count = items.reduce((s, i) => s + i.qty, 0);
  /* ✅ ADD */
  const user = useAuth();

  return (
    <div className="navbar">
      <div className="nav-left">
        <Image src="/logo.png" alt="logo" width={55} height={55} />
        <div>
          <div className="brand-main">Bing Bing Day</div>
          <div className="brand-sub">Shaved Ice & Dessert</div>
        </div>
      </div>

      <div className="nav-right">
        {/* ✅ SHOW USER NAME */}
        {user ? (
          <span style={{ marginRight: 12 }}>
            สวัสดี {user.name} 👋
          </span>
        ) : (
          <Link href="/login">
            <button className="icon-btn">👤</button>
          </Link>
        )}

        <button onClick={() => router.push("/cart")}>
  🛒 {count > 0 && <span>({count})</span>}
</button>

        {/* ✅ LOGOUT */}
        {user && (
          <button
            onClick={async () => {
              await signOut(auth);
              router.push("/login");
            }}
          >
            🚪
          </button>
        )}
      </div>
    </div>
  );
}