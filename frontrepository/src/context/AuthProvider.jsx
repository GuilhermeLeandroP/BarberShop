import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    // Token expirou
                    localStorage.removeItem('token');
                    setToken(null);
                    navigate('/');
                }
            } catch (error) {
                // Erro ao decodificar o token
                localStorage.removeItem('token');
                setToken(null);
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
