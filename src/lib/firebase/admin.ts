import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Firebase Admin SDK configuration
let app;

if (getApps().length === 0) {
  // Method 1: Using service account key JSON (recommended for production)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      app = initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID || "powerise-corporate-site",
      });
    } catch (error) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", error);
    }
  }
  
  // Method 2: Using individual environment variables (alternative)
  if (!app && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID || "powerise-corporate-site",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      projectId: process.env.FIREBASE_PROJECT_ID || "powerise-corporate-site",
    });
  }
  
  // Method 3: Default credentials (for local development with Firebase CLI)
  if (!app) {
    try {
      app = initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || "powerise-corporate-site",
      });
    } catch (error) {
      console.error("Failed to initialize Firebase Admin SDK:", error);
      throw new Error("Firebase Admin SDK initialization failed. Please check your environment variables.");
    }
  }
} else {
  app = getApps()[0];
}

// Export Firebase Admin services
export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export default app;
