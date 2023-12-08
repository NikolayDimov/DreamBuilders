import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
const { auth } = await import("../firebase");
import { useNavigate } from "react-router-dom";



const AuthContext = createContext();


export function AuthProvider({ children }) {
    // from firestore
    // const isAuthenticatedUser = fetch('Authenticated')
    // const [refreshToken, setRefreshToken] = useState(isAuthenticatedUser.refreshToen);
    // if (refreshToken === refreshTokenLocalStorage) {
    //     Navigate('.logout'),
    //     setItemInLocal('', '')
    // }
    // safe refresh token in local sorage 'abcd'
    // setItemInLocal('refreshToen', token)
    // 1. fetch user/data
    // 1.2 compare saved token in local storage with received token
    // 2. safe user data in state
    // 3. login....

    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));

    const nav = useNavigate();
    const [user, setUser] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn);


    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            localStorage.setItem('isUserLoggedIn', 'true')
            nav('/profile');
        } catch (error) {
            console.error('Login error:', error.message);
            console.error('Error in login function:', error);
            return Promise.reject(error);
        }
    };

    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            localStorage.setItem('isUserLoggedIn', 'true')
            nav('/profile');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            localStorage.setItem('isUserLoggedIn', 'false')
            localStorage.setItem('userData', JSON.stringify({}))
            nav('/');
        } catch (error) {
            console.error('Logout error:', error);
            nav('/login');
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                localStorage.setItem('userData', JSON.stringify(user))
            } else {
                setUser('');
                localStorage.setItem('userData', JSON.stringify({}))
            }
        });

        return unsubscribe;
    }, [nav]);

    const values = {
        user: isUserLoggedIn ? userDataFromLocalStorage : user,
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