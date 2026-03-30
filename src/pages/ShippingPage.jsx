import React from "react";

const ShippingPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* HERO */}
            <section className="py-20 bg-gradient-to-br from-[#c41c20] via-[#e31e24] to-[#e31e24]/80 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Доставка по регионам РФ
                    </h1>
                    <p className="text-xl text-white/90">
                        Быстрая и надёжная доставка по всей России
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 space-y-12">
                    {/* Важно */}
                    <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-[#c41c20] mb-4">
                            Важно
                        </h2>
                        <p className="text-red-600 font-semibold text-lg">
                            Убедительная просьба — осматривать товар при
                            получении, не покидая помещение транспортной
                            компании.
                        </p>
                    </div>

                    {/* Основная информация */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
                        <p className="text-gray-700 text-lg">
                            Доставка осуществляется через курьерскую службу{" "}
                            <strong>СДЭК</strong>. Возможна предоплата заказа
                            или наложенный платеж.
                        </p>

                        <p className="text-gray-700">
                            Стоимость доставки по России в среднем составляет
                            250–350 ₽, а сроки — обычно 2–3 рабочих дня. Точная
                            сумма и сроки рассчитываются оператором после
                            оформления заказа.
                        </p>

                        <p className="text-gray-700">
                            Вы также можете самостоятельно рассчитать стоимость
                            доставки на сайте транспортной компании или уточнить
                            информацию у нашего менеджера.
                        </p>

                        <p className="text-gray-700">
                            Срок хранения заказа в пункте выдачи — до 14 рабочих
                            дней.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShippingPage;
