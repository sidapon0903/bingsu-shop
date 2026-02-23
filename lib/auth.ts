import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  await signOut(auth);
}