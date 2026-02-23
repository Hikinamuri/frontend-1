import React from "react";

const WarrantyPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* HERO */}
            <section className="py-20 bg-gradient-to-br from-[#c41c20] via-[#e31e24] to-[#e31e24]/80 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Гарантия и возврат
                    </h1>
                    <p className="text-xl text-white/90">
                        Условия гарантии, обмена и возврата товара
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 space-y-12">
                    {/* Основная гарантия */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
                        <h2 className="text-2xl font-bold text-[#c41c20]">
                            Гарантия
                        </h2>

                        <p className="text-gray-700">
                            Гарантия на очковые линзы распространяется
                            исключительно на покрытия линз и действует только
                            при соблюдении правил пользования очками.
                        </p>

                        <ol className="space-y-4 text-gray-700">
                            <li>
                                <strong>1. Оправы и очки</strong> — при наличии
                                производственных дефектов или скрытого
                                заводского брака.
                            </li>
                            <li>
                                <strong>2. Ремонт</strong> — 14 дней гарантии на
                                работу мастера при замене линз или ремонте.
                            </li>
                        </ol>
                    </div>

                    {/* Условия возврата */}
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-lg border border-gray-100 space-y-6">
                        <h2 className="text-2xl font-bold text-[#c41c20]">
                            Условия возврата
                        </h2>

                        <p className="text-gray-700">
                            Вы имеете право вернуть товар в течение срока,
                            установленного законодательством РФ.
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li>
                                • Товар должен быть не использован и в полной
                                оригинальной комплектации
                            </li>
                            <li>
                                • Сохранены товарный вид и потребительские
                                свойства
                            </li>
                            <li>
                                • Обязателен документ, подтверждающий покупку
                            </li>
                            <li>• Стоимость доставки не возвращается</li>
                            <li>
                                • Перед отправкой необходимо связаться со
                                службой поддержки
                            </li>
                        </ul>

                        <p className="text-sm text-gray-600">
                            Возврат денежных средств осуществляется на ту же
                            банковскую карту. Срок возврата — от 1 до 30 рабочих
                            дней.
                        </p>
                    </div>

                    {/* Что не подлежит возврату */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
                        <h2 className="text-2xl font-bold text-[#c41c20]">
                            Гарантия не распространяется
                        </h2>

                        <ul className="space-y-3 text-gray-700">
                            <li>• Механические повреждения (падения, удары)</li>
                            <li>• Нарушение правил эксплуатации</li>
                            <li>
                                • Самостоятельный ремонт или ремонт третьими
                                лицами
                            </li>
                            <li>
                                • Износ комплектующих (винты, носоупоры,
                                заушники)
                            </li>
                            <li>• Аксессуары (чехлы, салфетки)</li>
                            <li>• Товары без оригинальной упаковки</li>
                        </ul>
                    </div>

                    {/* Контактные линзы */}
                    <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-3xl p-8 shadow-lg space-y-6">
                        <h2 className="text-2xl font-bold text-[#c41c20]">
                            Контактные и очковые линзы
                        </h2>

                        <p className="text-gray-700">
                            Очковые линзы надлежащего качества не подлежат
                            возврату в соответствии с Постановлением
                            Правительства РФ №1222.
                        </p>

                        <p className="text-gray-700">
                            Контактные линзы и средства ухода являются товарами
                            медицинского назначения и возврату не подлежат
                            (Постановление №2463).
                        </p>

                        <p className="text-gray-700">
                            Контактные линзы должны подбираться
                            сертифицированным специалистом. Рекомендуется
                            консультация врача-офтальмолога.
                        </p>
                    </div>

                    {/* Юридическая информация */}
                    <div className="bg-gradient-to-br from-[#c41c20] to-[#e31e24] rounded-3xl p-8 text-white space-y-6">
                        <h2 className="text-2xl font-bold">
                            Правовые основания
                        </h2>

                        <p className="text-white/90">
                            Возврат товара регламентируется статьей 26.1 закона
                            «О защите прав потребителей».
                        </p>

                        <ul className="space-y-3 text-white/90">
                            <li>
                                • Отказ от товара возможен до передачи или в
                                течение 7 дней после
                            </li>
                            <li>
                                • Возврат возможен при сохранении товарного вида
                            </li>
                            <li>
                                • Индивидуально-определенные товары возврату не
                                подлежат
                            </li>
                            <li>
                                • Денежные средства возвращаются в течение 10
                                дней
                            </li>
                        </ul>

                        <p className="text-white/90">
                            Отказ от услуги регулируется статьей 32 закона «О
                            защите прав потребителей».
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WarrantyPage;
