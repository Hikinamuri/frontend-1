import React from 'react';
import { Search, ShoppingCart, CreditCard, Package, CheckCircle, Phone, Mail, ArrowRight } from 'lucide-react';

const HowToOrder = () => {
  const steps = [
    {
      number: 1,
      icon: <Search size={40} />,
      title: 'Выбираем товары',
      description: 'Последовательно выберите интересующую Вас группу товаров. Для Вас откроется страница, где представлены товары с указанием цены, а также небольшой фотографией и несколькими наиболее важными характеристиками. Нажав на ссылку где указана модель товара, Вы сможете ознакомиться с самым подробным списком интересующих Вас характеристик.',
    },
    {
      number: 2,
      icon: <ShoppingCart size={40} />,
      title: 'Кладем товары в корзину',
      description: 'Выбрав понравившуюся модель, нажмите кнопку «Купить». Товар автоматически отправится в Вашу корзину. Вы можете положить в свою корзину любое количество товаров.',
    },
    {
      number: 3,
      icon: <CreditCard size={40} />,
      title: 'Ваша корзина',
      description: 'Для оформления заказа перейдите в раздел «Корзина». Просмотрите ее содержимое. Вы можете изменить количество товара в корзине или удалить то, что Вам не нужно.',
    },
    {
      number: 4,
      icon: <Package size={40} />,
      title: 'Оформляем заказ',
      description: 'Для завершения оформления заказа Вам необходимо нажать на кнопку «Оформить заказ», ввести свои контактные данные. После нажатия кнопки «Отправить заказ», он будет передан для оформления нашему консультанту, после чего он сам Вам перезвонит и уточнит все детали заказа.',
    },
  ];

  const tips = [
    {
      title: 'Зарегистрируйтесь',
      description: 'Создайте аккаунт, чтобы получить карту лояльности и накапливать бонусы',
    },
    {
      title: 'Используйте фильтры',
      description: 'Найдите идеальные очки быстрее с помощью фильтров по бренду, цене и стилю',
    },
    {
      title: 'Посетите салон',
      description: 'Приходите примерить очки в один из наших салонов и получите профессиональную консультацию',
    },
    {
      title: 'Следите за акциями',
      description: 'Подпишитесь на рассылку, чтобы первыми узнавать о скидках и спецпредложениях',
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" data-testid="how-to-order-title">
            Как сделать заказ
          </h1>
          <p className="text-xl md:text-2xl text-white/95">
            Простой и удобный процесс оформления заказа в 4 шага
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#9c0101]/10 to-blue-600/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#740000]/10 rounded-full blur-xl" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#740000] mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Процесс оформления заказа
          </h2>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-8 items-start group"
                data-testid={`step-${index}`}
              >
                {/* Number and Icon */}
                <div className="flex items-center space-x-6 lg:space-x-8 lg:w-1/4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-2xl text-white flex items-center justify-center text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-[0_8px_32px_rgba(156,1,1,0.4)]">
                      {step.number}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white" />
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-[0_8px_32px_rgba(59,130,246,0.4)]">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 group-hover:border-[#9c0101]/20">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="lg:hidden">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-[#740000] group-hover:text-[#9c0101] transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9c0101]/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#740000] mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Полезные советы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:-translate-y-3 text-center border border-gray-100 group"
                data-testid={`tip-${index}`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-xl text-white mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_4px_14px_0_rgba(156,1,1,0.3)]">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-[#740000] mb-3 group-hover:text-[#9c0101] transition-colors duration-300">
                  {tip.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#740000] via-[#9c0101] to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-blue-400 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-red-400 rounded-full animate-pulse delay-500" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
            Нужна помощь?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Наша команда всегда готова ответить на ваши вопросы и помочь с заказом
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+78435280708"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#9c0101] to-[#740000] text-white shadow-[0_8px_32px_rgba(156,1,1,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#9c0101]/20 hover:shadow-[0_12px_40px_rgba(156,1,1,0.5)] hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20 relative overflow-hidden"
            >
              <Phone size={20} className="relative z-10" />
              <span className="relative z-10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">+7 (843) 528-07-08</span>
            </a>
            <a
              href="mailto:info@egooptika.ru"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-[0_8px_32px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-blue-500/20 hover:shadow-[0_12px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-t before:from-transparent before:to-white before:opacity-0 hover:before:opacity-20 relative overflow-hidden"
            >
              <Mail size={20} className="relative z-10" />
              <span className="relative z-10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">info@egooptika.ru</span>
            </a>
          </div>
          
          {/* Additional Info */}
          <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center space-x-4">
              <CheckCircle size={24} className="text-green-400" />
              <p className="text-white/90">
                После оформления заказа наш консультант свяжется с вами для подтверждения и уточнения деталей
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToOrder;