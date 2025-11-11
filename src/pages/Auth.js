import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Calendar, CreditCard, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; 

const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    birthday: '',
    smsCode: '',
  });
  const [step, setStep] = useState(1); // 1: form, 2: sms, 3: success
  const [showLoyaltyCard, setShowLoyaltyCard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      const userData = {
        phone: formData.phone,
        name: formData.name || 'Пользователь',
        birthday: formData.birthday,
        loyaltyCardNumber: `**** **** **** ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      };
      login(userData); // Сохраняем пользователя
      if (!isLogin) {
        setShowLoyaltyCard(true);
      }
      // Редирект на профиль через 2 сек
      setTimeout(() => navigate('/profile'), 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ phone: '', name: '', birthday: '', smsCode: '' });
    setShowLoyaltyCard(false);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - Красивый градиент с объемом */}
      <section className="section-padding bg-gradient-to-br from-[#740000] via-[#9c0101] to-blue-900 text-white py-16 relative overflow-hidden">
        {/* Декоративные элементы для объема */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3)_2px,transparent_0)] bg-[length:60px_60px]"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.3)]" data-testid="auth-title">
            {isLogin ? 'Вход' : 'Регистрация'}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
            {isLogin
              ? 'Войдите в свой аккаунт'
              : 'Создайте аккаунт и получите карту лояльности'}
          </p>
        </div>
      </section>

      {/* Auth Form - Объемные элементы как конфетки */}
      <section className="section-padding bg-gradient-to-br from-white to-blue-50 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/80 relative overflow-hidden">
            {/* Блестящий верхний край */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            
            {/* Toggle Login/Register - 3D кнопки */}
            <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-2 mb-8 shadow-inner border border-gray-300/50">
              <button
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group ${
                  isLogin 
                    ? 'bg-gradient-to-r from-[#9c0101] to-[#740000] text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 bg-transparent'
                }`}
                data-testid="login-tab"
                style={{
                  boxShadow: isLogin ? 
                    '0 8px 25px rgba(156, 1, 1, 0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -4px 8px rgba(116, 0, 0, 0.3)' : 
                    'none'
                }}
              >
                {isLogin && (
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-xl"></div>
                )}
                <span className="relative z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Войти</span>
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-[#9c0101] to-[#740000] text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 bg-transparent'
                }`}
                data-testid="register-tab"
                style={{
                  boxShadow: !isLogin ? 
                    '0 8px 25px rgba(156, 1, 1, 0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -4px 8px rgba(116, 0, 0, 0.3)' : 
                    'none'
                }}
              >
                {!isLogin && (
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-xl"></div>
                )}
                <span className="relative z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Регистрация</span>
              </button>
            </div>

            {step === 3 ? (
              <div className="text-center py-12 animate-scale-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-full text-white mb-6 shadow-2xl" 
                  style={{
                    boxShadow: '0 8px 25px rgba(156, 1, 1, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)'
                  }}>
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#740000] mb-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
                  {isLogin ? 'Вы успешно вошли!' : 'Регистрация завершена!'}
                </h3>
                <p className="text-gray-600 mb-8">Добро пожаловать в Эгооптику! Перенаправляем в профиль...</p>
                <button
                  onClick={resetForm}
                  className="text-[#9c0101] font-semibold hover:underline transition-colors"
                >
                  Вернуться
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                        Номер телефона *
                      </label>
                      <div className="relative">
                        <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#9c0101] focus:outline-none focus:ring-2 focus:ring-[#9c0101]/20 transition-all duration-300 bg-white/80"
                          placeholder="+7 (___) ___-__-__"
                          data-testid="auth-phone-input"
                        />
                      </div>
                    </div>
                    {!isLogin && (
                      <>
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                            ФИО *
                          </label>
                          <div className="relative">
                            <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#9c0101] focus:outline-none focus:ring-2 focus:ring-[#9c0101]/20 transition-all duration-300 bg-white/80"
                              placeholder="Иван Иванов"
                              data-testid="auth-name-input"
                            />
                          </div>
                        </div>
                        {/* Birthday */}
                        <div>
                          <label htmlFor="birthday" className="block text-sm font-semibold text-gray-800 mb-2">
                            Дата рождения
                          </label>
                          <div className="relative">
                            <Calendar size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="date"
                              id="birthday"
                              name="birthday"
                              value={formData.birthday}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#9c0101] focus:outline-none focus:ring-2 focus:ring-[#9c0101]/20 transition-all duration-300 bg-white/80"
                              data-testid="auth-birthday-input"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {step === 2 && (
                  <div>
                    <label htmlFor="smsCode" className="block text-sm font-semibold text-gray-800 mb-2">
                      Код из SMS
                    </label>
                    <input
                      type="text"
                      id="smsCode"
                      name="smsCode"
                      value={formData.smsCode}
                      onChange={handleChange}
                      required
                      maxLength="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#9c0101] focus:outline-none focus:ring-2 focus:ring-[#9c0101]/20 transition-all duration-300 text-center text-2xl tracking-widest font-mono bg-white/80"
                      placeholder="______"
                      data-testid="auth-sms-input"
                    />
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Мы отправили код на {formData.phone}
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#9c0101] to-[#740000] text-white font-bold rounded-xl transition-all duration-300 relative overflow-hidden group hover:scale-[1.02]"
                  style={{
                    boxShadow: '0 8px 25px rgba(156, 1, 1, 0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -4px 8px rgba(116, 0, 0, 0.3)'
                  }}
                  data-testid="auth-submit-btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 group-hover:to-white/30 rounded-xl transition-all duration-300"></div>
                  <span className="relative z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    {step === 1
                      ? isLogin
                        ? 'Получить код'
                        : 'Зарегистрироваться'
                      : 'Подтвердить'}
                  </span>
                </button>
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-3 text-[#9c0101] font-semibold hover:text-[#740000] border border-gray-300 rounded-xl hover:border-[#9c0101] transition-all duration-300 bg-white/80"
                  >
                    Изменить номер
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Loyalty Card - Стильная карточка */}
      {showLoyaltyCard && (
        <section className="section-padding bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#740000] mb-8 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
              Ваша карта лояльности
            </h2>
            <div className="relative animate-scale-in" data-testid="loyalty-card">
              <div className="bg-gradient-to-br from-[#740000] via-[#9c0101] to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden"
                style={{
                  boxShadow: '0 15px 35px rgba(116, 0, 0, 0.4), inset 0 2px 8px rgba(255,255,255,0.2)'
                }}>
                {/* Декоративные элементы карты */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 shadow-lg">
                      <span className="text-[#9c0101] font-bold text-xl">Э</span>
                    </div>
                    <p className="text-white font-bold text-lg">Эгооптика</p>
                  </div>
                  <CreditCard size={36} className="text-white/90" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-sm text-white/80 mb-1">Владелец</p>
                    <p className="text-lg font-bold">{formData.name || 'Иван Иванов'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/80 mb-1">Номер карты</p>
                    <p className="text-xl font-mono tracking-wider">**** **** **** {Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-white/80 mb-1">Бонусы</p>
                      <p className="text-2xl font-bold text-white">0 ₽</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/80">Скидка</p>
                      <p className="text-xl font-bold text-white">5%</p>
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
          </div>
        </section>
      )}

      {/* Benefits Section - Стильные карточки */}
      <section className="section-padding bg-gradient-to-br from-white to-blue-50 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#740000] mb-12 [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]">
            Преимущества регистрации
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80"
              style={{
                boxShadow: '0 8px 25px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
              }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-full text-white mb-4 shadow-lg">
                <CreditCard size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#740000] mb-3">Карта лояльности</h3>
              <p className="text-gray-600">Накапливайте бонусы и получайте скидки</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80"
              style={{
                boxShadow: '0 8px 25px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
              }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full text-white mb-4 shadow-lg">
                <User size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#740000] mb-3">Личный кабинет</h3>
              <p className="text-gray-600">Отслеживайте заказы и историю покупок</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/80"
              style={{
                boxShadow: '0 8px 25px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
              }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-full text-white mb-4 shadow-lg">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#740000] mb-3">Спецпредложения</h3>
              <p className="text-gray-600">Первыми узнавайте о скидках и акциях</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;