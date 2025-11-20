import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    MapPin,
    Users,
    Award,
    ShoppingBag,
    Phone,
    Clock,
} from "lucide-react";
// Импортируйте изображения брендов как модули (предполагается, что файлы лежат в src/assets/brands/
// Если алиас @ настроен на src/, используйте '@/assets/brands/...'; иначе './assets/brands/...')
import RayBanIcon from "@/assets/brands/rayban1.png";
import PradaIcon from "@/assets/brands/prada.png";
import GucciIcon from "@/assets/brands/gucci1.png";
import OakleyIcon from "@/assets/brands/oakley.png";
import TomFordIcon from "@/assets/brands/tomford.png";
import ChanelIcon from "@/assets/brands/chanel.png";
import OliverPeoplesIcon from "@/assets/brands/oliverpeoples.png";
import LindbergIcon from "@/assets/brands/lindberg.png";

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const observerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "animate-fade-in-up",
                            "visible"
                        );
                        entry.target.style.opacity = "1";
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
            observerRef.current?.observe(el);
        });
        return () => observerRef.current?.disconnect();
    }, []);

    const features = [
        {
            icon: <ShoppingBag size={32} />,
            title: "Широкий ассортимент очков, оправ и линз",
            description: "На любой вкус и стиль от ведущих производителей",
        },
        {
            icon: <MapPin size={32} />,
            title: "2 салона оптики в городе Казань",
            description:
                "Удобное расположение в центре города для быстрого доступа",
        },
        {
            icon: <Users size={32} />,
            title: "Опытные специалисты",
            description:
                "Профессиональная консультация и индивидуальный подбор",
        },
        {
            icon: <Award size={32} />,
            title: "Очки и оправы на любой вкус",
            description:
                "Стильные модели для повседневной носки и особых случаев",
        },
    ];

    const brands = [
        { name: "Ray-Ban", icon: RayBanIcon },
        { name: "Prada", icon: PradaIcon },
        { name: "Gucci", icon: GucciIcon },
        { name: "Oakley", icon: OakleyIcon },
        { name: "Tom Ford", icon: TomFordIcon },
        { name: "Chanel", icon: ChanelIcon },
        { name: "Oliver Peoples", icon: OliverPeoplesIcon },
        { name: "Lindberg", icon: LindbergIcon },
    ];

    // Функция для определения размера логотипа по имени бренда
    const getLogoSizeClass = (name) => {
        const largerBrands = ["Ray-Ban", "Oliver Peoples", "Lindberg"];
        return largerBrands.includes(name)
            ? "w-48 h-24 object-contain"
            : "w-32 h-16 object-contain";
    };

    const addresses = [
        {
            address: "г. Казань, Николая Ершова, 47",
            phones: ["+7 (843) 528‒07‒08", "+7 (843) 272‒91‒65"],
            schedule: "Пн-Пт: 10.00 — 20.00 Сб: 10.00 — 18.00 Вс: выходной",
            mapUrl: "https://yandex.ru/maps/org/egooptika/73340528068/",
        },
        {
            address: "г. Казань, Меридианная, 4",
            phones: ["+7 (843) 528‒07‒08"],
            schedule: "Пн-Пт: 9.00 — 20.00 Сб: 10.00 — 19:00 Вс: выходной",
            mapUrl: "https://yandex.ru/maps/org/egooptika/138533122876/",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section with Parallax and Background Image */}
            <section className="hero-section relative overflow-hidden h-screen flex items-center justify-center bg-gradient-to-br from-deepBlue via-[#9c0101] to-[#740000]">
                {/* Фоновое изображение: люди в очках (placeholder; замените на реальное фото) */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", // Unsplash: люди в очках
                    }}
                />
                {/* Parallax Background Layer 1 - красные точки */}
                <div
                    className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,rgba(156,1,1,0.2)_2px,transparent_0)] bg-[length:50px_50px] bg-[position:0_0]"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                />
                {/* Parallax Background Layer 2 */}
                <div
                    className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(116,0,0,0.1)_25%,transparent_25%,transparent_75%,rgba(116,0,0,0.1)_75%)] bg-[length:80px_80px]"
                    style={{
                        transform: `translateY(${
                            scrollY * 0.3
                        }px) rotate(45deg)`,
                    }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center w-full">
                    <div
                        className="text-center w-full"
                        style={{
                            transform: `translateY(${scrollY * -0.15}px)`,
                        }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                            Очки и оправы
                            <br />
                            <span>на любой вкус</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto animate-fade-in-up">
                            {" "}
                            {/* Полностью белый */}
                            Широкий ассортимент премиальной оптики от ведущих
                            мировых брендов
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
                            <Link
                                to="/frames"
                                className="btn-primary inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-[#a00000] to-[#7a0000] shadow-[0_10px_36px_rgba(160,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] border border-[#a00000]/30 hover:shadow-[0_14px_44px_rgba(160,0,0,0.55)] hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-25"
                                data-testid="frames-btn"
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <span className="relative z-10 text-white [text-shadow:0_2px_3px_rgba(0,0,0,0.4)]">
                                    Оправы
                                </span>
                                <ArrowRight
                                    size={20}
                                    className="relative z-10 text-white"
                                />
                            </Link>
                            <Link
                                to="/sunglasses"
                                className="btn-secondary inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 shadow-[0_8px_32px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-blue-500/20 hover:shadow-[0_12px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20" /* Аналогично для синего */
                                data-testid="sunglasses-btn"
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <span className="relative z-10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                                    Солнцезащитные очки
                                </span>
                                <ArrowRight
                                    size={20}
                                    className="relative z-10"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Scroll Indicator - белый */}
                {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 rounded-full flex justify-center border-white">
                        <div className="w-1 h-3 rounded-full mt-2 bg-white animate-pulse" />
                    </div>
                </div> */}
            </section>

            {/* Features Section - чисто белый фон, иконки в красном, текст белый/серый без горчицы */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll opacity-0 text-center p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100" /* Убрал градиент to-slate-50, чистый белый */
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white mb-4 transform hover:scale-110 transition-transform duration-300 mx-auto bg-gradient-to-r from-[#9c0101] to-[#740000] shadow-[0_4px_14px_0_rgba(156,1,1,0.3)]">
                                    {" "}
                                    {/* Красный градиент */}
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#740000] mb-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                                    {feature.title}
                                </h3>{" "}
                                {/* Темно-красный */}
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands Section - с оригинальными иконками, градиент белый к светло-синему, без горчицы */}
            <section className="py-10 bg-gradient-to-br from-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#740000] mb-4 animate-on-scroll opacity-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                        {" "}
                        {/* Темно-красный */}
                         Только оригинальная продукция от ведущих мировых марок
                    </h2>
                    {/* <p className="text-xl text-gray-600 mb-12 animate-on-scroll opacity-0">
                        Только оригинальная продукция от ведущих мировых марок
                    </p> */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {brands.map((brand, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll opacity-0 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white shadow-md hover:shadow-lg flex flex-col items-center justify-center"
                            >
                                <div className="w-full h-24 flex items-center justify-center">
                                    <img
                                        src={brand.icon}
                                        alt={brand.name}
                                        className={getLogoSizeClass(brand.name)}
                                        onError={(e) => {
                                            console.error(
                                                `Ошибка загрузки изображения для бренда: ${brand.name}`
                                            );
                                            e.target.style.display = "none"; // Скрыть сломанное изображение, если нужно
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Catalog Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#740000] mb-6 animate-on-scroll opacity-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                        Каталог товаров
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 animate-on-scroll opacity-0 max-w-3xl mx-auto">
                        Откройте для себя полную коллекцию наших очков, оправ и
                        линз. Мы предлагаем только качественную продукцию от
                        проверенных производителей.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-on-scroll opacity-0">
                        <Link
                            to="/frames"
                            className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-[#9c0101] to-[#740000] text-white shadow-[0_8px_32px_rgba(156,1,1,0.4)] hover:shadow-[0_12px_40px_rgba(156,1,1,0.5)] hover:-translate-y-1 hover:scale-105"
                            style={{ position: "relative", overflow: "hidden" }}
                        >
                            <ShoppingBag size={24} />
                            <span>Перейти в каталог</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Addresses Section — карточки одинаковой высоты + кнопка прижата к низу */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#740000] mb-12 text-center animate-on-scroll opacity-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                        Наши адреса
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {addresses.map((location, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll opacity-0 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 
                     flex flex-col h-full" // ← главное: flex + h-full
                            >
                                {/* Основное содержимое */}
                                <div className="p-8 flex-1">
                                    {" "}
                                    {/* flex-1 растягивает этот блок */}
                                    <div className="flex items-start space-x-4 mb-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#9c0101] to-[#740000] flex items-center justify-center text-white">
                                            <MapPin size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-bold text-[#740000] mb-2">
                                                Салон {index + 1}
                                            </h3>
                                            <p className="text-gray-800 font-medium">
                                                {location.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <Phone
                                                size={20}
                                                className="text-[#9c0101] mt-1 flex-shrink-0"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-2">
                                                    Телефоны:
                                                </h4>
                                                {location.phones.map(
                                                    (phone, phoneIndex) => (
                                                        <p
                                                            key={phoneIndex}
                                                            className="text-gray-600 hover:text-[#9c0101] transition-colors"
                                                        >
                                                            {phone}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Clock
                                                size={20}
                                                className="text-[#9c0101] mt-1 flex-shrink-0"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-2">
                                                    Режим работы:
                                                </h4>
                                                <p className="text-gray-600">
                                                    {location.schedule}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Кнопка всегда внизу карточки */}
                                <div className="mt-auto p-8 pt-4 border-t border-gray-200">
                                    <a
                                        href={location.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#9c0101] to-[#740000] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                        style={{
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <MapPin size={16} />
                                        <span>Открыть карту салона</span>
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - градиент красный/синий, текст белый с тенью для контраста */}
            <section className="py-20 relative overflow-hidden text-white bg-gradient-to-br from-[#740000] via-[#9c0101] to-blue-900">
                {" "}
                {/* Используем указанные красные */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(156,1,1,0.3)_2px,transparent_0)] bg-[length:40px_40px]" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll opacity-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                        Посетите наши салоны
                    </h2>
                    <p className="text-xl mb-8 animate-on-scroll opacity-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        {" "}
                        {/* Добавлена тень */}
                        Приходите к нам, чтобы примерить очки и получить
                        профессиональную консультацию
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
