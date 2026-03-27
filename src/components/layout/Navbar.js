// Navbar.js — всегда белый фон, всегда читаемый текст
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ShoppingCart as CartIcon, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

import EgoLogo from 'src/assets/egooptika3.png'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();
    const { totalItems } = useCart();

    const navLinks = [
        { path: "/about", label: "О нас" },
        { path: "/delivery", label: "Доставка и возврат" },
        { path: "/contacts", label: "Контакты" },
        { path: "/how-to-order", label: "Как заказать" },
    ];

    const catalogLinks = [
        { path: "/frames", label: "Оправы" },
        { path: "/sunglasses", label: "Солнцезащитные очки" },
        { path: "/child-glasses", label: "Детские очки" },
    ];

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    // Помощник для классов ссылок
    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `text-sm font-medium transition-colors duration-300 ${
            isActive ? "text-[#e31e24]" : "text-gray-800"
        } hover:text-[#e31e24] relative group`;
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img src={EgoLogo} alt="Эгооптика" className="h-12" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={getLinkClass(link.path)}
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e31e24] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}

                        {/* Catalog Dropdown */}
                        <div className="relative group">
                            <button
                                className={`text-sm font-medium transition-colors duration-300 text-gray-800 hover:text-[#e31e24]`}
                            >
                                Каталог
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10 border border-gray-200">
                                {catalogLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="block px-6 py-3 text-sm text-gray-700 hover:bg-[#e31e24] hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className={`relative flex items-center space-x-2 text-sm font-medium transition-colors duration-300 ${
                                location.pathname === "/cart" ? "text-[#e31e24]" : "text-gray-800 hover:text-[#e31e24]"
                            }`}
                        >
                            <CartIcon size={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#e31e24] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                                    {totalItems}
                                </span>
                            )}
                            <span>Корзина</span>
                        </Link>

                        {/* Auth / Profile */}
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-sm font-medium text-gray-800 hover:text-[#e31e24] transition-colors duration-300">
                                    <User size={18} />
                                    <span>{user.name.split(" ")[0]}</span>
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10 border border-gray-200">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#e31e24] hover:text-white transition-colors duration-200"
                                    >
                                        Профиль
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#e31e24] hover:text-white transition-colors duration-200"
                                    >
                                        <LogOut size={16} className="inline mr-2" />
                                        Выйти
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/auth"
                                className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-300 ${
                                    location.pathname === "/auth" ? "text-[#e31e24]" : "text-gray-800 hover:text-[#e31e24]"
                                }`}
                            >
                                <User size={18} />
                                <span>Войти</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-gray-800 hover:text-[#e31e24] transition-colors duration-300"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block text-base font-medium ${
                                    location.pathname === link.path
                                        ? "text-[#e31e24]"
                                        : "text-gray-800 hover:text-[#e31e24]"
                                } transition-colors duration-300`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm font-semibold text-gray-500 mb-2">
                                Каталог
                            </p>
                            {catalogLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block py-2 text-base ${
                                        location.pathname === link.path
                                            ? "text-[#e31e24]"
                                            : "text-gray-800 hover:text-[#e31e24]"
                                    } transition-colors duration-300`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <Link
                            to="/cart"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-base font-medium ${
                                location.pathname === "/cart"
                                    ? "text-[#e31e24]"
                                    : "text-gray-800 hover:text-[#e31e24]"
                            }`}
                        >
                            Корзина ({totalItems})
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block text-base font-medium ${
                                        location.pathname === "/profile"
                                            ? "text-[#e31e24]"
                                            : "text-gray-800 hover:text-[#e31e24]"
                                    }`}
                                >
                                    Профиль
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left text-base font-medium text-red-600 hover:text-red-700 transition-colors"
                                >
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/auth"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block text-base font-medium ${
                                    location.pathname === "/auth"
                                        ? "text-[#e31e24]"
                                        : "text-gray-800 hover:text-[#e31e24]"
                                }`}
                            >
                                Войти / Регистрация
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;