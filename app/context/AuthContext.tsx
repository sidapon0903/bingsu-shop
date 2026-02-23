"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type AuthUser = {
  uid: string;
  name: string;
  email: string;
};

const AuthContext = createContext<AuthUser | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      const data = snap.data();

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: data?.name || "User",
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}