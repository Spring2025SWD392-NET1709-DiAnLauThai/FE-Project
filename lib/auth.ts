import {
    type User,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged as _onAuthStateChanged,
    getAuth
} from 'firebase/auth';

const firebaseAuth = getAuth();

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
    return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(firebaseAuth, provider);

        if (!result || !result.user) {
            throw new Error('Google sign-in failed');
        }
        return result.user.uid;
    } catch (error) {
        console.error('Error signing in with Google:', error);
        return null;
    }
}

export async function signOutWithGoogle() {
    try {
        await signOut(firebaseAuth);
    } catch (error) {
        console.error('Error signing out with Google:', error);
    }
}
