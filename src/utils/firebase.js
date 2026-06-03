import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Standard JS frozen object replaces TypeScript enum
export const OperationType = Object.freeze({
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  LIST: "list",
  GET: "get",
  WRITE: "write",
});

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error Detailed Object: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Check initial Firestore connection on load
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration or internet connection.");
    }
  }
}
testConnection();

/**
 * Fetch a user's progress of codes, notes, and topics from firestore.
 */
export async function getUserProgressFromFirestore(userId) {
  const docRef = doc(db, "users", userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${userId}`);
    return null;
  }
}

/**
 * Save user codes, progress details, completed topics and notes to Firestore.
 */
export async function saveUserProgressToFirestore(userId, data) {
  const docRef = doc(db, "users", userId);
  try {
    await setDoc(docRef, {
      uid: userId,
      codes: data.codes || {},
      progress: data.progress || {},
      completedTopics: data.completedTopics || {},
      notes: data.notes || {},
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${userId}`);
  }
}

/**
 * Trigger secure google login workflow.
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google authentication failed", error);
    throw error;
  }
}

/**
 * Log out user.
 */
export async function logoutUser() {
  await signOut(auth);
}
