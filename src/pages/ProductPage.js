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
    Truck,
    Award,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    ZoomIn,
    ZoomOut,
    RotateCcw,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

const API_BASE =
    process.env.REACT_APP_WC_URL || "https://egooptika.ru/wp-json/wc/v3";
const CONSUMER_KEY = process.env.REACT_APP_WC_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_WC_SECRET;

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSimilar, setLoadingSimilar] = useState(false);
    const [error, setError] = useState(null);

    // Lightbox states
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Magnifier states (for card view)
    const imageContainerRef = useRef(null);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

    // Category determination
    const [categoryPath, setCategoryPath] = useState("/frames");
    const [categoryName, setCategoryName] = useState("Оправы");

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
        if (!CONSUMER_KEY || !CONSUMER_SECRET || !currentProduct) return;

        try {
            setLoadingSimilar(true);

            let candidates = [];

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

            const byAttrs = mappedAll.filter((p) => {
                const sameGender =
                    !currentProduct.specs["Пол"] ||
                    p.specs["Пол"] === currentProduct.specs["Пол"];
                const sameMaterial =
                    !currentProduct.specs["Материал"] ||
                    p.specs["Материал"] === currentProduct.specs["Материал"];
                return sameGender && sameMaterial;
            });

            candidates = byAttrs;

            if (
                candidates.length < 6 &&
                currentProduct.brand !== "Без бренда"
            ) {
                const byBrand = mappedAll.filter(
                    (p) =>
                        p.brand === currentProduct.brand &&
                        !candidates.some((c) => c.id === p.id),
                );
                candidates = [
                    ...candidates,
                    ...byBrand.slice(0, 6 - candidates.length),
                ];
            }

            if (candidates.length < 6) {
                const minPrice = currentProduct.price * 0.7;
                const maxPrice = currentProduct.price * 1.3;
                try {
                    const priceResp = await axios.get(`${API_BASE}/products`, {
                        params: {
                            consumer_key: CONSUMER_KEY,
                            consumer_secret: CONSUMER_SECRET,
                            per_page: 50,
                            exclude: currentProduct.id,
                            status: "publish",
                            stock_status: "instock",
                            min_price: Math.floor(minPrice),
                            max_price: Math.ceil(maxPrice),
                        },
                        timeout: 10000,
                    });
                    const mappedPrice = priceResp.data
                        .map(mapProduct)
                        .filter((p) => !candidates.some((c) => c.id === p.id));
                    candidates = [
                        ...candidates,
                        ...mappedPrice.slice(0, 6 - candidates.length),
                    ];
                } catch (err) {
                    console.log("Ошибка загрузки по цене:", err.message);
                }
            }

            if (candidates.length < 6) {
                const remaining = mappedAll.filter(
                    (p) => !candidates.some((c) => c.id === p.id),
                );
                candidates = [
                    ...candidates,
                    ...remaining.slice(0, 6 - candidates.length),
                ];
            }

            const displayProducts = candidates.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image:
                    p.images[0] ||
                    "https://via.placeholder.com/300?text=No+Image",
                brand: p.brand,
            }));

            const shuffled = displayProducts
                .sort(() => Math.random() - 0.5)
                .slice(0, 6);

            setSimilarProducts(shuffled);
        } catch (err) {
            console.error("Ошибка загрузки похожих товаров:", err);
            setSimilarProducts([
                {
                    id: 1,
                    name: "Очки Ray-Ban Aviator",
                    price: 15000,
                    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                    brand: "Ray-Ban",
                },
                {
                    id: 2,
                    name: "Оправы Prada PR 01OS",
                    price: 22000,
                    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                    brand: "Prada",
                },
                {
                    id: 3,
                    name: "Солнцезащитные очки Gucci",
                    price: 28000,
                    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                    brand: "Gucci",
                },
            ]);
        } finally {
            setLoadingSimilar(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!CONSUMER_KEY || !CONSUMER_SECRET) {
                setError("Ключи API не настроены");
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

                // Определяем категорию
                const categories = mappedProduct.categories || [];
                if (categories.includes(108)) {
                    setCategoryPath("/sunglasses");
                    setCategoryName("Солнцезащитные очки");
                } else if (categories.includes(104)) {
                    setCategoryPath("/frames");
                    setCategoryName("Оправы");
                } else {
                    // Default to frames if unknown
                    setCategoryPath("/frames");
                    setCategoryName("Оправы");
                }
            } catch (err) {
                console.error("Ошибка загрузки товара:", err);
                setError(`Ошибка загрузки товара: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Блокировка скролла страницы при открытом lightbox
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

    // Клавиатурное управление lightbox
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

    // Drag в lightbox
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
                        to="/auth"
                        className="px-6 py-2 bg-[#e31e24] text-white rounded-lg hover:bg-[#c41c20] transition-colors inline-block"
                    >
                        Вернуться к каталогу
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!user) {
            navigate("/auth");
            return;
        }
        addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const currentImage =
        product.images[selectedImage] ||
        "https://via.placeholder.com/400?text=No+Image";

    return (
        <div className="min-h-screen pt-20 bg-white">
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
                    {/* Back Button */}
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
                        {/* Images */}
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

                                {/* Кнопка полноэкранного просмотра */}
                                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                                    <button className="bg-white/90 backdrop-blur rounded-full p-3 shadow-xl hover:bg-white transition-colors">
                                        <Maximize2
                                            size={28}
                                            className="text-gray-800"
                                        />
                                    </button>
                                </div>

                                {/* Лупа */}
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

                            {/* Миниатюры */}
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

                            {/* Specifications */}
                            {Object.keys(product.specs).length > 0 && (
                                <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
                                    <h3 className="text-2xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
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

                            {/* Actions */}
                            <div className="space-y-4">
                                <button
                                    onClick={handleAddToCart}
                                    className={`w-full inline-flex items-center justify-center space-x-3 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
                                        addedToCart
                                            ? "bg-green-500 text-white shadow-[0_8px_32px_rgba(34,197,94,0.4)]"
                                            : !user
                                              ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-[0_8px_32px_rgba(75,85,99,0.4)] hover:shadow-[0_12px_40px_rgba(75,85,99,0.5)]"
                                              : "bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white  "
                                    } hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20`}
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
                                    <button className="flex-1 inline-flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 border-[#e31e24] text-[#e31e24] hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg">
                                        <Share2 size={20} />
                                        <span>Поделиться</span>
                                    </button>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
                                <h4 className="text-xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                                    Преимущества
                                </h4>
                                <ul className="space-y-4">
                                    {/* <li className="flex items-start space-x-4 group">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#e31e24] to-[#c41c20] rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                                            <Truck
                                                size={16}
                                                className="text-white"
                                            />
                                        </div>
                                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-1">
                                            Бесплатная доставка при заказе от 25
                                            000 ₽
                                        </span>
                                    </li> */}
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
                                className="max-w-none"
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