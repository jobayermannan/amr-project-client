import { createContext,  useEffect, useState } from "react";
import { createUserWithEmailAndPassword,  getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
  import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();


   const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
   }

   const signIn = async (email, password) => {
    setLoading(true);
    try {
           return await signInWithEmailAndPassword(auth, email, password);
       } catch (error) {
           console.error("Sign in error:", error.code, error.message);
           setLoading(false);
           throw error;
       }
   }

   const googleSignIn = async () => {
    setLoading(true);
    try {
           return await signInWithPopup(auth, googleProvider);
       } catch (error) {
           console.error("Google sign in error:", error.code, error.message);
           setLoading(false);
           throw error;
       }
   }

  

   const logOut = () => {
    setLoading(true);
    return signOut(auth);
   }

   const updateUserProfile = (name, photo) => {
    return  updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
   
      });
   }
   useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log('current user', currentUser);
        setLoading(false);

    });
    return () => {
        return unsubscribe();
    }


   },[])
    const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile

     }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;