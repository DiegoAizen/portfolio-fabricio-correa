import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  UploadResult,
} from 'firebase/storage';
import { storage } from './config';

/**
 * Sube una imagen para un proyecto
 * @param file - Archivo a subir
 * @param projectId - ID del proyecto (opcional, se genera si no existe)
 * @returns URL de descarga de la imagen
 */
export async function uploadProjectImage(
  file: File,
  projectId?: string
): Promise<string> {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const path = `projects/${projectId || 'temp'}/${fileName}`;

  const storageRef = ref(storage, path);
  const uploadResult: UploadResult = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadResult.ref);

  return downloadURL;
}

/**
 * Elimina una imagen de storage usando su URL
 * @param imageUrl - URL de la imagen a eliminar
 */
export async function deleteImageByUrl(imageUrl: string): Promise<void> {
  try {
    // Extraer el path de la URL de Firebase Storage
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
    if (!imageUrl.startsWith(baseUrl)) {
      throw new Error('URL inválida de Firebase Storage');
    }

    // Crear referencia desde la URL
    const imagePath = decodeURIComponent(
      imageUrl.split('/o/')[1].split('?')[0]
    );
    const imageRef = ref(storage, imagePath);

    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error eliminando imagen:', error);
    throw error;
  }
}

/**
 * Sube múltiples imágenes
 * @param files - Array de archivos
 * @param folder - Carpeta de destino
 * @returns Array de URLs de descarga
 */
export async function uploadMultipleImages(
  files: File[],
  folder: string = 'misc'
): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const path = `${folder}/${fileName}`;

    const storageRef = ref(storage, path);
    const uploadResult = await uploadBytes(storageRef, file);
    return getDownloadURL(uploadResult.ref);
  });

  return Promise.all(uploadPromises);
}
