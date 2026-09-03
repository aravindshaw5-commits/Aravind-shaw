import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  onSnapshot,
  deleteDoc
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with configured databaseId
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export interface FirestoreMediaDoc {
  key: string;
  url: string;
  storagePath?: string;
  mediaType: 'image' | 'video' | 'meta';
  title?: string;
  description?: string;
  projectId?: string;
  slotNumber?: string;
  updatedAt: string;
  extra?: any;
}

/**
 * Upload an image or media file to Firebase Storage and persist the URL in Firestore.
 * Automatically deletes the old storage asset if replacing an existing image key.
 */
export async function uploadPortfolioImage(
  file: File | Blob,
  key: string,
  meta?: {
    title?: string;
    description?: string;
    projectId?: string;
    slotNumber?: string;
    mediaType?: 'image' | 'video';
    onProgress?: (percent: number) => void;
  }
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // 1. Check if an existing document with this key exists to clean up previous storage file
    const docRef = doc(db, 'portfolio_media', key);
    let oldStoragePath: string | undefined;

    try {
      const existingSnap = await getDoc(docRef);
      if (existingSnap.exists()) {
        const data = existingSnap.data() as FirestoreMediaDoc;
        oldStoragePath = data.storagePath;
      }
    } catch (err) {
      console.warn('Could not check existing doc before upload:', err);
    }

    // 2. Generate a clean, unique storage path
    const extension = file instanceof File && file.name.includes('.')
      ? file.name.split('.').pop()
      : (file.type.includes('png') ? 'png' : file.type.includes('webp') ? 'webp' : 'jpg');
    
    const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${sanitizedKey}_${Date.now()}.${extension}`;
    const storagePath = `portfolio-images/${filename}`;
    const storageReference = ref(storage, storagePath);

    // 3. Upload file with progress tracking
    const uploadTask = uploadBytesResumable(storageReference, file, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        portfolioKey: key,
        uploadedAt: new Date().toISOString()
      }
    });

    const downloadUrl = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0 && meta?.onProgress) {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            meta.onProgress(progress);
          }
        },
        (error) => {
          console.error('Firebase Storage upload error:', error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (e) {
            reject(e);
          }
        }
      );
    });

    // 4. Save metadata to Firestore
    const mediaDocData: FirestoreMediaDoc = {
      key,
      url: downloadUrl,
      storagePath,
      mediaType: meta?.mediaType || (file.type.startsWith('video/') ? 'video' : 'image'),
      title: meta?.title || '',
      description: meta?.description || '',
      projectId: meta?.projectId || '',
      slotNumber: meta?.slotNumber || '',
      updatedAt: new Date().toISOString()
    };

    await setDoc(docRef, mediaDocData, { merge: true });

    // 5. Clean up old image from Firebase Storage if replacing
    if (oldStoragePath && oldStoragePath !== storagePath) {
      try {
        const oldFileRef = ref(storage, oldStoragePath);
        await deleteObject(oldFileRef);
        console.log('Successfully removed replaced storage asset:', oldStoragePath);
      } catch (cleanupErr) {
        console.warn('Old storage object cleanup notice:', cleanupErr);
      }
    }

    return { success: true, url: downloadUrl };
  } catch (err: any) {
    console.error('Failed to upload portfolio image to Firebase:', err);
    return { success: false, error: err.message || 'Firebase upload failed' };
  }
}

/**
 * Save direct URL (or meta) to Firestore
 */
export async function savePortfolioMediaUrl(
  key: string,
  url: string,
  meta?: {
    title?: string;
    description?: string;
    projectId?: string;
    slotNumber?: string;
    mediaType?: 'image' | 'video' | 'meta';
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, 'portfolio_media', key);
    const mediaDocData: FirestoreMediaDoc = {
      key,
      url,
      mediaType: meta?.mediaType || 'image',
      title: meta?.title || '',
      description: meta?.description || '',
      projectId: meta?.projectId || '',
      slotNumber: meta?.slotNumber || '',
      updatedAt: new Date().toISOString()
    };

    await setDoc(docRef, mediaDocData, { merge: true });
    return { success: true };
  } catch (err: any) {
    console.error('Failed to save media URL in Firestore:', err);
    return { success: false, error: err.message || 'Failed to save in Firestore' };
  }
}

/**
 * Remove portfolio media item from Firestore and Firebase Storage
 */
export async function removePortfolioImage(key: string): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, 'portfolio_media', key);
    const snap = await getDoc(docRef);
    
    if (snap.exists()) {
      const data = snap.data() as FirestoreMediaDoc;
      if (data.storagePath) {
        try {
          const fileRef = ref(storage, data.storagePath);
          await deleteObject(fileRef);
        } catch (e) {
          console.warn('Could not delete storage file during removal:', e);
        }
      }
      await deleteDoc(docRef);
    }
    return { success: true };
  } catch (err: any) {
    console.error('Failed to remove portfolio image from Firebase:', err);
    return { success: false, error: err.message || 'Failed to delete from Firebase' };
  }
}

/**
 * Real-time listener for all portfolio media stored in Firestore
 */
export function listenToPortfolioMedia(
  onUpdate: (mediaMap: Record<string, string>, metadataMap: Record<string, FirestoreMediaDoc>) => void,
  onError?: (err: Error) => void
) {
  const mediaCol = collection(db, 'portfolio_media');
  return onSnapshot(
    mediaCol,
    (snapshot) => {
      const mediaMap: Record<string, string> = {};
      const metadataMap: Record<string, FirestoreMediaDoc> = {};

      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data() as FirestoreMediaDoc;
        if (data && data.key) {
          metadataMap[data.key] = data;
          if (data.url) {
            mediaMap[data.key] = data.url;
          }
        }
      });

      onUpdate(mediaMap, metadataMap);
    },
    (error) => {
      console.error('Error listening to portfolio media in Firestore:', error);
      if (onError) onError(error);
    }
  );
}

/**
 * Fetch one-time snapshot of all media from Firestore
 */
export async function fetchAllPortfolioMedia(): Promise<{
  mediaMap: Record<string, string>;
  metadataMap: Record<string, FirestoreMediaDoc>;
}> {
  try {
    const mediaCol = collection(db, 'portfolio_media');
    const snapshot = await getDocs(mediaCol);
    const mediaMap: Record<string, string> = {};
    const metadataMap: Record<string, FirestoreMediaDoc> = {};

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data() as FirestoreMediaDoc;
      if (data && data.key) {
        metadataMap[data.key] = data;
        if (data.url) {
          mediaMap[data.key] = data.url;
        }
      }
    });

    return { mediaMap, metadataMap };
  } catch (err) {
    console.error('Failed to fetch portfolio media from Firestore:', err);
    return { mediaMap: {}, metadataMap: {} };
  }
}
