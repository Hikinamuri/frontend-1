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

    // Проверяем токен и загружаем пользователя
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
                    throw new Error(errData.message || "Токен недействителен или истёк");
                }

                const userData = await res.json();
                setUser(userData);
            } catch (err) {
                console.error("Ошибка авторизации:", err);
                setError(err.message || "Сессия истекла. Пожалуйста, войдите заново.");
                localStorage.removeItem("jwt");
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, [token]);

    // ЛОГИН
    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${API}/wp-json/jwt-auth/v1/token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Неверный логин или пароль");
            }

            localStorage.setItem("jwt", data.token);
            setToken(data.token);
            return data;
        } catch (err) {
            setError(err.message || "Ошибка входа");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // РЕГИСТРАЦИЯ (новая функция — использует кастомный эндпоинт)
    const register = async (email, password, first_name = "", last_name = "") => {
        try {
            setLoading(true);
            setError(null);

            const regRes = await fetch(`${API}/wp-json/custom/v1/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, first_name, last_name }),
            });

            const regData = await regRes.json();

            if (!regRes.ok) {
                let message = "Ошибка регистрации";
                if (regData.code === "user_exists" || regData.message?.includes("уже существует")) {
                    message = "Пользователь с таким email уже существует";
                } else if (regData.message) {
                    message = regData.message;
                }
                throw new Error(message);
            }

            // Автоматический вход после успешной регистрации
            await login(email, password);

            return { success: true, message: "Регистрация прошла успешно" };
        } catch (err) {
            setError(err.message || "Ошибка регистрации");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ВЫХОД
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
                register,           // ← теперь доступна везде
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