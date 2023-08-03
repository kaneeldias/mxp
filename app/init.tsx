const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

const serviceAccount = require("@/firebase-service-account.json");
try {
    initializeApp({
        credential: cert(serviceAccount)
    });
} catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (err instanceof Error) {
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }
}

export const db = getFirestore();
