import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    Heart,
    Share2,
    Check,
    ArrowLeft,
    AlertCircle,
    Shield,
    Award,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    CreditCard,
    Mail,
    Lock,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

const API_BASE =
    process.env.REACT_APP_WC_URL || "https://egooptika.ru/wp-json/wc/v3";
const CONSUMER_KEY = process.env.REACT_APP_WC_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_WC_SECRET;

// Mock data for fallback when API fails to load
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Ray-Ban Aviator Classic",
        brand: "Ray-Ban",
        price: 15990,
        description:
            "Классические авиаторы Ray-Ban с металлической оправой. Легендарная модель, которая никогда не выходит из моды. Идеально подходят для любого типа лица.",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        specs: {
            Пол: "Унисекс",
            Материал: "Металл",
            Форма: "Авиатор",
            Цвет: "Золото",
            Страна: "Италия",
        },
        sku: "RB-3025-001",
        inStock: true,
        categories: [108],
    },
    {
        id: 2,
        name: "Prada PR 01OS",
        brand: "Prada",
        price: 22990,
        description:
            "Стильные оправы Prada с характерным логотипом. Идеальный выбор для повседневной носки.",
        images: [
            "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        specs: {
            Пол: "Женский",
            Материал: "Пластик",
            Форма: "Прямоугольная",
            Цвет: "Черный",
            Страна: "Италия",
        },
        sku: "PR-01OS-BLK",
        inStock: true,
        categories: [104],
    },
    {
        id: 3,
        name: "Gucci GG0066S",
        brand: "Gucci",
        price: 28990,
        description:
            "Эксклюзивные солнцезащитные очки Gucci с узнаваемым дизайном. Сочетание стиля и комфорта.",
        images: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        specs: {
            Пол: "Женский",
            Материал: "Пластик",
            Форма: "Кошачий глаз",
            Цвет: "Черный/Золото",
            Страна: "Италия",
        },
        sku: "GG0066S-001",
        inStock: true,
        categories: [108],
    },
    {
        id: 4,
        name: "Tom Ford FT5543",
        brand: "Tom Ford",
        price: 34990,
        description:
            "Элегантные оправы Tom Ford с титановым покрытием. Премиальное качество и безупречный стиль.",
        images: [
            "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        specs: {
            Пол: "Мужской",
            Материал: "Металл",
            Форма: "Прямоугольная",
            Цвет: "Серебро",
            Страна: "Италия",
        },
        sku: "FT5543-SLV",
        inStock: true,
        categories: [104],
    },
    {
        id: 5,
        name: "Oakley Holbrook",
        brand: "Oakley",
        price: 18990,
        description:
            "Спортивные солнцезащитные очки Oakley с технологией защиты от ультрафиолета. Идеальны для активного отдыха.",
        images: [
            "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        specs: {
            Пол: "Мужской",
            Материал: "Пластик",
            Форма: "Спортивная",
            Цвет: "Мат черный",
            Страна: "США",
        },
        sku: "OO9102-01",
        inStock: true,
        categories: [108],
    },
    {
        id: 6,
        name: "Chanel 5320",
        brand: "Chanel",
        price: 45990,
        description:
            "Изысканные оправы Chanel с культовым логотипом. Высокая мода и непревзойденное качество.",
        images: [
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        specs: {
            Пол: "Женский",
            Материал: "Пластик",
            Форма: "Кошачий глаз",
            Цвет: "Черный/Белый",
            Страна: "Франция",
        },
        sku: "5320-C501",
        inStock: true,
        categories: [104],
    },
];

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { user, login, register, loading: authLoading, error: authError } = useAuth();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSimilar, setLoadingSimilar] = useState(false);
    const [error, setError] = useState(null);
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [authForm, setAuthForm] = useState({ email: "", password: "" });
    const [localAuthError, setLocalAuthError] = useState(null);
    const [authSuccess, setAuthSuccess] = useState(false);
    const [showLoyaltyCard, setShowLoyaltyCard] = useState(false);
    const [hasShownModal, setHasShownModal] = useState(false); // Флаг для отслеживания показа модального окна

    // Lightbox states
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Magnifier states
    const imageContainerRef = useRef(null);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

    // Category determination
    const [categoryPath, setCategoryPath] = useState("/frames");
    const [categoryName, setCategoryName] = useState("Оправы");

    // Показываем модальное окно только один раз
    useEffect(() => {
        if (!user && !hasShownModal && !showAuthModal && !showDiscountModal) {
            const timer = setTimeout(() => {
                setShowDiscountModal(true);
                setHasShownModal(true); // Устанавливаем флаг, что окно было показано
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [user, hasShownModal, showAuthModal, showDiscountModal]);

    const mapProduct = (wooProduct) => {
        const attributes = {};
        if (wooProduct.attributes && wooProduct.attributes.length > 0) {
            wooProduct.attributes.forEach((attr) => {
                let key =
                    attr.name || attr.slug?.replace("pa_", "") || "Неизвестно";
                if (key === "sex") key = "Пол";
                if (key === "тип-оправы") key = "Форма";
                if (key === "country") key = "Страна";
                if (key === "material") key = "Материал";
                if (key === "color") key = "Цвет";
                attributes[key] =
                    attr.options?.join(", ") || attr.option || "Не указано";
            });
        }

        return {
            id: wooProduct.id,
            name: wooProduct.name,
            brand: wooProduct.etheme_brands?.[0]?.name || "Без бренда",
            brandId: wooProduct.etheme_brands?.[0]?.id || null,
            categories: wooProduct.categories?.map((cat) => cat.id) || [],
            price: parseInt(wooProduct.price || 0),
            description: wooProduct.description || "Описание отсутствует.",
            images: wooProduct.images?.map((img) => img.src) || [],
            specs: attributes,
            sku: wooProduct.sku || "Не указан",
            inStock: wooProduct.stock_status === "instock",
        };
    };

    const fetchSimilarProducts = async (currentProduct) => {
        if (!currentProduct) return;

        // ====================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ======================
        const getGenderScore = (currentGender, pGender) => {
            if (!currentGender || !pGender) return 1;
            if (currentGender === pGender) return 3;                    // идеальное совпадение
            if (currentGender === "Унисекс" || pGender === "Унисекс") return 2; // unisex — универсал
            return 0; // мужчина ↔ женщина = 0
        };

        const getMaterialScore = (currentMaterial, pMaterial) => {
            if (!currentMaterial || !pMaterial) return 1;

            const cMetal = currentMaterial.toLowerCase().includes("металл");
            const pMetal = pMaterial.toLowerCase().includes("металл");
            const cPlastic = currentMaterial.toLowerCase().includes("пластик");
            const pPlastic = pMaterial.toLowerCase().includes("пластик");

            if (cMetal && pMetal) return 3;
            if (cPlastic && pPlastic) return 3;
            if ((cMetal || cPlastic) && (pMetal || pPlastic)) return 2; // смешанный материал

            return 0;
        };
        // =====================================================================

        // Если API не настроен — работаем с мок-данными
        if (!CONSUMER_KEY || !CONSUMER_SECRET) {
            const scored = MOCK_PRODUCTS
                .filter(p => p.id !== currentProduct.id)
                .map(p => {
                    const genderScore = getGenderScore(
                        currentProduct.specs["Пол"],
                        p.specs["Пол"]
                    );
                    const materialScore = getMaterialScore(
                        currentProduct.specs["Материал"],
                        p.specs["Материал"]
                    );
                    const brandBonus = p.brand === currentProduct.brand ? 2 : 0;

                    return {
                        ...p,
                        score: genderScore + materialScore + brandBonus,
                    };
                })
                .sort((a, b) => b.score - a.score);

            const displayProducts = scored.slice(0, 6).map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.images[0],
                brand: p.brand,
            }));

            setSimilarProducts(displayProducts.length > 0 
                ? displayProducts 
                : MOCK_PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 6)
                    .map(p => ({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        image: p.images[0],
                        brand: p.brand,
                    }))
            );
            return;
        }

        // ====================== РЕАЛЬНЫЙ API ======================
        try {
            setLoadingSimilar(true);

            const response = await axios.get(`${API_BASE}/products`, {
                params: {
                    consumer_key: CONSUMER_KEY,
                    consumer_secret: CONSUMER_SECRET,
                    per_page: 100,
                    exclude: currentProduct.id,
                    status: "publish",
                    stock_status: "instock",
                },
                timeout: 10000,
            });

            const mappedAll = response.data.map(mapProduct);

            const scored = mappedAll
                .map(p => {
                    const genderScore = getGenderScore(
                        currentProduct.specs["Пол"],
                        p.specs["Пол"]
                    );
                    const materialScore = getMaterialScore(
                        currentProduct.specs["Материал"],
                        p.specs["Материал"]
                    );
                    const brandBonus = p.brand === currentProduct.brand ? 2 : 0;

                    return {
                        ...p,
                        score: genderScore + materialScore + brandBonus,
                    };
                })
                .filter(p => p.score > 0) // только товары с хотя бы минимальным совпадением
                .sort((a, b) => b.score - a.score);

            let candidates = scored.slice(0, 6);

            // Если мало — добираем по бренду
            if (candidates.length < 6 && currentProduct.brand !== "Без бренда") {
                const byBrand = mappedAll
                    .filter(p => 
                        p.brand === currentProduct.brand && 
                        !candidates.some(c => c.id === p.id)
                    )
                    .slice(0, 6 - candidates.length);

                candidates = [...candidates, ...byBrand];
            }

            // Если всё ещё мало — добираем любые товары
            if (candidates.length < 6) {
                const remaining = mappedAll
                    .filter(p => !candidates.some(c => c.id === p.id))
                    .slice(0, 6 - candidates.length);
                candidates = [...candidates, ...remaining];
            }

            const displayProducts = candidates.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.images[0] || "https://via.placeholder.com/300?text=No+Image",
                brand: p.brand,
            }));

            setSimilarProducts(displayProducts);
        } catch (err) {
            console.error("Ошибка загрузки похожих товаров:", err);
            // При ошибке API — падаем на улучшенную мок-логику (выше)
            const scored = MOCK_PRODUCTS
                .filter(p => p.id !== currentProduct.id)
                .map(p => {
                    const genderScore = getGenderScore(currentProduct.specs["Пол"], p.specs["Пол"]);
                    const materialScore = getMaterialScore(currentProduct.specs["Материал"], p.specs["Материал"]);
                    const brandBonus = p.brand === currentProduct.brand ? 2 : 0;
                    return { ...p, score: genderScore + materialScore + brandBonus };
                })
                .sort((a, b) => b.score - a.score);

            setSimilarProducts(
                scored.slice(0, 6).map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.images[0],
                    brand: p.brand,
                }))
            );
        } finally {
            setLoadingSimilar(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!CONSUMER_KEY || !CONSUMER_SECRET) {
                const mockProduct = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
                if (mockProduct) {
                    setProduct(mockProduct);
                    fetchSimilarProducts(mockProduct);

                    const categories = mockProduct.categories || [];
                    if (categories.includes(108)) {
                        setCategoryPath("/sunglasses");
                        setCategoryName("Солнцезащитные очки");
                    } else if (categories.includes(104)) {
                        setCategoryPath("/frames");
                        setCategoryName("Оправы");
                    } else {
                        setCategoryPath("/frames");
                        setCategoryName("Оправы");
                    }
                } else {
                    setError("Товар не найден");
                }
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${API_BASE}/products/${id}`, {
                    params: {
                        consumer_key: CONSUMER_KEY,
                        consumer_secret: CONSUMER_SECRET,
                    },
                    timeout: 10000,
                });

                const wooProduct = response.data;
                const mappedProduct = mapProduct(wooProduct);
                setProduct(mappedProduct);
                fetchSimilarProducts(mappedProduct);

                const categories = mappedProduct.categories || [];
                if (categories.includes(108)) {
                    setCategoryPath("/sunglasses");
                    setCategoryName("Солнцезащитные очки");
                } else if (categories.includes(104)) {
                    setCategoryPath("/frames");
                    setCategoryName("Оправы");
                } else {
                    setCategoryPath("/frames");
                    setCategoryName("Оправы");
                }
            } catch (err) {
                console.error("Ошибка загрузки товара:", err);
                const mockProduct = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
                if (mockProduct) {
                    setProduct(mockProduct);
                    fetchSimilarProducts(mockProduct);

                    const categories = mockProduct.categories || [];
                    if (categories.includes(108)) {
                        setCategoryPath("/sunglasses");
                        setCategoryName("Солнцезащитные очки");
                    } else if (categories.includes(104)) {
                        setCategoryPath("/frames");
                        setCategoryName("Оправы");
                    } else {
                        setCategoryPath("/frames");
                        setCategoryName("Оправы");
                    }
                } else {
                    setError(`Ошибка загрузки товара: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (lightboxOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxOpen]);

    useEffect(() => {
        if (!lightboxOpen) return;

        const handleKey = (e) => {
            if (e.key === "Escape") {
                setLightboxOpen(false);
                setZoom(1);
                setPan({ x: 0, y: 0 });
            }
            if (e.key === "ArrowLeft") {
                setLightboxIndex(
                    (prev) =>
                        (prev - 1 + product.images.length) %
                        product.images.length,
                );
                setZoom(1);
                setPan({ x: 0, y: 0 });
            }
            if (e.key === "ArrowRight") {
                setLightboxIndex((prev) => (prev + 1) % product.images.length);
                setZoom(1);
                setPan({ x: 0, y: 0 });
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightboxOpen, product?.images?.length]);

    useEffect(() => {
        if (!dragging) return;

        const handleMove = (e) => {
            setPan({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        };

        const handleUp = () => setDragging(false);

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleUp);

        return () => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseup", handleUp);
        };
    }, [dragging, dragStart]);

    const handleMouseDown = (e) => {
        if (zoom <= 1) return;
        setDragging(true);
        setDragStart({
            x: e.clientX - pan.x,
            y: e.clientY - pan.y,
        });
        e.preventDefault();
    };

    const handleWheel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY < 0 ? 1.2 : 0.83;
        setZoom((prev) => Math.max(0.5, Math.min(5, prev * delta)));
    };

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    const handleMagnifierMove = (e) => {
        if (!imageContainerRef.current) return;
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMagnifierPosition({ x, y });
    };

    const handleAuthChange = (e) => {
        setAuthForm({ ...authForm, [e.target.name]: e.target.value });
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setLocalAuthError(null);

        try {
            if (isLogin) {
                await login(authForm.email, authForm.password);
                setAuthSuccess(true);
                setTimeout(() => {
                    setShowAuthModal(false);
                    setAuthSuccess(false);
                    setAuthForm({ email: "", password: "" });
                }, 1500);
            } else {
                await register(authForm.email, authForm.password);
                setAuthSuccess(true);
                setShowLoyaltyCard(true);
                setTimeout(() => {
                    setShowAuthModal(false);
                    setAuthSuccess(false);
                    setAuthForm({ email: "", password: "" });
                }, 3000);
            }
        } catch (err) {
            setLocalAuthError(err.message);
        }
    };

    const resetAuthForm = () => {
        setAuthForm({ email: "", password: "" });
        setLocalAuthError(null);
        setAuthSuccess(false);
    };

    const displayAuthError = localAuthError || authError;
    const cleanAuthError = displayAuthError
        ? displayAuthError.replace(/<[^>]*>/g, "").trim()
        : null;

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#e31e24] mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Загрузка товара...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="text-red-500" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ошибка загрузки
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {error || "Товар не найден"}
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-2 bg-[#e31e24] text-white rounded-lg hover:bg-[#c41c20] transition-colors inline-block"
                    >
                        Вернуться на главную
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!user) {
            setShowDiscountModal(false);
            setShowAuthModal(true);
            return;
        }
        addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    const toggleFavorite = () => {
        if (!user) {
            setShowDiscountModal(false);
            setShowAuthModal(true);
            return;
        }
        setIsFavorite(!isFavorite);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Посмотрите ${product.name} в Эгооптика`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Ссылка скопирована в буфер обмена!");
        }
    };

    const currentImage =
        product.images[selectedImage] ||
        "https://via.placeholder.com/400?text=No+Image";

    return (
        <div className="min-h-screen pt-20 bg-white">
            {/* Discount Modal - показывается только один раз */}
            {showDiscountModal && !user && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-scale-in">
                        <h3 className="text-xl font-bold text-[#c41c20] mb-4 text-center">
                            🎉 Система скидок Эгооптика
                        </h3>

                        <div className="text-gray-700 text-sm space-y-3">
                            <div className="bg-pink-50 p-3 rounded-lg">
                                <p className="font-semibold text-[#c41c20]">
                                    🎂 День рождения
                                </p>
                                <p className="text-lg font-bold">-5%</p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                                <p className="font-semibold text-[#c41c20]">
                                    🎁 При регистрации
                                </p>
                                <p className="text-lg font-bold">
                                    +500 бонусов
                                </p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="font-semibold text-[#c41c20]">
                                    💳 От 0 до 50 000 ₽
                                </p>
                                <p className="text-lg font-bold">-5%</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                                <p className="font-semibold text-[#c41c20]">
                                    💳 От 50 000 до 200 000 ₽
                                </p>
                                <p className="text-lg font-bold">-10%</p>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-lg">
                                <p className="font-semibold text-[#c41c20]">
                                    💳 Свыше 200 000 ₽
                                </p>
                                <p className="text-lg font-bold">-15%</p>
                            </div>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>Зарегистрируйтесь, чтобы получать скидки!</p>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDiscountModal(false);
                                    setShowAuthModal(true);
                                }}
                                className="flex-1 py-3 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white font-bold rounded-xl hover:scale-[1.02] transition"
                            >
                                Войти / Регистрация
                            </button>
                            <button
                                onClick={() => setShowDiscountModal(false)}
                                className="flex-1 py-3 border-2 border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition"
                            >
                                Закрыть
                            </button>
                        </div>

                        <button
                            onClick={() => setShowDiscountModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Auth Modal */}
            {showAuthModal && !user && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 overflow-y-auto py-8">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e31e24] to-transparent"></div>
                        
                        <button
                            onClick={() => {
                                setShowAuthModal(false);
                                resetAuthForm();
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl z-10"
                        >
                            ✕
                        </button>

                        <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-2 mb-8 shadow-inner border border-gray-300/50">
                            <button
                                onClick={() => {
                                    setIsLogin(true);
                                    resetAuthForm();
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
                                <span className="relative z-10">
                                    Войти
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    setIsLogin(false);
                                    resetAuthForm();
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
                                <span className="relative z-10">
                                    Регистрация
                                </span>
                            </button>
                        </div>

                        {authSuccess ? (
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
                                        ? "Перенаправляем..."
                                        : "На почту отправлена ссылка для подтверждения."}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleAuthSubmit} className="space-y-6">
                                {cleanAuthError && (
                                    <div className="text-red-600 text-center font-medium bg-red-50 p-3 rounded-xl">
                                        {cleanAuthError}
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
                                            value={authForm.email}
                                            onChange={handleAuthChange}
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
                                            value={authForm.password}
                                            onChange={handleAuthChange}
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

                                {!isLogin && (
                                    <p className="text-sm text-gray-500 text-center mt-4">
                                        Регистрируясь, вы получаете скидки и бонусы!
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Loyalty Card Modal */}
            {showLoyaltyCard && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 px-4 overflow-y-auto py-8">
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative animate-scale-in">
                        <button
                            onClick={() => setShowLoyaltyCard(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl z-10"
                        >
                            ✕
                        </button>
                        
                        <h2 className="text-3xl font-bold text-center text-[#c41c20] mb-8">
                            Ваша карта лояльности
                        </h2>
                        <div className="relative">
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
                                            {authForm.email.split("@")[0] ||
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
                                                500 ₽
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
                                    Показывайте эту карту при покупке и получайте бонусы!
                                </p>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setShowLoyaltyCard(false)}
                            className="mt-6 w-full py-3 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white font-bold rounded-xl hover:scale-[1.02] transition"
                        >
                            Отлично!
                        </button>
                    </div>
                </div>
            )}

            {/* Breadcrumbs */}
            <nav className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-[#e31e24] transition-colors duration-200"
                            >
                                Главная
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <span className="mx-2">/</span>
                            <Link
                                to={categoryPath}
                                className="hover:text-[#e31e24] transition-colors duration-200"
                            >
                                {categoryName}
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-[400px]">
                                {product.name}
                            </span>
                        </li>
                    </ol>
                </div>
            </nav>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <Link
                        to={categoryPath}
                        className="inline-flex items-center space-x-2 text-[#e31e24] hover:text-[#c41c20] transition-colors duration-300 mb-8 group"
                    >
                        <ArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 transition-transform duration-300"
                        />
                        <span className="font-semibold">Назад к каталогу</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Images section */}
                        <div className="space-y-6">
                            <div
                                ref={imageContainerRef}
                                className="aspect-square bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden relative group cursor-zoom-in"
                                onMouseEnter={() => setShowMagnifier(true)}
                                onMouseLeave={() => setShowMagnifier(false)}
                                onMouseMove={handleMagnifierMove}
                                onClick={() => openLightbox(selectedImage)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent opacity-60 pointer-events-none" />
                                <img
                                    src={currentImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    data-testid="product-main-image"
                                />

                                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                                    <button className="bg-white/90 backdrop-blur rounded-full p-3 shadow-xl hover:bg-white transition-colors">
                                        <Maximize2
                                            size={28}
                                            className="text-gray-800"
                                        />
                                    </button>
                                </div>

                                {showMagnifier && imageContainerRef.current && (
                                    <div
                                        className="pointer-events-none absolute border-4 border-white shadow-2xl rounded-xl overflow-hidden z-50"
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            left: `${Math.max(
                                                20,
                                                Math.min(
                                                    imageContainerRef.current.getBoundingClientRect()
                                                        .width - 220,
                                                    magnifierPosition.x - 100,
                                                ),
                                            )}px`,
                                            top: `${Math.max(
                                                20,
                                                Math.min(
                                                    imageContainerRef.current.getBoundingClientRect()
                                                        .height - 220,
                                                    magnifierPosition.y - 100,
                                                ),
                                            )}px`,
                                            backgroundImage: `url(${currentImage})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: `${
                                                imageContainerRef.current.getBoundingClientRect()
                                                    .width * 2.5
                                            }px ${
                                                imageContainerRef.current.getBoundingClientRect()
                                                    .height * 2.5
                                            }px`,
                                            backgroundPosition: `${-(
                                                magnifierPosition.x * 2.5 -
                                                100
                                            )}px ${-(magnifierPosition.y * 2.5 - 100)}px`,
                                        }}
                                    />
                                )}

                                <div className="absolute inset-0 rounded-3xl ring-2 ring-[#e31e24]/0 group-hover:ring-[#e31e24]/30 transition-all duration-500 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                            </div>

                            {product.images.length > 1 && (
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImage(index)
                                            }
                                            className={`aspect-square rounded-2xl overflow-hidden relative transition-all duration-300 bg-white shadow-md hover:shadow-xl hover:scale-105 ${
                                                selectedImage === index
                                                    ? "scale-105 shadow-xl bg-gradient-to-br from-gray-100 to-white"
                                                    : "bg-gradient-to-br from-white to-gray-50 hover:from-white hover:to-gray-100"
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} — вид ${
                                                    index + 1
                                                }`}
                                                className="w-full h-full object-contain p-4 transform bg-white transition-transform duration-300 hover:scale-110"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            <div>
                                <p className="text-sm text-[#e31e24] font-semibold mb-3 bg-[#e31e24]/10 px-3 py-1 rounded-full inline-block">
                                    {product.brand}
                                </p>
                                <h1
                                    className="text-4xl md:text-5xl font-bold text-[#c41c20] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                                    data-testid="product-title"
                                >
                                    {product.name}
                                </h1>

                                <p className="text-base text-gray-600 mb-4">
                                    Артикул:{" "}
                                    <span className="font-semibold text-[#c41c20]">
                                        {product.sku}
                                    </span>
                                </p>

                                <p className="text-5xl font-bold text-[#e31e24] mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                                    {product.price.toLocaleString("ru-RU")} ₽
                                </p>

                                <p
                                    className="text-lg text-gray-700 leading-relaxed mb-8"
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                ></p>
                            </div>

                            {Object.keys(product.specs).length > 0 && (
                                <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
                                    <h3 className="text-2xl font-bold text-[#c41c20] mb-6">
                                        Характеристики
                                    </h3>
                                    <div className="space-y-4">
                                        {Object.entries(product.specs).map(
                                            ([key, value]) => (
                                                <div
                                                    key={key}
                                                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0 group"
                                                >
                                                    <span className="text-gray-600 group-hover:text-[#c41c20] transition-colors duration-300">
                                                        {key}:
                                                    </span>
                                                    <span className="font-semibold text-[#c41c20] group-hover:text-[#e31e24] transition-colors duration-300">
                                                        {value}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <button
                                    onClick={handleAddToCart}
                                    className={`w-full inline-flex items-center justify-center space-x-3 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
                                        addedToCart
                                            ? "bg-green-500 text-white shadow-[0_8px_32px_rgba(34,197,94,0.4)]"
                                            : !user
                                              ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-[0_8px_32px_rgba(75,85,99,0.4)] hover:shadow-[0_12px_40px_rgba(75,85,99,0.5)]"
                                              : "bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white hover:-translate-y-1 hover:scale-105"
                                    }`}
                                    data-testid="add-to-cart-btn"
                                >
                                    {addedToCart ? (
                                        <>
                                            <Check
                                                size={24}
                                                className="relative z-10"
                                            />
                                            <span className="relative z-10">
                                                Добавлено в корзину
                                            </span>
                                        </>
                                    ) : !user ? (
                                        <>
                                            <AlertCircle
                                                size={24}
                                                className="relative z-10"
                                            />
                                            <span className="relative z-10">
                                                Войдите для добавления
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart
                                                size={24}
                                                className="relative z-10"
                                            />
                                            <span className="relative z-10">
                                                Добавить в корзину
                                            </span>
                                        </>
                                    )}
                                </button>

                                <div className="flex gap-4">
                                    <button
                                        onClick={toggleFavorite}
                                        className={`flex-1 inline-flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                                            isFavorite
                                                ? "bg-[#e31e24] border-[#e31e24] text-white shadow-[0_4px_16px_rgba(227,30,36,0.3)]"
                                                : "border-[#e31e24] text-[#e31e24] hover:bg-[#e31e24] hover:text-white"
                                        } hover:-translate-y-1 hover:shadow-lg`}
                                    >
                                        <Heart
                                            size={20}
                                            className={
                                                isFavorite ? "fill-white" : ""
                                            }
                                        />
                                        <span>
                                            {isFavorite
                                                ? "В избранном"
                                                : "В избранное"}
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex-1 inline-flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 border-[#e31e24] text-[#e31e24] hover:bg-[#e31e24] hover:text-white hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <Share2 size={20} />
                                        <span>Поделиться</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
                                <h4 className="text-xl font-bold text-[#c41c20] mb-6">
                                    Преимущества
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start space-x-4 group">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#e31e24] to-[#c41c20] rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                                            <Check
                                                size={16}
                                                className="text-white"
                                            />
                                        </div>
                                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-1">
                                            Возможность примерки в салоне
                                        </span>
                                    </li>
                                    <li className="flex items-start space-x-4 group">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#e31e24] to-[#c41c20] rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                                            <Shield
                                                size={16}
                                                className="text-white"
                                            />
                                        </div>
                                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-1">
                                            Оригинальная продукция с гарантией
                                        </span>
                                    </li>
                                    <li className="flex items-start space-x-4 group">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#e31e24] to-[#c41c20] rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                                            <Award
                                                size={16}
                                                className="text-white"
                                            />
                                        </div>
                                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-1">
                                            Консультация оптометриста
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxOpen && product.images.length > 0 && (
                <div
                    className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center"
                    onClick={() => {
                        setLightboxOpen(false);
                        setZoom(1);
                        setPan({ x: 0, y: 0 });
                    }}
                    onWheel={(e) => e.stopPropagation()}
                >
                    <div
                        className="relative w-full h-full"
                        onClick={(e) => e.stopPropagation()}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src={product.images[lightboxIndex]}
                                alt={product.name}
                                className="max-w-[90vw] max-h-[90vh] object-contain"
                                style={{
                                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                                    transition: dragging
                                        ? "none"
                                        : "transform 0.2s ease-out",
                                    cursor:
                                        zoom > 1
                                            ? dragging
                                                ? "grabbing"
                                                : "grab"
                                            : "default",
                                }}
                            />
                        </div>

                        <button
                            className="absolute left-8 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-4 transition-colors"
                            onClick={() => {
                                setLightboxIndex(
                                    (prev) =>
                                        (prev - 1 + product.images.length) %
                                        product.images.length,
                                );
                                setZoom(1);
                                setPan({ x: 0, y: 0 });
                            }}
                        >
                            <ChevronLeft size={48} />
                        </button>
                        <button
                            className="absolute right-8 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-4 transition-colors"
                            onClick={() => {
                                setLightboxIndex(
                                    (prev) =>
                                        (prev + 1) % product.images.length,
                                );
                                setZoom(1);
                                setPan({ x: 0, y: 0 });
                            }}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <button
                            className="absolute top-8 right-8 text-white bg-black/40 hover:bg-black/60 rounded-full p-4 transition-colors"
                            onClick={() => {
                                setLightboxOpen(false);
                                setZoom(1);
                                setPan({ x: 0, y: 0 });
                            }}
                        >
                            <X size={48} />
                        </button>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-8 py-4 flex items-center gap-8 text-white">
                            <button
                                onClick={() =>
                                    setZoom((prev) => Math.max(0.5, prev / 1.2))
                                }
                            >
                                <ZoomOut size={28} />
                            </button>
                            <span className="text-xl font-semibold min-w-[80px] text-center">
                                {Math.round(zoom * 100)}%
                            </span>
                            <button
                                onClick={() =>
                                    setZoom((prev) => Math.min(5, prev * 1.2))
                                }
                            >
                                <ZoomIn size={28} />
                            </button>
                            <button
                                onClick={() => {
                                    setZoom(1);
                                    setPan({ x: 0, y: 0 });
                                }}
                            >
                                <RotateCcw size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Similar Products Section */}
            <section className="py-20 bg-gradient-to-br from-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-[#c41c20] mb-12 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                        Похожие товары
                    </h2>

                    {loadingSimilar ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                                >
                                    <div className="aspect-[4/3] bg-gray-200 rounded-t-2xl"></div>
                                    <div className="p-4">
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : similarProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {similarProducts.map((similarProduct) => (
                                <Link
                                    key={similarProduct.id}
                                    to={`/product/${similarProduct.id}`}
                                    className="group block bg-white rounded-2xl overflow-hidden 
                                             border border-gray-200 
                                             shadow-lg hover:shadow-xl 
                                             transition-all duration-300 
                                             hover:-translate-y-2 hover:border-[#e31e24]/30"
                                >
                                    <div className="aspect-[4/3] bg-gradient-to-br from-white to-white p-6">
                                        <img
                                            src={similarProduct.image}
                                            alt={similarProduct.name}
                                            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="p-4 bg-white">
                                        <div className="text-xs text-[#e31e24] font-semibold mb-1">
                                            {similarProduct.brand}
                                        </div>
                                        <div className="text-lg font-bold text-[#c41c20] group-hover:text-[#e31e24] transition-colors">
                                            {similarProduct.price.toLocaleString(
                                                "ru-RU",
                                            )}{" "}
                                            ₽
                                        </div>
                                    </div>

                                    <div className="h-1 bg-gradient-to-r from-[#e31e24] to-[#c41c20] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">
                            Нет похожих товаров
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductPage;