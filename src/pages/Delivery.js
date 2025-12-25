import React from 'react';
import { Package, CreditCard, Truck, Clock, CheckCircle, MapPin, Phone, Mail, Shield, AlertCircle } from 'lucide-react';

const Delivery = () => {
  const deliveryOptions = [
    {
      icon: <Package size={32} />,
      title: 'Самовывоз из Казани',
      description: 'Бесплатно из наших салонов',
      details: 'Готово к выдаче в течение 1-2 часов',
      features: [
        'г. Казань, Николая Ершова, 47',
        'г. Казань, Меридианная, 4',
        // 'Бронирование по телефонам: +7 (843) 528-07-08, +7 (843) 203-57-00'
      ]
    },
    {
      icon: <Truck size={32} />,
      title: 'Доставка по РФ',
      description: 'Через СДЭК — 250-350 ₽',
      details: 'Срок доставки 2-3 рабочих дня',
      features: [
        'Предоплата или наложенный платеж',
        'Осмотр товара при получении',
        'Срок хранения на складе — 14 рабочих дней'
      ]
    },
  ];

  const paymentMethods = [
    {
      icon: <CreditCard size={32} />,
      title: 'Банковская карта',
      description: 'VISA, MasterCard, Мир',
      details: 'Безопасная оплата через защищенное соединение SSL'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Онлайн оплата',
      description: 'На сайте или в приложении',
      details: 'Мгновенное подтверждение заказа'
    },
    {
      icon: <Package size={32} />,
      title: 'Оплата для юр. лиц',
      description: 'По счету',
      details: 'Отправка в течение 3 рабочих дней после оплаты'
    },
  ];

  const returnConditions = [
    {
      title: 'Условия возврата',
      items: [
        'Возврат в течение 14 дней со дня получения',
        'Товар должен быть не использованным',
        'Полная оригинальная комплектация',
        'Сохранен товарный вид и упаковка'
      ]
    },
    {
      title: 'Гарантийные случаи',
      items: [
        'Скрытый заводской брак',
        'Дефекты креплений и винтов',
        'Неисправности в процессе производства'
      ]
    },
    {
      title: 'Не подлежит возврату',
      items: [
        'Контактные линзы и средства ухода',
        'Очковые линзы надлежащего качества',
        'Товары с следами использования',
        'Аксессуары (чехлы, салфетки)'
      ]
    }
  ];

  const salons = [
    {
      name: 'Салон на Ершова',
      address: 'г. Казань, Николая Ершова, 47',
      phones: ['+7 (843) 272-91-65'],
      hours: 'Пн-Пт: 10:00 — 20:00 Сб: 10:00 — 18:00 Вс: выходной'
    },
    {
      name: 'Салон на Меридианной',
      address: 'г. Казань, Меридианная, 4',
      phones: ['+7 (843) 528-07-08'],
      hours: 'Пн-Пт: 9:00 — 20:00 Сб: 10:00 — 19:00 Вс: выходной'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" data-testid="delivery-title">
            Доставка и оплата
          </h1>
          <p className="text-xl md:text-2xl text-white/95">
            Удобные способы доставки по всей России и безопасная оплата для вашего комфорта
          </p>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#9c0101]/10 to-blue-600/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#740000]/10 rounded-full blur-xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#740000] mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Способы доставки
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {deliveryOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:-translate-y-3 border border-gray-100 group"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-2xl text-white transform group-hover:scale-110 transition-transform duration-300 shadow-[0_4px_14px_0_rgba(156,1,1,0.3)] flex-shrink-0">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#740000] mb-2 group-hover:text-[#9c0101] transition-colors duration-300">
                      {option.title}
                    </h3>
                    <p className="text-lg text-[#9c0101] font-semibold mb-1">{option.description}</p>
                    <p className="text-gray-600">{option.details}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-[#9c0101] rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-start space-x-4">
              <AlertCircle size={24} className="text-[#9c0101] mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-[#740000] mb-2">Убедительная просьба!</h4>
                <p className="text-gray-700">
                  Осматривайте товар при получении, не покидая помещение транспортной компании!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9c0101]/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#740000] mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Способы оплаты
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:-translate-y-3 text-center border border-gray-100 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_4px_14px_0_rgba(59,130,246,0.3)]">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-[#740000] mb-3 group-hover:text-[#9c0101] transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-[#9c0101] font-semibold mb-3">{method.description}</p>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300 text-sm">
                  {method.details}
                </p>
              </div>
            ))}
          </div>

          {/* Payment Security */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100">
            <div className="flex items-center space-x-4 mb-6">
              <Shield size={32} className="text-[#9c0101]" />
              <h3 className="text-2xl font-bold text-[#740000]">Безопасность платежей</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Обработка платежей защищена международным сертификатом безопасности <strong>PCI DSS</strong>. 
                  Передача информации происходит с применением технологии шифрования <strong>SSL</strong>.
                </p>
                <p className="text-gray-700">
                  <strong>Важно:</strong> После оформления заказа дождитесь звонка оператора для подтверждения заказа. 
                  Без звонка оператора заказ считается НЕПОДТВЕРЖДЕННЫМ.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-[#740000]">Рекомендации по безопасности:</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#9c0101] rounded-full mt-2 flex-shrink-0" />
                    <span>Берегите карты как наличные деньги</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#9c0101] rounded-full mt-2 flex-shrink-0" />
                    <span>Не передавайте номер карты по телефону</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#9c0101] rounded-full mt-2 flex-shrink-0" />
                    <span>Вводите реквизиты только при совершении покупки</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return & Warranty Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-[#9c0101]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#740000]/10 rounded-full blur-xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#740000] mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Возврат и гарантия
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {returnConditions.map((condition, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100"
              >
                <h3 className="text-xl font-bold text-[#740000] mb-4">{condition.title}</h3>
                <ul className="space-y-3">
                  {condition.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-[#9c0101] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Legal Information */}
          <div className="bg-gradient-to-br from-[#740000] to-[#9c0101] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Правовая информация</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Возврат товара</h4>
                <p className="text-white/90 text-sm mb-4">
                  Процедура возврата регламентируется статьей 26.1 федерального закона «О защите прав потребителей».
                </p>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Отказ от товара в течение 7 дней после передачи</li>
                  <li>• Возврат денежных средств в течение 10 дней</li>
                  <li>• Возврат на карту в срок от 1 до 30 рабочих дней</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Отказ от услуги</h4>
                <p className="text-white/90 text-sm mb-4">
                  Право на расторжение договора регламентируется статьей 32 федерального закона.
                </p>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Расторжение договора в любое время</li>
                  <li>• Требования по недостаткам в течение 2 лет</li>
                  <li>• Возмещение расходов исполнителя</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salons Information */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9c0101]/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#740000] mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Наши салоны для самовывоза
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {salons.map((salon, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-[#740000] mb-6">{salon.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin size={24} className="text-[#9c0101] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{salon.address}</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone size={24} className="text-[#9c0101] mt-1 flex-shrink-0" />
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
                  <div className="flex items-start space-x-4">
                    <Clock size={24} className="text-[#9c0101] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{salon.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Delivery;