// Обновленный Navbar.js - Интеграция с Auth и Cart контекстами, показ корзины/профиля
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShoppingCart as CartIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/about', label: 'О нас' },
    { path: '/delivery', label: 'Доставка и возврат' },
    { path: '/contacts', label: 'Контакты' },
    { path: '/how-to-order', label: 'Как заказать' },
  ];

  const catalogLinks = [
    { path: '/frames', label: 'Оправы' },
    { path: '/sunglasses', label: 'Солнцезащитные очки' },
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 navbar ${scrolled ? 'scrolled bg-white/95 backdrop-blur-md shadow-sm' : (location.pathname === '/' ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm')} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-burgundy to-crimson rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">Э</span>
            </div>
            <span className={`text-2xl font-bold ${scrolled || location.pathname !== '/' ? 'text-deepBlue' : 'text-white'} hidden sm:block`}>
              Эгооптика
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-burgundy relative group ${
                  location.pathname === link.path ? 'text-burgundy' : 'text-gray-700'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-burgundy transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Catalog Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-gray-700 hover:text-burgundy transition-colors duration-300">
                Каталог
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
                {catalogLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-6 py-3 text-sm text-gray-700 hover:bg-burgundy hover:text-white transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-burgundy transition-colors duration-300"
            >
              <CartIcon size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-burgundy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span>Корзина</span>
            </Link>

            {/* Auth/Profile */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-burgundy transition-colors duration-300">
                  <User size={18} />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-burgundy hover:text-white transition-colors duration-200"
                  >
                    Профиль
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-burgundy hover:text-white transition-colors duration-200"
                  >
                    <LogOut size={16} className="inline mr-2" />
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-burgundy transition-colors duration-300"
              >
                <User size={18} />
                <span>Войти</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-burgundy transition-colors duration-300"
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
                className="block text-base font-medium text-gray-700 hover:text-burgundy transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-500 mb-2">Каталог</p>
              {catalogLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base text-gray-700 hover:text-burgundy transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-burgundy"
            >
              Корзина ({totalItems})
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-burgundy"
                >
                  Профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-base font-medium text-red-600"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-burgundy"
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