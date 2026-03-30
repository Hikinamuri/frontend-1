import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, CreditCard, Check, Mail, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const API = process.env.REACT_APP_API_URL || "https://egooptika.ru";

const Auth = () => {
    const {
        login,
        register,
        loading: authLoading,
        error: authError,
    } = useAuth();
    const navigate = useNavigate();
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showDiscountModal, setShowDiscountModal] = useState(false);

    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [localError, setLocalError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showLoyaltyCard, setShowLoyaltyCard] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        try {
            if (isLogin) {
                // ВХОД
                await login(form.email, form.password);
                setSuccess(true);
                setTimeout(() => navigate("/profile"), 1500);
            } else {
                // РЕГИСТРАЦИЯ
                await register(form.email, form.password);
                setSuccess(true);
                setShowLoyaltyCard(true);
                setShowDiscountModal(true);

                setTimeout(() => navigate("/profile"), 3000);
            }
        } catch (err) {
            setLocalError(err.message);
        }
    };

    const resetForm = () => {
        setForm({ email: "", password: "" });
        setShowLoyaltyCard(false);
        setSuccess(false);
        setLocalError(null);
    };

    const displayError = localError || authError;

    // Убираем все HTML-теги (<strong>, <a> и т.д.) — выводим только чистый текст
    const cleanError = displayError
        ? displayError.replace(/<[^>]*>/g, "").trim()
        : null;

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-[#c41c20] via-[#e31e24] to-[#e31e24]/80 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3)_2px,transparent_0)] bg-[length:60px_60px]"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.3)]">
                        {isLogin ? "Вход" : "Регистрация"}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
                        {isLogin
                            ? "Войдите в свой аккаунт"
                            : "Создайте аккаунт и получите карту лояльности"}
                    </p>
                </div>
            </section>

            {/* Auth Form */}
            <section className="section-padding bg-gradient-to-br from-white to-blue-50 py-20">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/80 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>

                        {/* Переключатель Вход / Регистрация */}
                        <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-2 mb-8 shadow-inner border border-gray-300/50">
                            <button
                                onClick={() => {
                                    setIsLogin(true);
                                    resetForm();
                                }}
                                className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group ${
                                    isLogin
                                        ? "bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white shadow-lg transform scale-105"
                                        : "text-gray-600 hover:text-gray-800 bg-transparent"
                                }`}
                            >
                                {isLogin && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-xl"></div>
                                )}
                                <span className="relative z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                                    Войти
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    setIsLogin(false);
                                    resetForm();
                                }}
                                className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group ${
                                    !isLogin
                                        ? "bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white shadow-lg transform scale-105"
                                        : "text-gray-600 hover:text-gray-800 bg-transparent"
                                }`}
                            >
                                {!isLogin && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-xl"></div>
                                )}
                                <span className="relative z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                                    Регистрация
                                </span>
                            </button>
                        </div>

                        {success ? (
                            <div className="text-center py-12 animate-scale-in">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#e31e24] to-[#c41c20] rounded-full text-white mb-6 shadow-2xl">
                                    <Check size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#c41c20] mb-4">
                                    {isLogin
                                        ? "Вы вошли!"
                                        : "Регистрация завершена!"}
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    {isLogin
                                        ? "Перенаправляем в личный кабинет..."
                                        : "На почту отправлена ссылка для подтверждения. Перенаправляем в профиль..."}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {cleanError && (
                                    <div className="text-red-600 text-center font-medium bg-red-50 p-3 rounded-xl">
                                        {cleanError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <Mail
                                            size={20}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#e31e24] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 transition-all duration-300 bg-white/80"
                                            placeholder="example@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                                        Пароль *
                                    </label>
                                    <div className="relative">
                                        <Lock
                                            size={20}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#e31e24] focus:outline-none focus:ring-2 focus:ring-[#e31e24]/20 transition-all duration-300 bg-white/80"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={authLoading}
                                    className={`w-full py-4 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white font-bold rounded-xl transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] ${
                                        authLoading
                                            ? "opacity-60 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 group-hover:to-white/30 rounded-xl transition-all duration-300"></div>
                                    <span className="relative z-10">
                                        {authLoading
                                            ? "Загрузка..."
                                            : isLogin
                                              ? "Войти"
                                              : "Зарегистрироваться"}
                                    </span>
                                </button>

                                {isLogin && (
                                    <div className="text-center mt-4">
                                        <Link
                                            // to="/forgot-password"
                                            className="text-[#e31e24] hover:underline text-sm"
                                        >
                                            Забыли пароль?
                                        </Link>
                                    </div>
                                )}

                                {!isLogin && (
                                    <p className="text-sm text-gray-500 text-center mt-4">
                                        Регистрируясь, вы соглашаетесь с{" "}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPrivacyModal(true)
                                            }
                                            className="text-[#e31e24] hover:underline"
                                        >
                                            Политикой конфиденциальности
                                        </button>
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                    {showPrivacyModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-scale-in">
                                <h3 className="text-xl font-bold text-[#c41c20] mb-4">
                                    Согласие на обработку персональных данных
                                </h3>

                                <div className="text-gray-700 text-sm space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                                    <p>
                                        При регистрации покупатель дает,
                                        Индивидуальному Предпринимателю Фаизову
                                        Айдару Тафкилевичу (165502021815),
                                        согласие на получение информации об
                                        основных и специальных акциях,
                                        презентациях товара и рекламе.
                                    </p>
                                    <p>
                                        Покупатель разрешает использовать свои
                                        личные данные, указанные в анкете, для
                                        связи с ним по телефону, интернету,
                                        почте.
                                    </p>
                                    <p>
                                        Также дается согласие на сбор,
                                        обработку, в том числе
                                        автоматизированную, запись,
                                        систематизацию, накопление, хранение,
                                        уточнение (обновление, изменение),
                                        использование, уничтожение персональных
                                        данных.
                                    </p>
                                    <p>
                                        Покупатель дает согласие на обработку
                                        своих персональных данных в соответствии
                                        с требованиями Федерального закона от
                                        27.07.2006 №152-ФЗ "О персональных
                                        данных".
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowPrivacyModal(false)}
                                    className="mt-6 w-full py-3 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white font-bold rounded-xl hover:scale-[1.02] transition"
                                >
                                    Понятно
                                </button>

                                {/* Крестик */}
                                <button
                                    onClick={() => setShowPrivacyModal(false)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {showDiscountModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-scale-in">
                        <h3 className="text-xl font-bold text-[#c41c20] mb-4 text-center">
                            Ваша система скидок 🎉
                        </h3>

                        <div className="text-gray-700 text-sm space-y-3">
                            <p>
                                🎂 День рождения — <b>скидка 5%</b>
                            </p>
                            <p>
                                🎁 При регистрации — <b>+500 бонусов</b>
                            </p>
                            <p>
                                💳 От 0 до 50 000 ₽ — <b>5%</b>
                            </p>
                            <p>
                                💳 От 50 000 до 200 000 ₽ — <b>10%</b>
                            </p>
                            <p>
                                💳 Свыше 200 000 ₽ — <b>15%</b>
                            </p>
                        </div>

                        <button
                            onClick={() => setShowDiscountModal(false)}
                            className="mt-6 w-full py-3 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white font-bold rounded-xl hover:scale-[1.02] transition"
                        >
                            Отлично!
                        </button>

                        {/* Крестик */}
                        <button
                            onClick={() => setShowDiscountModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Loyalty Card */}
            {showLoyaltyCard && (
                <section className="section-padding bg-gradient-to-br from-blue-50 to-white">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-[#c41c20] mb-8 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
                            Ваша карта лояльности
                        </h2>
                        <div className="relative animate-scale-in">
                            <div
                                className="bg-gradient-to-br from-[#c41c20] via-[#e31e24] to-[#e31e24]/90 rounded-2xl p-8 text-white relative overflow-hidden"
                                style={{
                                    boxShadow:
                                        "0 15px 35px rgba(227,30,36,0.4), inset 0 2px 8px rgba(255,255,255,0.2)",
                                }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                                <div className="flex justify-between items-start mb-12 relative z-10">
                                    <div>
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 shadow-lg">
                                            <span className="text-[#e31e24] font-bold text-xl">
                                                Э
                                            </span>
                                        </div>
                                        <p className="text-white font-bold text-lg">
                                            Эгооптика
                                        </p>
                                    </div>
                                    <CreditCard
                                        size={36}
                                        className="text-white/90"
                                    />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <p className="text-sm text-white/80 mb-1">
                                            Владелец
                                        </p>
                                        <p className="text-lg font-bold">
                                            {form.email.split("@")[0] ||
                                                "Пользователь"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/80 mb-1">
                                            Номер карты
                                        </p>
                                        <p className="text-xl font-mono tracking-wider">
                                            **** **** ****{" "}
                                            {Math.floor(Math.random() * 10000)
                                                .toString()
                                                .padStart(4, "0")}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm text-white/80 mb-1">
                                                Бонусы
                                            </p>
                                            <p className="text-2xl font-bold text-white">
                                                0 ₽
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-white/80">
                                                Скидка
                                            </p>
                                            <p className="text-xl font-bold text-white">
                                                5%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Показывайте эту карту при покупке и
                                    получаете бонусы!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Преимущества регистрации */}
            <section className="section-padding bg-gradient-to-br from-white to-blue-50 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#c41c20] mb-12 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
                        Преимущества регистрации
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#e31e24] to-[#c41c20] rounded-full text-white mb-4 shadow-lg">
                                <CreditCard size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-[#c41c20] mb-3">
                                Карта лояльности
                            </h3>
                            <p className="text-gray-600">
                                Накапливайте бонусы и получайте скидки
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full text-white mb-4 shadow-lg">
                                <User size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-[#c41c20] mb-3">
                                Личный кабинет
                            </h3>
                            <p className="text-gray-600">
                                Отслеживайте заказы и историю покупок
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#e31e24] to-[#c41c20] rounded-full text-white mb-4 shadow-lg">
                                <Check size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-[#c41c20] mb-3">
                                Спецпредложения
                            </h3>
                            <p className="text-gray-600">
                                Первыми узнавайте о скидках и акциях
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Auth;
