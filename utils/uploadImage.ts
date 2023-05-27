import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

export async function uploadImage(img: Blob) {
  const storageRef = ref(storage, uuid());
  const snapshot = await uploadBytesResumable(storageRef, img);
  try {
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    // Manejo del error
    console.error("Error al obtener la URL de descarga:", error);
    return null;
  }
}
