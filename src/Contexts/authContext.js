import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/initialiseApp';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const allUsers = await getDocs(collection(db, 'Users'));
        allUsers.forEach((doc) => {
          if (doc.data().uid === user.uid) setCurrentUser(doc.data());
        });
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
    isAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
