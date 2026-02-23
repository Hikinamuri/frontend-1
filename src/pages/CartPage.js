import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    Trash2,
    Minus,
    Plus,
    ArrowLeft,
    CreditCard,
    Package,
    AlertCircle,
    Truck,
    Shield,
    Gift,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const CartPage = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        totalPrice: rawTotal,
        totalItems,
    } = useCart();
    const { user, isAuthenticated } = useAuth(); // ← берём isAuthenticated и user
    const navigate = useNavigate();

    const [discountData, setDiscountData] = useState({
        discountPercent: 0,
        discountAmount: 0,
        welcomeBonus: 0,
        finalTotal: rawTotal,
        birthdayDiscountActive: false,
    });

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            navigate("/auth?redirect=/checkout");
            return;
        }

        try {
            await fetch("/wp-json/custom/v1/confirm-order", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Ошибка подтверждения заказа:", error);
        }

        navigate("/checkout");
    };

    const {
        discountPercent,
        discountAmount,
        welcomeBonus,
        finalTotal,
        birthdayDiscountActive,
    } = discountData;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-blue-50 to-white">
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#e31e24] to-[#c41c20] rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_8px_32px_rgba(227,30,36,0.3)]">
                            <ShoppingCart size={48} className="text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#c41c20] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                            Корзина пуста
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Добавьте товары из каталога, чтобы продолжить
                            покупки.
                        </p>
                        <Link
                            to="/frames"
                            className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
                        >
                            <ArrowLeft size={20} className="relative z-10" />
                            <span className="relative z-10">
                                Вернуться в каталог
                            </span>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    useEffect(() => {
        if (!isAuthenticated || cart.length === 0) {
            setDiscountData({
                discountPercent: 0,
                discountAmount: 0,
                welcomeBonus: 0,
                finalTotal: rawTotal,
                birthdayDiscountActive: false,
            });
            return;
        }

        const fetchDiscount = async () => {
            try {
                const response = await fetch(
                    "/wp-json/custom/v1/calculate-discount",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            cart_total: rawTotal,
                        }),
                    },
                );

                const data = await response.json();

                setDiscountData({
                    discountPercent: data.discountPercent,
                    discountAmount: data.discountAmount,
                    welcomeBonus: data.welcomeBonus,
                    finalTotal: data.finalTotal,
                    birthdayDiscountActive: data.birthdayDiscountActive,
                });
            } catch (error) {
                console.error("Ошибка расчёта скидки:", error);
            }
        };

        fetchDiscount();
    }, [cart, rawTotal, isAuthenticated]);

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-blue-50 to-white">
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                        <Link
                            to="/frames"
                            className="inline-flex items-center space-x-2 text-[#e31e24] hover:text-[#c41c20] transition-colors duration-300 group"
                        >
                            <ArrowLeft
                                size={20}
                                className="group-hover:-translate-x-1 transition-transform duration-300"
                            />
                            <span className="font-semibold">
                                Назад к каталогу
                            </span>
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#c41c20] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                            Корзина ({totalItems}{" "}
                            {totalItems === 1
                                ? "товар"
                                : totalItems < 5
                                  ? "товара"
                                  : "товаров"}
                            )
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => {
                                const itemPrice = Number(item.price || 0);
                                const itemTotal =
                                    itemPrice * (item.quantity || 0);
                                const imageSrc =
                                    item.images?.[0] ||
                                    item.image ||
                                    "https://via.placeholder.com/100x100?text=Очки";

                                return (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100 hover:border-[#e31e24]/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] group"
                                    >
                                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                                            <div className="flex-shrink-0 bg-white">
                                                <img
                                                    src={imageSrc}
                                                    alt={item.name}
                                                    className="w-24 h-24 object-contain bg-white rounded-2xl p-3 border border-gray-200 group-hover:border-[#e31e24]/50 transition-colors duration-300"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-[#c41c20] mb-2 group-hover:text-[#e31e24] transition-colors duration-300">
                                                    {item.name}
                                                </h3>
                                                <p className="text-[#e31e24] font-semibold mb-3">
                                                    {item.brand || "—"}
                                                </p>
                                                <p className="text-2xl font-bold text-[#c41c20]">
                                                    {itemPrice.toLocaleString(
                                                        "ru-RU",
                                                    )}{" "}
                                                    ₽
                                                </p>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-3 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-2 border border-gray-200">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                (item.quantity ||
                                                                    0) - 1,
                                                            )
                                                        }
                                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#e31e24] hover:bg-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        disabled={
                                                            (item.quantity ||
                                                                0) <= 1
                                                        }
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="font-bold text-[#c41c20] text-lg w-8 text-center min-w-[2rem]">
                                                        {item.quantity || 0}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                (item.quantity ||
                                                                    0) + 1,
                                                            )
                                                        }
                                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#e31e24] hover:bg-white rounded-xl transition-all duration-300"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                    className="w-10 h-10 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-xl"
                                                    title="Удалить"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="text-right lg:text-left">
                                                <p className="text-2xl font-bold text-[#e31e24]">
                                                    {itemTotal.toLocaleString(
                                                        "ru-RU",
                                                    )}{" "}
                                                    ₽
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100 sticky top-24">
                                <h2 className="text-2xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center">
                                    <Package
                                        size={24}
                                        className="mr-3 text-[#e31e24]"
                                    />
                                    Итог заказа
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-lg">
                                        <span className="text-gray-600">
                                            Товары:
                                        </span>
                                        <span className="font-semibold text-[#c41c20]">
                                            {totalItems}
                                        </span>
                                    </div>

                                    {user?.totalSpent >= 0 && (
                                        <div className="flex justify-between text-base text-gray-700">
                                            <span>Накоплено (без линз):</span>
                                            <span>
                                                {user.totalSpent.toLocaleString(
                                                    "ru-RU",
                                                )}{" "}
                                                ₽
                                            </span>
                                        </div>
                                    )}

                                    {discountPercent > 0 && (
                                        <div className="flex justify-between text-base font-medium text-green-700">
                                            <span>{discountReason}</span>
                                            <span>
                                                -{discountPercent}% (–
                                                {discountAmount.toLocaleString(
                                                    "ru-RU",
                                                )}{" "}
                                                ₽)
                                            </span>
                                        </div>
                                    )}

                                    {welcomeBonus > 0 && (
                                        <div className="flex justify-between text-base font-medium text-green-700">
                                            <span>Приветственный бонус</span>
                                            <span>–500 ₽</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-xl font-bold text-[#c41c20] pt-4 border-t border-gray-200">
                                        <span>К оплате:</span>
                                        <span className="text-[#e31e24]">
                                            {finalTotal.toLocaleString("ru-RU")}{" "}
                                            ₽
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className={`w-full inline-flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden ${
                                        isAuthenticated
                                            ? "bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white hover:-translate-y-1 hover:scale-105"
                                            : "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-[0_4px_16px_rgba(107,114,128,0.3)] cursor-not-allowed"
                                    }`}
                                    disabled={!isAuthenticated}
                                >
                                    <CreditCard
                                        size={24}
                                        className="relative z-10"
                                    />
                                    <span className="relative z-10 text-lg">
                                        {isAuthenticated
                                            ? "Оформить заказ"
                                            : "Войдите для оформления"}
                                    </span>
                                    {!isAuthenticated && (
                                        <AlertCircle
                                            size={24}
                                            className="relative z-10 ml-1"
                                        />
                                    )}
                                </button>

                                {isAuthenticated && welcomeBonus > 0 && (
                                    <p className="text-sm text-green-600 mt-3 text-center">
                                        При оформлении будет использован бонус
                                        500 ₽
                                    </p>
                                )}

                                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                                        <Truck
                                            size={16}
                                            className="text-[#e31e24] flex-shrink-0"
                                        />
                                        <span>
                                            Бесплатная доставка от 25 000 ₽
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                                        <Shield
                                            size={16}
                                            className="text-[#e31e24] flex-shrink-0"
                                        />
                                        <span>Возврат в течение 14 дней</span>
                                    </div>
                                    {birthdayDiscountActive && (
                                        <div className="flex items-center space-x-3 text-sm text-green-600 font-medium">
                                            <Gift
                                                size={16}
                                                className="flex-shrink-0"
                                            />
                                            <span>
                                                Действует скидка ко дню
                                                рождения!
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CartPage;
