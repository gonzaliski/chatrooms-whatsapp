export function maxImageSize(e: React.ChangeEvent<HTMLInputElement>) {
  const file: File | undefined = e.target.files?.[0];
  if (!file) return;
  const fileSizeInBytes = file.size;
  const maxSizeInBytes = 5 * 1024 * 1024; //límite de 5 MB

  if (fileSizeInBytes > maxSizeInBytes) {
    throw new Error(
      "El archivo es demasiado grande. Por favor, seleccione una imagen más pequeña."
    );
  }
  return;
}
