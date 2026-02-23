import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadSlip(file: File): Promise<string> {
  const fileRef = ref(
    storage,
    `slips/${Date.now()}-${file.name}`
  );

  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}