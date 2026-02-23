// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL || "https://egooptika.ru";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth должен использоваться внутри AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Проверяем токен и загружаем пользователя при монтировании / изменении token
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${API}/wp-json/wp/v2/users/me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(
                        errData.message || "Токен недействителен или истёк",
                    );
                }

                const userData = await res.json();
                setUser(userData);
            } catch (err) {
                console.error("Ошибка авторизации:", err);
                setError(
                    err.message ||
                        "Сессия истекла. Пожалуйста, войдите заново.",
                );
                localStorage.removeItem("jwt");
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, [token]);

    // Функция входа — вызывается из формы
    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${API}/wp-json/jwt-auth/v1/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Неверный логин или пароль");
            }

            localStorage.setItem("jwt", data.token);
            setToken(data.token);
            // Пользователь загрузится автоматически через useEffect
        } catch (err) {
            setError(err.message || "Ошибка входа");
            throw err; // чтобы компонент мог поймать ошибку
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        setToken(null);
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token && !!user,
                loading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
