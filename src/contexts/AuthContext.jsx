/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";



const AuthContext = createContext();


export function AuthProvider({ children }) {
    const nav = useNavigate();
    const [user, setUser] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            nav('/myProjects');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            nav('/myProjects');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            nav('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser('');
            }
        });

        return unsubscribe;
    }, [nav]);

    const values = {
        user,
        login,
        register,
        logout,
        isLoggedIn
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}



export function useAuth() {
    return useContext(AuthContext);
}