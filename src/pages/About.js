import React from 'react';
import { Award, Users, MapPin, Heart, Star, ShoppingBag, Eye, Shield } from 'lucide-react';
import First from '@/assets/about/first.png';
import Second from '@/assets/about/second.jpg';

const About = () => {
  const values = [
    {
      icon: <Award size={40} />,
      title: 'Качество',
      description: 'Мы работаем только с оригинальной продукцией от проверенных поставщиков',
    },
    {
      icon: <Users size={40} />,
      title: 'Профессионализм',
      description: 'Наши специалисты имеют многолетний опыт в оптике и помогут выбрать идеальные очки',
    },
    {
      icon: <MapPin size={40} />,
      title: 'Удобство',
      description: 'Два салона в разных районах Казани для вашего удобства',
    },
    {
      icon: <Heart size={40} />,
      title: 'Индивидуальный подход',
      description: 'Мы учитываем ваши пожелания, стиль и особенности зрения',
    },
  ];

  const features = [
    {
      icon: <Star size={32} />,
      title: 'Эстетика',
      description: 'Создаем неповторимый образ с учетом последних тенденций моды'
    },
    {
      icon: <ShoppingBag size={32} />,
      title: 'Гармония',
      description: 'Широкий выбор оправ и солнцезащитных очков на любой вкус'
    },
    {
      icon: <Eye size={32} />,
      title: 'Оригинальность',
      description: 'Уникальные коллекции от ведущих мировых брендов'
    },
    {
      icon: <Shield size={32} />,
      title: 'Сертификация',
      description: 'Весь товар сертифицирован и имеет декларации соответствия'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#740000] via-[#9c0101] to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3)_2px,transparent_0)] bg-[length:60px_60px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#9c0101] rounded-full opacity-10 blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" data-testid="about-title">
            О нас
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-white/95">
            Эгооптика — ваш надёжный партнёр в мире качественной оптики. Мы предлагаем широкий ассортимент очков и оправ от ведущих мировых брендов.
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#9c0101]/10 to-blue-600/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#740000]/10 rounded-full blur-xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#740000] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                Эстетика — Гармония — Оригинальность
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-800 leading-relaxed">
                  Само название салона «ЭГООПТИКА» включает в себя три важных качества: <strong>Эстетика — Гармония — Оригинальность</strong>. Это именно то, что вы можете найти в наших салонах оптики!
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Салон «ЭГООПТИКА» представляет большой выбор оправ, солнцезащитных очков, готовых очков, линз, аксессуаров и сопутствующих товаров на любой вкус.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  В нашей оптике Вас ждет приветливый и профессиональный персонал, который всегда с удовольствием поможет создать свой неповторимый образ.
                </p>
              </div>
            </div>
            
            {/* Фото без рамки, растянуто на полотно */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transform group-hover:scale-[1.02] transition-transform duration-700">
                <img
                  src={Second}
                  alt="Интерьер нашего салона оптики"
                  className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-600 to-[#9c0101] rounded-2xl opacity-20 blur-xl transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#740000] rounded-full opacity-15 blur-lg transform -rotate-12 group-hover:-rotate-45 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9c0101]/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transform group-hover:scale-[1.02] transition-transform duration-700">
                <img
                  src = {First}
                  alt="Качественные очки в нашем салоне"
                  className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#740000] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                Качество и доверие
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-800 leading-relaxed">
                  Мы стараемся обеспечивать наших гостей товарами самого высокого качества. Весь товар сертифицирован, имеет декларации соответствия.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  За время работы с 2019 года мы стремимся установить с клиентами долгосрочные отношения, основанные на взаимном доверии и удовлетворении.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  У нас Вы можете ознакомиться с новыми коллекциями оправ и солнцезащитных очков и следовать за тенденциями мировой моды. Честные цены и специальные акции Вас приятно удивят и помогут осуществить свои желания!
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Заказать интересующий Вас товар можно здесь и сейчас‚ оформив заявку на сайте!
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  Для Вашего удобства существует наличная и безналичная система оплаты. Заказанный Вами товар будет оперативно доставлен в регионы, удобной транспортной компанией.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EGO Features */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-[#9c0101]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#740000]/10 rounded-full blur-xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#740000] mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Наши принципы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:-translate-y-3 text-center border border-gray-100 group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-2xl text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_4px_14px_0_rgba(156,1,1,0.3)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#740000] mb-4 group-hover:text-[#9c0101] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9c0101]/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#740000] mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:-translate-y-3 text-center border border-gray-100 group"
                data-testid={`value-card-${index}`}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#9c0101] to-[#740000] rounded-2xl text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_4px_14px_0_rgba(156,1,1,0.3)]">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#740000] mb-4 group-hover:text-[#9c0101] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-[#740000] via-[#9c0101] to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-blue-400 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-red-400 rounded-full animate-pulse delay-500" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
              В цифрах
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Наша статистика говорит сама за себя — доверие тысяч клиентов за годы работы
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="relative">
                <div className="text-6xl lg:text-7xl font-black mb-3 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transform group-hover:scale-110 transition-transform duration-300">
                  5+
                </div>
                <div className="absolute inset-0 text-6xl lg:text-7xl font-black mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                  5+
                </div>
              </div>
              <p className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                лет на рынке
              </p>
            </div>
            
            <div className="group">
              <div className="relative">
                <div className="text-6xl lg:text-7xl font-black mb-3 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transform group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="absolute inset-0 text-6xl lg:text-7xl font-black mb-3 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                  2
                </div>
              </div>
              <p className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                салона
              </p>
            </div>
            
            <div className="group">
              <div className="relative">
                <div className="text-6xl lg:text-7xl font-black mb-3 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transform group-hover:scale-110 transition-transform duration-300">
                  5000+
                </div>
                <div className="absolute inset-0 text-6xl lg:text-7xl font-black mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                  5000+
                </div>
              </div>
              <p className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                довольных клиентов
              </p>
            </div>
            
            <div className="group">
              <div className="relative">
                <div className="text-6xl lg:text-7xl font-black mb-3 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transform group-hover:scale-110 transition-transform duration-300">
                  20+
                </div>
                <div className="absolute inset-0 text-6xl lg:text-7xl font-black mb-3 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                  20+
                </div>
              </div>
              <p className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                брендов
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;