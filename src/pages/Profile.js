import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    CreditCard,
    Package,
    ShoppingCart,
    LogOut,
    Crown,
    AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext.js";
import { useCart } from "@/contexts/CartContext.js";

const API = process.env.REACT_APP_API_URL || "https://egooptika.ru";

const Profile = () => {
    const { user, logout } = useAuth();
    const { cart, totalPrice } = useCart();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [errorOrders, setErrorOrders] = useState(null);
    const [debugInfo, setDebugInfo] = useState("");
    const [profileData, setProfileData] = useState(null);

    const fetchProfile = async () => {
        const res = await fetch(`${API}/wp-json/custom/v1/user-profile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
        });
        const data = await res.json();
        console.log("data", data);
        setProfileData(data);
    };

    // Получаем логин пользователя
    const getUserLogin = () => {
        if (!user) {
            console.log("User is null");
            return "";
        }

        console.log("User object:", user);

        // Пробуем получить email
        if (user.email) {
            console.log("User email:", user.email);
            return user.email.split("@")[0];
        }

        // Пробуем другие поля
        if (user.user_email) {
            console.log("User user_email:", user.user_email);
            return user.user_email.split("@")[0];
        }

        if (user.name) {
            console.log("User name:", user.name);
            return user.name;
        }

        if (user.display_name) {
            console.log("User display_name:", user.display_name);
            return user.display_name;
        }

        console.log("No user data found");
        return "";
    };

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            console.log("No user, redirecting to auth");
            navigate("/auth");
        }
    }, [user, navigate]);

    // Получаем заказы по user_login
    useEffect(() => {
        const fetchOrders = async () => {
            console.log("FetchOrders triggered, user:", user);

            if (!user) {
                setDebugInfo("Нет пользователя");
                setLoadingOrders(false);
                return;
            }

            const userLogin = getUserLogin();

            if (!userLogin) {
                setDebugInfo("Не удалось получить логин пользователя");
                setLoadingOrders(false);
                return;
            }

            setDebugInfo(`Загружаем заказы для user_login: ${userLogin}`);
            setLoadingOrders(true);
            setErrorOrders(null);

            try {
                const requestBody = {
                    user_login: userLogin,
                    email: user.email || "",
                };

                console.log("Отправляем запрос:", requestBody);

                const response = await fetch(
                    `${API}/wp-json/custom/v1/user-orders`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    },
                );

                // fetchProfile();

                const res = await fetch(
                    `${API}/wp-json/custom/v1/user-profile`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(requestBody),
                    },
                );

                const data1 = await res.json();
                console.log("data", data1);
                setProfileData(data1);

                console.log("Статус ответа:", response.status);
                setDebugInfo(`Статус ответа: ${response.status}`);

                if (!response.ok) {
                    throw new Error(`Ошибка ${response.status}`);
                }

                const data = await response.json();
                console.log("Полученные данные:", data);

                if (data.error) {
                    throw new Error(data.error);
                }

                // Фильтруем заказы - оставляем только те, где user_login совпадает
                const filteredOrders = data.filter(
                    (order) => order.user_login === userLogin,
                );

                console.log("Отфильтрованные заказы:", filteredOrders);
                setDebugInfo(
                    `Получено всего: ${data.length}, отфильтровано: ${filteredOrders.length}`,
                );
                setOrders(filteredOrders || []);
            } catch (err) {
                console.error("Ошибка загрузки заказов:", err);
                setErrorOrders(err.message || "Не удалось загрузить заказы");
                setDebugInfo(`Ошибка: ${err.message}`);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (user === undefined) {
        return <div>Загрузка...</div>;
    }

    if (!user) {
        navigate("/auth");
        return null;
    }

    const userLogin = getUserLogin();
    const userName =
        user.name || user.display_name || userLogin || "Пользователь";
    const userPhone = user.phone || user.billing_phone || "Телефон не указан";
    const userEmail = user.email || "";

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-blue-50 to-white">
            {/* Breadcrumbs */}
            <nav className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-[#c41c20] transition-colors duration-200"
                            >
                                Главная
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium">
                                Профиль
                            </span>
                        </li>
                    </ol>
                </div>
            </nav>

            {/* Header */}
            <section className="py-20 bg-gradient-to-br from-[#c41c20] via-[#e31e24] to-[#e31e24]/80 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3)_2px,transparent_0)] bg-[length:60px_60px]" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#e31e24] rounded-full opacity-10 blur-3xl" />

                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center border border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.2)]">
                            <User size={48} className="text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                            {userName}
                        </h1>
                        <p className="text-xl text-white/90">{userPhone}</p>
                        <p className="text-md text-white/80 mt-2">
                            {userEmail}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 space-y-8">
                    {/* Отладка */}
                    {process.env.NODE_ENV === "development" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                            <p className="font-bold">Отладка:</p>
                            <p>User Login: {userLogin || "не определен"}</p>
                            <p>Email: {userEmail || "не указан"}</p>
                            <p>Статус: {debugInfo}</p>
                            <p>Найдено заказов: {orders.length}</p>
                            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                                {JSON.stringify(user, null, 2)}
                            </pre>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-lg text-xs"
                            >
                                Обновить страницу
                            </button>
                        </div>
                    )}

                    {/* Карта лояльности */}
                    <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-[#c41c20] mb-6 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center">
                            <Crown size={32} className="mr-3 text-[#e31e24]" />
                            Карта лояльности
                        </h2>
                        <div className="bg-gradient-to-br from-[#c41c20] via-[#e31e24] to-[#e31e24]/90 rounded-2xl p-8 text-white text-center relative overflow-hidden">
                            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                            <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-400/20 rounded-full blur-lg" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border border-white/30">
                                    <span className="text-white font-bold text-2xl">
                                        Э
                                    </span>
                                </div>
                                <p className="text-white font-bold text-xl mb-2">
                                    Эгооптика
                                </p>
                                <p className="text-2xl font-mono tracking-wider mb-6 bg-white/10 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">
                                    {profileData?.loyaltyCardNumber ||
                                        "Загрузка..."}
                                </p>
                                <div className="flex justify-between text-lg bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <span className="text-white font-bold text-xl">
                                        {profileData?.welcomeBonusAmount || 0} ₽
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Корзина */}
                    <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center">
                            <ShoppingCart
                                size={32}
                                className="mr-3 text-[#e31e24]"
                            />
                            Корзина
                        </h2>
                        {cart.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShoppingCart
                                        size={24}
                                        className="text-gray-400"
                                    />
                                </div>
                                <p className="text-gray-600 text-lg mb-2">
                                    Корзина пуста
                                </p>
                                <Link
                                    to="/frames"
                                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
                                >
                                    <span className="relative z-10">
                                        Начать покупки
                                    </span>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.slice(0, 3).map((item) => {
                                    const imageSrc =
                                        item.images?.[0]?.src ||
                                        item.images?.[0] ||
                                        item.image ||
                                        "https://via.placeholder.com/64x64?text=Очки";
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-blue-50 rounded-xl border border-gray-200 group hover:border-[#e31e24]/30 transition-all duration-300"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={imageSrc}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-contain rounded-lg bg-white p-2 border border-gray-200"
                                                />
                                                <div>
                                                    <h4 className="font-semibold text-[#c41c20] group-hover:text-[#e31e24] transition-colors duration-300">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-gray-600">
                                                        {Number(
                                                            item.price,
                                                        ).toLocaleString(
                                                            "ru-RU",
                                                        )}{" "}
                                                        ₽
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg text-[#e31e24]">
                                                    {(
                                                        Number(item.price) *
                                                        item.quantity
                                                    ).toLocaleString(
                                                        "ru-RU",
                                                    )}{" "}
                                                    ₽
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    x{item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {cart.length > 3 && (
                                    <p className="text-center text-gray-500 text-sm mt-2">
                                        И ещё {cart.length - 3} товар(а)
                                    </p>
                                )}
                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex justify-between text-xl font-bold mb-6">
                                        <span className="text-[#c41c20]">
                                            Итого:
                                        </span>
                                        <span className="text-[#e31e24]">
                                            {totalPrice.toLocaleString("ru-RU")}{" "}
                                            ₽
                                        </span>
                                    </div>
                                    <Link
                                        to="/checkout"
                                        className="w-full inline-flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white shadow-[0_8px_32px_rgba(227,30,36,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#e31e24]/20 hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20 relative overflow-hidden"
                                    >
                                        <CreditCard
                                            size={20}
                                            className="relative z-10"
                                        />
                                        <span className="relative z-10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                                            Оформить заказ
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Заказы */}
                    <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center">
                            <Package
                                size={32}
                                className="mr-3 text-[#e31e24]"
                            />
                            Мои заказы
                        </h2>

                        {loadingOrders ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e31e24] mx-auto mb-4"></div>
                                <p className="text-gray-600">
                                    Загрузка заказов...
                                </p>
                            </div>
                        ) : errorOrders ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle
                                        size={24}
                                        className="text-red-500"
                                    />
                                </div>
                                <p className="text-gray-600 mb-2">
                                    {errorOrders}
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-[#e31e24] hover:underline text-sm"
                                >
                                    Попробовать снова
                                </button>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package
                                        size={24}
                                        className="text-gray-400"
                                    />
                                </div>
                                <p className="text-gray-600 text-lg mb-2">
                                    У вас пока нет заказов
                                </p>
                                <Link
                                    to="/frames"
                                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
                                >
                                    <span className="relative z-10">
                                        Начать покупки
                                    </span>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex justify-between items-center p-6 bg-gradient-to-r from-white to-blue-50 rounded-xl border border-gray-200 group hover:border-[#e31e24]/30 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3">
                                                <p className="font-semibold text-[#c41c20] group-hover:text-[#e31e24] transition-colors duration-300">
                                                    Заказ{" "}
                                                    {order.id_formatted ||
                                                        `#${order.id}`}
                                                </p>
                                                {process.env.NODE_ENV ===
                                                    "development" &&
                                                    order.user_login && (
                                                        <span className="text-xs text-gray-400">
                                                            (user_login:{" "}
                                                            {order.user_login})
                                                        </span>
                                                    )}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {order.date}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {order.items_count}{" "}
                                                {getItemsText(
                                                    order.items_count,
                                                )}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-[#e31e24]">
                                                {order.total_formatted ||
                                                    order.total}
                                            </p>
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                                                    order.status ===
                                                        "completed" ||
                                                    order.status_text ===
                                                        "Доставлен"
                                                        ? "bg-green-100 text-green-800 border border-green-200"
                                                        : order.status ===
                                                                "cancelled" ||
                                                            order.status_text ===
                                                                "Отменён"
                                                          ? "bg-red-100 text-red-800 border border-red-200"
                                                          : "bg-blue-100 text-blue-800 border border-blue-200"
                                                }`}
                                            >
                                                {order.status_text ||
                                                    order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Logout */}
                    <div className="text-center">
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-[0_8px_32px_rgba(220,38,38,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-red-500/20 hover:shadow-[0_12px_40px_rgba(220,38,38,0.5)] hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20 relative overflow-hidden"
                        >
                            <LogOut size={20} className="relative z-10" />
                            <span className="relative z-10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                                Выйти из аккаунта
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Вспомогательная функция для склонения слова "товар"
function getItemsText(count) {
    if (count % 10 === 1 && count % 100 !== 11) return "товар";
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
        return "товара";
    return "товаров";
}

export default Profile;
