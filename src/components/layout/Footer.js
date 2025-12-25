import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

import EgoLogo from "src/assets/egooptika3.png";

const Footer = () => {
    return (
        <footer className="bg-deepBlue text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Навигация */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gold">
                            Навигация
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                                >
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/delivery"
                                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                                >
                                    Доставка и возврат
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contacts"
                                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                                >
                                    Контакты
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/how-to-order"
                                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                                >
                                    Как заказать
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Каталог */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gold">
                            Каталог
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/frames"
                                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                                >
                                    Оправы
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/sunglasses"
                                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                                >
                                    Солнцезащитные очки
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gold">
                            Контакты
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Phone
                                    size={18}
                                    className="text-gold mt-1 flex-shrink-0"
                                />
                                <div>
                                    <a
                                        href="tel:+78432324567"
                                        className="text-gray-300 hover:text-gold transition-colors duration-300 block"
                                    >
                                        +7 (843) 232-45-67
                                    </a>
                                    <a
                                        href="tel:+78437654321"
                                        className="text-gray-300 hover:text-gold transition-colors duration-300 block"
                                    >
                                        +7 (843) 765-43-21
                                    </a>
                                    <a
                                        href="tel:+78437654321"
                                        className="text-gray-300 hover:text-gold transition-colors duration-300 block"
                                    >
                                        +7 (843) 528-07-08
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail
                                    size={18}
                                    className="text-gold mt-1 flex-shrink-0"
                                />
                                <a
                                    href="mailto:info@egooptica.ru"
                                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                                >
                                    info@egooptica.ru
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin
                                    size={18}
                                    className="text-gold mt-1 flex-shrink-0"
                                />
                                <div>
                                    <a
                                        href="https://yandex.ru/maps/org/egooptika/73340528068/"
                                        className="text-gray-300 hover:text-gold transition-colors duration-300 block"
                                    >
                                        г. Казань, Николая Ершова, 47
                                    </a>
                                    <a
                                        href="https://yandex.ru/maps/org/egooptika/138533122876/"
                                        className="text-gray-300 hover:text-gold transition-colors duration-300 block"
                                    >
                                        г. Казань, Меридианная, 4
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* О компании */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src={EgoLogo}
                                alt="Эгооптика"
                                className="h-8"
                            />
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Ваш надёжный партнёр в мире качественной оптики от
                            ведущих мировых брендов
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Эгооптика. Все права
                        защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
