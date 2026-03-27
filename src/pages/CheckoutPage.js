import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  Store,
  User,
  Mail,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const API = process.env.REACT_APP_API_URL || "https://egooptika.ru";

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    pickupPoint: "ershov",
    paymentType: "card",
    comment: "",
  });

  // Отдельные поля для заказа (не связаны с пользователем)
  const [orderFormData, setOrderFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const finalTotal = totalPrice;

  // Имя пользователя из профиля (неизменяемое)
  const userName = user?.name || user?.display_name || user?.email?.split('@')[0] || 'Пользователь';

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["firstName", "lastName", "email", "phone"].includes(name)) {
      setOrderFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setOrderData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!orderFormData.firstName.trim()) newErrors.firstName = "Укажите имя";
    if (!orderFormData.lastName.trim()) newErrors.lastName = "Укажите фамилию";
    if (!orderFormData.email.trim()) newErrors.email = "Укажите email";
    else if (!/\S+@\S+\.\S+/.test(orderFormData.email)) newErrors.email = "Некорректный email";
    if (!orderFormData.phone.trim()) newErrors.phone = "Укажите телефон";
    else if (!/^\+?\d{10,15}$/.test(orderFormData.phone.replace(/\D/g, ""))) newErrors.phone = "Некорректный телефон";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !token) {
      navigate("/auth?redirect=/checkout");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const lineItems = cart.map((item) => ({
        product_id: parseInt(item.id),
        quantity: item.quantity || 1,
      }));

      const pickupPoints = {
        ershov: "Николая Ершова, 47",
        meridian: "Меридианная, 4",
      };
      const pickupAddress = pickupPoints[orderData.pickupPoint] || pickupPoints.ershov;

      const payload = {
        payment_method: orderData.paymentType === "card" ? "bacs" : "cod",
        payment_method_title: orderData.paymentType === "card" ? "Банковской картой онлайн" : "Наличными при получении",
        billing: {
          first_name: orderFormData.firstName.trim(),
          last_name: orderFormData.lastName.trim(),
          email: orderFormData.email.trim(),
          phone: orderFormData.phone.trim(),
          address_1: pickupAddress,
          city: "Казань",
          state: "TA",
          postcode: "420000",
          country: "RU",
        },
        shipping: {
          first_name: orderFormData.firstName.trim(),
          last_name: orderFormData.lastName.trim(),
          address_1: pickupAddress,
          city: "Казань",
          state: "TA",
          postcode: "420000",
          country: "RU",
        },
        line_items: lineItems,
        customer_note: orderData.comment || "",
        meta_data: [
          { key: "pickup_point", value: orderData.pickupPoint },
          { key: "_created_from", value: "frontend-react" },
          { key: "customer_name", value: `${orderFormData.firstName} ${orderFormData.lastName}` },
          { key: "customer_email", value: orderFormData.email },
          { key: "customer_phone", value: orderFormData.phone },
          // Сохраняем данные пользователя для связи
          { key: "user_login", value: userName },
          { key: "user_email", value: user?.email || "" },
        ],
      };

      console.log("Отправляемый payload:", JSON.stringify(payload, null, 2));

      const res = await fetch(`${API}/wp-json/custom/v1/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Ответ сервера:", data);
        throw new Error(data.message || data.code || `Ошибка ${res.status}`);
      }

      setOrderId(data.order_id);
      setOrderSuccess(true);
      clearCart();
      
    } catch (err) {
      console.error("Ошибка оформления:", err);
      setError(err.message || "Не удалось оформить заказ. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#c41c20] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Авторизация требуется
          </h1>
          <p className="text-gray-600 mb-6">Войдите для оформления заказа.</p>
          <Link
            to="/auth"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
          >
            <User size={20} className="relative z-10" />
            <span className="relative z-10">Войти в аккаунт</span>
          </Link>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_8px_32px_rgba(34,197,94,0.4)]">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#c41c20] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Заказ оформлен!
          </h1>
          <p className="text-gray-600 mb-2">Номер заказа: #{orderId}</p>
          <p className="text-xl font-bold text-[#e31e24] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            {finalTotal.toLocaleString("ru-RU")} ₽
          </p>
          <p className="text-gray-600 mb-6 text-sm">
            С вами свяжется наш менеджер для подтверждения заказа
          </p>
          <Link
            to="/profile"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10">Перейти в профиль</span>
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const pickupPoints = [
    {
      id: "ershov",
      name: "Салон на Ершова",
      address: "г. Казань, Николая Ершова, 47",
      phone: "+7 (951) 896-71-17",
      hours: "Пн-Пт: 10:00 — 20:00, Сб: 10:00 — 18:00",
    },
    {
      id: "meridian",
      name: "Салон на Меридианной",
      address: "г. Казань, Меридианная, 4",
      phone: "+7 (939) 809-52-80",
      hours: "Пн-Пт: 9:00 — 20:00, Сб: 10:00 — 19:00",
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-blue-50 to-white">
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <Link
              to="/cart"
              className="inline-flex items-center space-x-2 text-[#e31e24] hover:text-[#c41c20] transition-colors duration-300 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-semibold">Вернуться в корзину</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#c41c20] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
              Оформление заказа
            </h1>
          </div>

          {/* Информация о пользователе (неизменяемая) */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <User size={20} className="text-[#e31e24]" />
              <span className="text-sm text-gray-700">
                Вы авторизованы как: <span className="font-bold text-[#c41c20]">{userName}</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-8">
              Данные для заказа можно ввести ниже, они не изменят ваш профиль
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Товары */}
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center">
                <ShoppingCart size={24} className="mr-3 text-[#e31e24]" />
                Ваш заказ ({totalItems}{" "}
                {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"})
              </h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0 group"
                  >
                    <div className="flex-1">
                      <span className="text-gray-700 group-hover:text-[#c41c20] transition-colors duration-300">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">×{item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#c41c20] group-hover:text-[#e31e24] transition-colors duration-300">
                      {(Number(item.price || 0) * (item.quantity || 0)).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200">
                <span className="text-[#c41c20]">Итого к оплате:</span>
                <span className="text-[#e31e24] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>

            {/* Данные для заказа (отдельные поля) */}
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center">
                <User size={24} className="mr-3 text-[#e31e24]" />
                Данные получателя
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Эти данные будут использованы только для этого заказа
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя получателя *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={orderFormData.firstName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/20 outline-none transition-all ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Иван"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Фамилия получателя *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={orderFormData.lastName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/20 outline-none transition-all ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Иванов"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email для заказа *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={orderFormData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 p-3 border rounded-xl focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/20 outline-none transition-all ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="example@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон для заказа *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={orderFormData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 p-3 border rounded-xl focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/20 outline-none transition-all ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Пункт самовывоза */}
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center">
                <Store size={24} className="mr-3 text-[#e31e24]" />
                Пункт самовывоза
              </h3>
              <div className="space-y-4">
                {pickupPoints.map((point) => (
                  <label key={point.id} className="flex items-start space-x-4 cursor-pointer group">
                    <input
                      type="radio"
                      name="pickupPoint"
                      value={point.id}
                      checked={orderData.pickupPoint === point.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-1 ${
                        orderData.pickupPoint === point.id
                          ? "border-[#e31e24] bg-[#e31e24]"
                          : "border-gray-300 group-hover:border-[#e31e24]"
                      }`}
                    >
                      {orderData.pickupPoint === point.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#c41c20] group-hover:text-[#e31e24] transition-colors duration-300">
                        {point.name}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">{point.address}</p>
                      <p className="text-gray-500 text-sm">{point.phone}</p>
                      <p className="text-gray-500 text-sm">{point.hours}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Способ оплаты */}
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center">
                <CreditCard size={24} className="mr-3 text-[#e31e24]" />
                Способ оплаты
              </h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-4 cursor-pointer group">
                  <input
                    type="radio"
                    name="paymentType"
                    value="card"
                    checked={orderData.paymentType === "card"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      orderData.paymentType === "card" ? "border-[#e31e24] bg-[#e31e24]" : "border-gray-300 group-hover:border-[#e31e24]"
                    }`}
                  >
                    {orderData.paymentType === "card" && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-gray-700 group-hover:text-[#c41c20] transition-colors duration-300">
                    Банковской картой онлайн
                  </span>
                </label>

                <label className="flex items-center space-x-4 cursor-pointer group">
                  <input
                    type="radio"
                    name="paymentType"
                    value="cash"
                    checked={orderData.paymentType === "cash"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      orderData.paymentType === "cash" ? "border-[#e31e24] bg-[#e31e24]" : "border-gray-300 group-hover:border-[#e31e24]"
                    }`}
                  >
                    {orderData.paymentType === "cash" && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-gray-700 group-hover:text-[#c41c20] transition-colors duration-300">
                    Наличными при получении
                  </span>
                </label>
              </div>
            </div>

            {/* Комментарий */}
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-[#c41c20] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center">
                <Phone size={24} className="mr-3 text-[#e31e24]" />
                Комментарий к заказу
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Комментарий (необязательно)
                  </label>
                  <textarea
                    name="comment"
                    placeholder="Например, удобное время для звонка или особые пожелания..."
                    value={orderData.comment}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-4 border border-gray-300 rounded-2xl focus:border-[#e31e24] focus:ring-2 focus:ring-[#e31e24]/20 outline-none transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || totalItems === 0}
              className={`w-full inline-flex items-center justify-center space-x-3 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
                isSubmitting || totalItems === 0
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-[0_4px_16px_rgba(107,114,128,0.3)] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#e31e24] to-[#c41c20] text-white hover:-translate-y-1 hover:scale-105"
              } before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white relative z-10"></div>
                  <span className="relative z-10">Оформляем заказ...</span>
                </>
              ) : (
                <>
                  <CreditCard size={24} className="relative z-10" />
                  <span className="relative z-10">
                    Подтвердить заказ • {totalPrice.toLocaleString("ru-RU")} ₽
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;