import React from "react";
import CardImage from "@/assets/unnamed-5.png";

const PaymentPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* HERO */}
            <section className="py-20 bg-gradient-to-br from-[#c41c20] via-[#e31e24] to-[#e31e24]/80 text-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Оплата
                    </h1>
                    <p className="text-xl text-white/90">
                        Удобные и безопасные способы оплаты заказа
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 space-y-12">
                    {/* Основная информация */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
                        <p className="text-gray-700 text-lg">
                            Оплатить товар можно банковской картой на сайте или
                            при получении в пункте СДЭК.
                        </p>

                        <p className="font-semibold text-[#c41c20]">
                            После оформления заказа обязательно дождитесь звонка
                            оператора интернет-магазина для уточнения деталей.
                            Без подтверждения заказ считается НЕПОДТВЕРЖДЕННЫМ.
                        </p>

                        <p className="text-gray-700">
                            Обработка заказов производится в течение рабочего
                            дня.
                        </p>
                    </div>

                    {/* Юридические лица */}
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-[#c41c20] mb-6">
                            Оплата для юридических лиц
                        </h2>

                        <ol className="space-y-4 text-gray-700">
                            <li>
                                1. Укажите реквизиты организации в комментарии к
                                заказу или отправьте их на egooptika@yandex.ru
                            </li>
                            <li>2. Менеджеры выставят счет на оплату.</li>
                            <li>
                                3. Отправка товара осуществляется в течение 3
                                рабочих дней после поступления средств.
                            </li>
                        </ol>

                        <p className="mt-6 text-sm text-gray-600">
                            Для ускорения отправки направьте подтверждение
                            оплаты на e-mail egooptika@yandex.ru, указав номер
                            заказа в теме письма.
                        </p>
                    </div>

                    {/* Банковские карты */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
                        <h2 className="text-2xl font-bold text-[#c41c20]">
                            Оплата банковской картой
                        </h2>

                        <p className="text-gray-700">
                            К оплате принимаются карты: VISA, MasterCard, МИР.
                        </p>

                        <p className="text-gray-700">
                            При оплате происходит переход на защищенную страницу
                            банка, где необходимо ввести данные карты:
                        </p>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <img
                                src={CardImage}
                                alt="Оплата картой"
                                className="rounded-2xl shadow-lg max-w-xs"
                            />

                            <ul className="space-y-2 text-gray-700">
                                <li>1. Тип карты</li>
                                <li>2. Номер карты</li>
                                <li>3. Срок действия</li>
                                <li>4. Имя держателя</li>
                                <li>5. CVC2 / CVV2 код</li>
                            </ul>
                        </div>

                        <p className="text-gray-700">
                            Если карта подключена к 3D-Secure, вы будете
                            перенаправлены на страницу банка для подтверждения
                            операции.
                        </p>
                    </div>

                    {/* Безопасность */}
                    <div className="bg-gradient-to-br from-[#c41c20] to-[#e31e24] rounded-3xl p-8 text-white space-y-6">
                        <h2 className="text-2xl font-bold">
                            Безопасность платежей
                        </h2>

                        <p className="text-white/90">
                            Обработка платежей защищена международным
                            сертификатом PCI DSS. Передача данных осуществляется
                            через SSL-шифрование.
                        </p>

                        <div>
                            <h3 className="font-semibold mb-4">
                                Рекомендации по безопасности:
                            </h3>
                            <ul className="space-y-3 text-white/90">
                                <li>• Берегите карту как наличные деньги</li>
                                <li>
                                    • Не передавайте номер карты по телефону
                                </li>
                                <li>
                                    • В случае утраты немедленно свяжитесь с
                                    банком
                                </li>
                                <li>
                                    • Вводите реквизиты только при совершении
                                    покупки
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PaymentPage;
