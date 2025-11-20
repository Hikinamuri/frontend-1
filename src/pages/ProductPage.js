import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    Heart,
    Share2,
    Check,
    ArrowLeft,
    AlertCircle,
    Star,
    Shield,
    Truck,
    Award,
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (err) {
                console.error("Ошибка загрузки товара:", err);
                setError(`Ошибка загрузки товара: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

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
            price: parseInt(wooProduct.price || 0),
            description: wooProduct.description || "Описание отсутствует.",
            images: wooProduct.images?.map((img) => img.src) || [],
            specs: attributes,
            inStock: wooProduct.stock_status === "instock",
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#9c0101] mx-auto mb-4"></div>
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
                        to="/frames"
                        className="px-6 py-2 bg-[#9c0101] text-white rounded-lg hover:bg-[#740000] transition-colors inline-block"
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

    return (
        <div className="min-h-screen pt-20 bg-white">
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Back Button */}
                    <Link
                        to="/frames"
                        className="inline-flex items-center space-x-2 text-[#9c0101] hover:text-[#740000] transition-colors duration-300 mb-8 group"
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
                            <div className="aspect-square bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent opacity-60 pointer-events-none" />
                                <img
                                    src={
                                        product.images[selectedImage] ||
                                        "https://via.placeholder.com/400?text=No+Image"
                                    }
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    data-testid="product-main-image"
                                />
                                <div className="absolute inset-0 rounded-3xl ring-2 ring-[#9c0101]/0 group-hover:ring-[#9c0101]/30 transition-all duration-500 pointer-events-none" />
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
                                            className={`aspect-square rounded-2xl overflow-hidden ring-2 transition-all duration-300 group/thumb relative
                                            ${
                                                selectedImage === index
                                                    ? "ring-[#9c0101] shadow-xl scale-105 z-10"
                                                    : "ring-gray-200 hover:ring-[#9c0101]/50 hover:shadow-lg hover:scale-105"
                                            }`}
                                        >
                                            {/* Фон с лёгким градиентом */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

                                            <img
                                                src={image}
                                                alt={`${product.name} — вид ${
                                                    index + 1
                                                }`}
                                                className="w-full h-full object-contain p-4 relative z-10 transform group-hover/thumb:scale-110 transition-transform duration-300"
                                            />

                                            {/* Красная подсветка при выборе */}
                                            {selectedImage === index && (
                                                <div className="absolute inset-0 ring-4 ring-[#9c0101]/20 rounded-2xl" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            <div>
                                <p className="text-sm text-[#9c0101] font-semibold mb-3 bg-[#9c0101]/10 px-3 py-1 rounded-full inline-block">
                                    {product.brand}
                                </p>
                                <h1
                                    className="text-4xl md:text-5xl font-bold text-[#740000] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                                    data-testid="product-title"
                                >
                                    {product.name}
                                </h1>

                                <p className="text-5xl font-bold text-[#9c0101] mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
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
                                    <h3 className="text-2xl font-bold text-[#740000] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                                        Характеристики
                                    </h3>
                                    <div className="space-y-4">
                                        {Object.entries(product.specs).map(
                                            ([key, value]) => (
                                                <div
                                                    key={key}
                                                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0 group"
                                                >
                                                    <span className="text-gray-600 group-hover:text-[#740000] transition-colors duration-300">
                                                        {key}:
                                                    </span>
                                                    <span className="font-semibold text-[#740000] group-hover:text-[#9c0101] transition-colors duration-300">
                                                        {value}
                                                    </span>
                                                </div>
                                            )
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
                                            : "bg-gradient-to-r from-[#9c0101] to-[#740000] text-white shadow-[0_8px_32px_rgba(156,1,1,0.4)] hover:shadow-[0_12px_40px_rgba(156,1,1,0.5)]"
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
                                                ? "bg-[#9c0101] border-[#9c0101] text-white shadow-[0_4px_16px_rgba(156,1,1,0.3)]"
                                                : "border-[#9c0101] text-[#9c0101] hover:bg-[#9c0101] hover:text-white"
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
                                    <button className="flex-1 inline-flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 border-[#9c0101] text-[#9c0101] hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg">
                                        <Share2 size={20} />
                                        <span>Поделиться</span>
                                    </button>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
                                <h4 className="text-xl font-bold text-[#740000] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                                    Преимущества
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start space-x-4 group">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                                            <Truck
                                                size={16}
                                                className="text-white"
                                            />
                                        </div>
                                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 pt-1">
                                            Бесплатная доставка при заказе от 25
                                            000 ₽
                                        </span>
                                    </li>
                                    <li className="flex items-start space-x-4 group">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
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
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
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
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
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

            <section className="py-20 bg-gradient-to-br from-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-[#740000] mb-12 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                        Похожие товары
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <Link
                                key={i}
                                to={`/product/${parseInt(id) + i}`}
                                className="group block bg-white rounded-3xl overflow-hidden 
                     border border-gray-200/80 
                     shadow-lg hover:shadow-2xl 
                     ring-1 ring-black/5 
                     transition-all duration-500 
                     hover:-translate-y-3 hover:border-[#9c0101]/30"
                            >
                                {/* Изображение — чисто белый фон, но с контрастом */}
                                <div className="aspect-square bg-white p-10 relative">
                                    <img
                                        src={
                                            product.images[
                                                i % product.images.length
                                            ] ||
                                            "https://via.placeholder.com/300?text=Product"
                                        }
                                        alt={`Похожий товар ${i}`}
                                        className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                {/* Информация */}
                                <div className="p-6 bg-white">
                                    <p className="text-sm text-[#9c0101] font-semibold mb-2">
                                        {product.brand}
                                    </p>
                                    <h3 className="text-xl font-bold text-[#740000] mb-3 group-hover:text-[#9c0101] transition-colors duration-300 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-2xl font-bold text-[#740000] group-hover:text-[#9c0101] transition-colors duration-300">
                                        {(
                                            product.price +
                                            i * 1000
                                        ).toLocaleString("ru-RU")}{" "}
                                        ₽
                                    </p>
                                </div>

                                {/* Тонкая красная линия-подчёркивание при ховере */}
                                <div className="h-1 bg-gradient-to-r from-[#9c0101] to-[#740000] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
