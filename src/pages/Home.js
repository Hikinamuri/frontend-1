import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    ArrowRight,
    MapPin,
    Users,
    Award,
    ShoppingBag,
    Phone,
    Clock,
} from "lucide-react";
import RayBanIcon from "@/assets/brands/rayban1.png";
import PradaIcon from "@/assets/brands/prada.png";
import GucciIcon from "@/assets/brands/gucci1.png";
import OakleyIcon from "@/assets/brands/oakley.png";
import TomFordIcon from "@/assets/brands/tomford.png";
import ChanelIcon from "@/assets/brands/chanel.png";
import OliverPeoplesIcon from "@/assets/brands/oliverpeoples.png";
import LindbergIcon from "@/assets/brands/lindberg.png";

const API_BASE =
    process.env.REACT_APP_WC_URL || "https://egooptika.ru/wp-json/wc/v3";
const CONSUMER_KEY = process.env.REACT_APP_WC_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_WC_SECRET;

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const [randomProducts, setRandomProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const observerRef = useRef(null);
    const carouselRef = useRef(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchRandomProducts = async () => {
            // Проверяем, не загружали ли уже
            if (hasFetched.current) return;
            hasFetched.current = true;

            if (!CONSUMER_KEY || !CONSUMER_SECRET) {
                console.warn("API ключи не настроены");
                return;
            }

            try {
                setLoadingProducts(true);
                const response = await axios.get(`${API_BASE}/products`, {
                    params: {
                        consumer_key: CONSUMER_KEY,
                        consumer_secret: CONSUMER_SECRET,
                        per_page: 50,
                    },
                    timeout: 10000,
                });

                const products = response.data.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: parseInt(product.price || 0),
                    image:
                        product.images?.[0]?.src ||
                        "https://via.placeholder.com/300?text=No+Image",
                    brand: product.etheme_brands?.[0]?.name || "Без бренда",
                }));

                const shuffledProducts = [...products]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 20); // Берем 20 случайных товаров

                setRandomProducts(shuffledProducts);
            } catch (err) {
                console.error("Ошибка загрузки товаров:", err);
                // Заглушки
                setRandomProducts([
                    {
                        id: 1,
                        name: "Очки Ray-Ban Aviator",
                        price: 15000,
                        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                        brand: "Ray-Ban",
                    },
                ]);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchRandomProducts();
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

    const getLogoSizeClass = (name) => {
        const largerBrands = ["Ray-Ban", "Oliver Peoples", "Lindberg"];
        return largerBrands.includes(name)
            ? "w-48 h-24 object-contain"
            : "w-32 h-16 object-contain";
    };

    const addresses = [
        {
            address: "г. Казань, Николая Ершова, 47",
            phones: ["+7 (843) 272‒91‒65"],
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
            {/* Random Products Carousel */}
            <section className="bg-gradient-to-r from-blue-50 to-white pt-8">
                <div className="max-w-7xl mx-auto px-4 pt-12">
                    <div className="relative">
                        <div
                            ref={carouselRef}
                            className="flex overflow-x-auto pb-6 gap-4 scrollbar-hide scroll-smooth"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            {loadingProducts
                                ? // Skeleton Loaders
                                  [...Array(5)].map((_, index) => (
                                      <div
                                          key={index}
                                          className="flex-shrink-0 w-48"
                                      >
                                          <div className="bg-gray-200 animate-pulse rounded-xl h-32 w-full"></div>
                                          <div className="mt-3 px-3">
                                              <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
                                              <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2 mb-2"></div>
                                              <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                                          </div>
                                      </div>
                                  ))
                                : randomProducts.map((product) => (
                                      <Link
                                          key={product.id}
                                          to={`/product/${product.id}`}
                                          className="flex-shrink-0 w-48 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                                      >
                                          {/* Изменено с aspect-square на меньшую высоту */}
                                          <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-white rounded-t-xl overflow-hidden p-3">
                                              <img
                                                  src={product.image}
                                                  alt={product.name}
                                                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                                              />
                                          </div>
                                          <div className="p-3">
                                              <div className="text-xs text-[#9c0101] font-semibold mb-1 line-clamp-1">
                                                  {product.brand}
                                              </div>
                                              <div className="text-lg font-bold text-[#740000]">
                                                  {product.price.toLocaleString(
                                                      "ru-RU"
                                                  )}{" "}
                                                  ₽
                                              </div>
                                          </div>
                                      </Link>
                                  ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Section with Parallax and Background Image */}
            <section className="hero-section relative overflow-hidden h-screen flex items-center justify-center bg-gradient-to-br from-deepBlue via-[#9c0101] to-[#740000]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,rgba(156,1,1,0.2)_2px,transparent_0)] bg-[length:50px_50px] bg-[position:0_0]"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                />
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
                            Широкий ассортимент премиальной оптики от ведущих
                            мировых брендов
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
                            <Link
                                to="/frames"
                                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-white text-gray-800 shadow-[0_8px_25px_rgba(0,0,0,0.15)] border border-white/20 hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:scale-105 w-full sm:w-auto min-w-[280px]"
                                data-testid="frames-btn"
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <span className="relative z-10 [text-shadow:0_1px_2px_rgba(255,255,255,0.5)]">
                                    Оправы
                                </span>
                                <ArrowRight
                                    size={20}
                                    className="relative z-10 text-gray-700"
                                />
                            </Link>
                            <Link
                                to="/sunglasses"
                                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-[#1e3a8a] text-white shadow-[0_8px_25px_rgba(30,58,138,0.3)] border border-blue-800/20 hover:shadow-[0_12px_35px_rgba(30,58,138,0.4)] hover:-translate-y-1 hover:scale-105 w-full sm:w-auto min-w-[280px]"
                                data-testid="sunglasses-btn"
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <span className="relative z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                                    Солнцезащитные очки
                                </span>
                                <ArrowRight
                                    size={20}
                                    className="relative z-10 text-white"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Рекламный блок */}
            <section className="py-8 bg-gradient-to-r from-yellow-50 to-amber-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center border-2 border-dashed border-amber-300 rounded-2xl p-6 md:p-8 lg:p-10 bg-white/50 backdrop-blur-sm">
                        <div className="max-w-2xl mx-auto">
                            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-amber-800 mb-2">
                                Тут будет ваша реклама
                            </p>
                            <p className="text-amber-600 text-sm md:text-base">
                                Этот блок можно использовать для размещения
                                баннера, спецпредложения или рекламного
                                сообщения
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="pt-16 pb-8 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#740000] mb-8 md:mb-12 animate-on-scroll opacity-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                        Только оригинальная продукция от ведущих мировых марок
                    </h2>

                    {/* Бесконечная карусель - верхний ряд */}
                    <div className="relative mb-8">
                        {/* Градиент для плавного перехода слева */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

                        {/* Градиент для плавного перехода справа */}
                        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

                        <div className="flex overflow-hidden">
                            <div className="flex animate-infinite-scroll">
                                {[...brands, ...brands].map((brand, index) => (
                                    <div
                                        key={`top-${index}`}
                                        className="flex-shrink-0 mx-4 md:mx-6 rounded-2xl p-6 transition-all duration-500 hover:scale-110 hover:shadow-2xl cursor-pointer bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white border border-gray-100/50 flex items-center justify-center w-32 md:w-40 h-24"
                                    >
                                        <img
                                            src={brand.icon}
                                            alt={brand.name}
                                            className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 hover:drop-shadow-lg"
                                            onError={(e) => {
                                                console.error(
                                                    `Ошибка загрузки изображения для бренда: ${brand.name}`
                                                );
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Статичные бренды для мобильных устройств (на случай проблем с анимацией) */}
                    <div className="md:hidden mt-8">
                        <div className="grid grid-cols-2 gap-4">
                            {brands.slice(0, 4).map((brand, index) => (
                                <div
                                    key={`mobile-${index}`}
                                    className="rounded-xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer bg-white shadow-md hover:shadow-lg flex items-center justify-center h-20"
                                >
                                    <img
                                        src={brand.icon}
                                        alt={brand.name}
                                        className={getLogoSizeClass(brand.name)}
                                        onError={(e) => {
                                            console.error(
                                                `Ошибка загрузки изображения для бренда: ${brand.name}`
                                            );
                                            e.target.style.display = "none";
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll opacity-0 text-center p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white mb-4 transform hover:scale-110 transition-transform duration-300 mx-auto bg-gradient-to-r from-[#9c0101] to-[#740000] shadow-[0_4px_14px_0_rgba(156,1,1,0.3)]">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#740000] mb-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
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

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden text-white bg-gradient-to-br from-[#740000] via-[#9c0101] to-blue-900">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(156,1,1,0.3)_2px,transparent_0)] bg-[length:40px_40px]" />
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll opacity-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]">
                        Посетите наши салоны
                    </h2>
                    <p className="text-xl mb-8 animate-on-scroll opacity-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        Приходите к нам, чтобы примерить очки и получить
                        профессиональную консультацию
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-6xl ">
                        {addresses.map((location, index) => (
                            <a
                                key={index}
                                href={location.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between space-x-3 px-4 py-4 rounded-xl font-semibold transition-all duration-300 bg-white text-black shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] w-full sm:w-auto min-w-[280px]"
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div className="flex items-center justify-between space-x-2">
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                        <MapPin
                                            size={20}
                                            className="text-[#740000]"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-lg">
                                            {location.address.split(",")[0]}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {location.address.split(",")[1]}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
