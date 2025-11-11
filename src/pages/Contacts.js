import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, User, MessageCircle } from 'lucide-react';
import Ershowa from '@/assets/salons/ershova.webp';
import Meridian from '@/assets/salons/meridian.webp';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const salons = [
    {
      name: 'Салон на Ершова',
      address: 'г. Казань, Николая Ершова, 47',
      phones: ['+7 (843) 528-07-08', '+7 (843) 272-91-65'],
      hours: 'Пн-Пт: 10:00 — 20:00 Сб: 10:00 — 18:00 Вс: выходной',
      image: Ershowa
    },
    {
      name: 'Салон на Меридианной',
      address: 'г. Казань, Меридианная, 4',
      phones: ['+7 (843) 528-07-08'],
      hours: 'Пн-Пт: 9:00 — 20:00 Сб: 10:00 — 19:00 Вс: выходной',
      image: Meridian
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#740000] via-[#9c0101] to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3)_2px,transparent_0)] bg-[length:60px_60px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#9c0101] rounded-full opacity-10 blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" data-testid="contacts-title">
            Контакты
          </h1>
          <p className="text-xl md:text-2xl text-white/95">
            Мы всегда рады помочь вам. Свяжитесь с нами удобным способом.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#9c0101]/10 to-blue-600/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#740000]/10 rounded-full blur-xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#740000] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  Оставить заявку
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Если у вас возникли вопросы, оставьте заявку и наши сотрудники свяжутся с вами
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-8 border border-gray-100">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-2xl text-white mb-6 transform scale-110 transition-transform duration-300">
                      <Send size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#740000] mb-2">Спасибо!</h3>
                    <p className="text-gray-600">Мы свяжемся с вами в ближайшее время</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#9c0101] focus:ring-2 focus:ring-[#9c0101]/20 outline-none transition-all duration-300"
                        placeholder="Иван Иванов"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Ваш телефон *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#9c0101] focus:ring-2 focus:ring-[#9c0101]/20 outline-none transition-all duration-300"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#9c0101] to-[#740000] text-white shadow-[0_8px_32px_rgba(156,1,1,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#9c0101]/20 hover:shadow-[0_12px_40px_rgba(156,1,1,0.5)] hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20 relative overflow-hidden"
                    >
                      <span className="relative z-10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">Отправить заявку</span>
                      <Send size={20} className="relative z-10" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#740000] mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  Наши адреса
                </h2>
                
                {/* Salons List */}
                <div className="space-y-6">
                  {salons.map((salon, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">
                      <h3 className="text-xl font-bold text-[#740000] mb-4">{salon.name}</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin size={20} className="text-[#9c0101] mt-1 flex-shrink-0" />
                          <p className="text-gray-700">{salon.address}</p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Phone size={20} className="text-[#9c0101] mt-1 flex-shrink-0" />
                          <div>
                            {salon.phones.map((phone, phoneIndex) => (
                              <a
                                key={phoneIndex}
                                href={`tel:${phone.replace(/\s/g, '')}`}
                                className="text-gray-700 hover:text-[#9c0101] transition-colors duration-300 block"
                              >
                                {phone}
                              </a>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Clock size={20} className="text-[#9c0101] mt-1 flex-shrink-0" />
                          <p className="text-gray-700">{salon.hours}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Manager Contact */}
                <div className="bg-gradient-to-br from-[#740000] to-[#9c0101] rounded-2xl p-6 text-white shadow-[0_10px_40px_rgba(116,0,0,0.3)] mt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <User size={24} className="text-white/80" />
                    <h3 className="text-lg font-bold">Менеджер интернет-магазина:</h3>
                  </div>
                  <a
                    href="https://wa.me/79398074779"
                    className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-300"
                  >
                    <MessageCircle size={20} />
                    <span>+7 (939) 807-47-79</span>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-full">WhatsApp Telegram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9c0101]/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#740000] mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Реквизиты продавца
          </h2>
          
          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#740000] mb-2">Индивидуальный предприниматель</h3>
                  <p className="text-gray-700">Фаизов Айдар Тафкилевич</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#740000] mb-2">ОГРНИП/ИНН</h3>
                  <p className="text-gray-700">30701810900000000767 / 165502021815</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#740000] mb-2">E-mail</h3>
                  <a href="mailto:info@egooptika.ru" className="text-gray-700 hover:text-[#9c0101] transition-colors duration-300">
                    info@egooptika.ru
                  </a>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#740000] mb-2">Почтовый адрес</h3>
                  <p className="text-gray-700">420029, РТ г. Казань ул. Сибирский тракт 24/7</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#740000] mb-2">Физический адрес</h3>
                  <p className="text-gray-700">420029, РТ г. Казань ул. Сибирский тракт 24/7</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#740000] mb-2">Юридический адрес</h3>
                  <p className="text-gray-700">420029, РТ г. Казань ул. Сибирский тракт 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;