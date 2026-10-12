import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseAuth(): Auth {
  if (!firebaseConfig.apiKey) {
    throw new Error(
      "Firebase API key is missing. Check NEXT_PUBLIC_FIREBASE_API_KEY.",
    );
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  return getAuth(app);
}

export { getFirebaseAuth };
