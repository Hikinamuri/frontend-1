import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft, CreditCard, Package, AlertCircle, Truck, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_8px_32px_rgba(156,1,1,0.3)]">
              <ShoppingCart size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#740000] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
              Корзина пуста
            </h1>
            <p className="text-xl text-gray-600 mb-8">Добавьте товары из каталога, чтобы продолжить покупки.</p>
            <Link
              to="/frames"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#9c0101] to-[#740000] text-white shadow-[0_8px_32px_rgba(156,1,1,0.4)] hover:shadow-[0_12px_40px_rgba(156,1,1,0.5)] hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20 relative overflow-hidden"
            >
              <ArrowLeft size={20} className="relative z-10" />
              <span className="relative z-10">Вернуться в каталог</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-blue-50 to-white">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <Link
              to="/frames"
              className="inline-flex items-center space-x-2 text-[#9c0101] hover:text-[#740000] transition-colors duration-300 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-semibold">Назад к каталогу</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#740000] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
              Корзина ({totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'})
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => {
                const itemPrice = Number(item.price || 0);
                const itemTotal = itemPrice * (item.quantity || 0);
                const imageSrc = item.images?.[0] || item.image || 'https://via.placeholder.com/100x100?text=Очки';
                
                return (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100 hover:border-[#9c0101]/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] group"
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={imageSrc}
                          alt={item.name}
                          className="w-24 h-24 object-contain rounded-2xl bg-gradient-to-br from-gray-50 to-white p-3 border border-gray-200 group-hover:border-[#9c0101]/50 transition-colors duration-300"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#740000] mb-2 group-hover:text-[#9c0101] transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="text-[#9c0101] font-semibold mb-3">{item.brand}</p>
                        <p className="text-2xl font-bold text-[#740000]">{itemPrice.toLocaleString('ru-RU')} ₽</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-2 border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#9c0101] hover:bg-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={(item.quantity || 0) <= 1}
                          >
                            <Minus size={18} />
                          </button>
                          <span className="font-bold text-[#740000] text-lg w-8 text-center min-w-[2rem]">
                            {item.quantity || 0}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#9c0101] hover:bg-white rounded-xl transition-all duration-300"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 rounded-xl"
                          title="Удалить"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right lg:text-left">
                        <p className="text-2xl font-bold text-[#9c0101]">{itemTotal.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold text-[#740000] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center">
                  <Package size={24} className="mr-3 text-[#9c0101]" />
                  Итог заказа
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Товары:</span>
                    <span className="font-semibold text-[#740000]">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-[#740000] pt-4 border-t border-gray-200">
                    <span>Общая сумма:</span>
                    <span className="text-[#9c0101]">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className={`w-full inline-flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden ${
                    user
                      ? 'bg-gradient-to-r from-[#9c0101] to-[#740000] text-white shadow-[0_8px_32px_rgba(156,1,1,0.4)] hover:shadow-[0_12px_40px_rgba(156,1,1,0.5)] hover:-translate-y-1 hover:scale-105'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-[0_4px_16px_rgba(107,114,128,0.3)] cursor-not-allowed'
                  } before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20`}
                  disabled={!user}
                >
                  <CreditCard size={24} className="relative z-10" />
                  <span className="relative z-10 text-lg">
                    {user ? 'Оформить заказ' : 'Войдите для оформления'}
                  </span>
                  {!user && <AlertCircle size={24} className="relative z-10 ml-1" />}
                </button>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Truck size={16} className="text-[#9c0101] flex-shrink-0" />
                    <span>Бесплатная доставка от 25 000 ₽</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Shield size={16} className="text-[#9c0101] flex-shrink-0" />
                    <span>Возврат в течение 14 дней</span>
                  </div>
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