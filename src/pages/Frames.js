import React, {
    useState,
    useMemo,
    useEffect,
    useCallback,
    useRef,
} from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
    Filter,
    Grid,
    List,
    X,
    Check,
    Eye,
    DollarSign,
    MapPin,
    Tag,
    Palette,
    Settings,
} from "lucide-react";
import { useWooProducts } from "@/hooks/useWooProducts";

const Frames = () => {
    const location = useLocation();
    const { brand: brandSlug } = useParams(); // для /frames/chanel

    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("default");
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState({
        gender: "all",
        country: "all",
        material: [],
        frameType: [],
        color: [],
        brand: [],
        child: [],
    });

    const [priceRange, setPriceRange] = useState({ min: 0, max: 70000 });

    const {
        products: displayedProducts,
        loading,
        error,
        total,
        minPrice,
        maxPrice,
        genderOptions,
        countryOptions,
        materialOptions,
        frameTypeOptions,
        colorOptions,
        brandOptions,
    } = useWooProducts(
        filters,
        sortBy,
        priceRange,
        itemsPerPage,
        currentPage,
        "104",
    );

    // Синхронизация цен при первой загрузке
    useEffect(() => {
        if (
            minPrice !== undefined &&
            maxPrice !== undefined &&
            priceRange.min === 0 &&
            priceRange.max === 70000
        ) {
            setPriceRange({ min: minPrice, max: maxPrice });
        }
    }, [minPrice, maxPrice]);

    // Сброс страницы при изменении фильтров
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sortBy, priceRange, itemsPerPage]);

    // Обработка бренда из URL (поддерживаем и ?brand= и /:brand)
    useEffect(() => {
        if (!brandOptions.length) return;

        const queryParams = new URLSearchParams(location.search);
        const brandFromQuery = queryParams.get("brand");
        const brandFromParams = brandSlug;

        const brandInput = brandFromParams || brandFromQuery;
        if (!brandInput) return;

        const normalized = brandInput.toLowerCase().trim();

        const found = brandOptions.find((opt) => {
            const labelNorm = opt.label.toLowerCase().trim();
            return (
                labelNorm === normalized ||
                labelNorm.replace(/\s+/g, "-") === normalized ||
                opt.value.toString() === brandInput
            );
        });

        if (found && !filters.brand.includes(found.value)) {
            setFilters((prev) => ({ ...prev, brand: [found.value] }));
            setCurrentPage(1);
        }
    }, [brandSlug, location.search, brandOptions, filters.brand]);

    const toggleFilter = useCallback((key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter((v) => v !== value)
                : [...prev[key], value],
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            gender: "all",
            country: "all",
            material: [],
            frameType: [],
            color: [],
            brand: [],
            child: [],
        });
        setPriceRange({ min: minPrice || 0, max: maxPrice || 70000 });
        setCurrentPage(1);
    }, [minPrice, maxPrice]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [currentPage]);

    const selectedBrand = useMemo(() => {
        if (filters.brand.length !== 1) return null;
        return brandOptions.find((opt) => opt.value === filters.brand[0]);
    }, [filters.brand, brandOptions]);

    const sortedBrandOptions = useMemo(() => {
        return [...brandOptions].sort((a, b) =>
            a.label.localeCompare(b.label, "ru", { sensitivity: "base" }),
        );
    }, [brandOptions]);

    const handleMinPriceChange = useCallback(
        (e) => {
            const val = Number(e.target.value);
            if (isNaN(val)) return;
            setPriceRange((prev) => {
                const newMin = Math.max(val, minPrice || 0);
                const newMax = Math.max(prev.max, newMin + 1000);
                return {
                    min: newMin,
                    max: Math.min(newMax, maxPrice || 70000),
                };
            });
        },
        [minPrice, maxPrice],
    );

    const handleMaxPriceChange = useCallback(
        (e) => {
            const val = Number(e.target.value);
            if (isNaN(val)) return;
            setPriceRange((prev) => {
                const newMax = Math.min(val, maxPrice || 70000);
                const newMin = Math.min(prev.min, newMax - 1000);
                return { min: Math.max(newMin, minPrice || 0), max: newMax };
            });
        },
        [minPrice, maxPrice],
    );

    const totalPages = Math.ceil(total / itemsPerPage);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#c8102e] mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Загрузка товаров...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="text-[#c8102e]" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ошибка загрузки
                    </h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-[#c8102e] text-white rounded-lg hover:bg-[#a50d24] transition-colors"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            {/* Breadcrumbs */}
            <nav className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-[#c8102e] transition-colors duration-200"
                            >
                                Главная
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium">
                                Оправы
                            </span>
                        </li>
                    </ol>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-[#a50d24] via-[#c8102e] to-[#c8102e]/90 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_2px,transparent_0)] bg-[length:50px_50px]" />
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    {selectedBrand ? (
                        <>
                            <h1 className="text-4xl md:text-5xl font-bold mb-3">
                                {selectedBrand.label}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90">
                                Коллекция оправ
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-5xl md:text-6xl font-bold mb-4">
                                Оправы
                            </h1>
                            <p className="text-xl md:text-2xl text-white/95">
                                Идеальный выбор оправ от мировых брендов
                            </p>
                        </>
                    )}
                </div>
            </section>

            {/* Catalog Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Controls Bar */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-white rounded-xl p-2 shadow border border-gray-200">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-all ${
                                        viewMode === "grid"
                                            ? "bg-[#c8102e] text-white shadow-md"
                                            : "text-gray-600 hover:text-[#c8102e]"
                                    }`}
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-all ${
                                        viewMode === "list"
                                            ? "bg-[#c8102e] text-white shadow-md"
                                            : "text-gray-600 hover:text-[#c8102e]"
                                    }`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                            <div className="text-sm text-gray-600">
                                Найдено{" "}
                                <span className="font-bold text-[#c8102e]">
                                    {total}
                                </span>{" "}
                                товаров
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-700">
                                    Сортировка:
                                </span>
                                <select
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-[#c8102e] focus:ring-2 focus:ring-[#c8102e]/20 outline-none text-sm transition-all"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="default">
                                        По умолчанию
                                    </option>
                                    <option value="price-low">
                                        Цена: по возрастанию
                                    </option>
                                    <option value="price-high">
                                        Цена: по убыванию
                                    </option>
                                    <option value="name">По названию</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-700">
                                    На странице:
                                </span>
                                <select
                                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-[#c8102e] focus:ring-2 focus:ring-[#c8102e]/20 outline-none text-sm transition-all"
                                    value={itemsPerPage}
                                    onChange={(e) =>
                                        setItemsPerPage(Number(e.target.value))
                                    }
                                >
                                    <option value={12}>12</option>
                                    <option value={16}>16</option>
                                    <option value={24}>24</option>
                                    <option value={32}>32</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#c8102e] flex items-center space-x-2">
                                        <Filter size={20} />
                                        <span>Фильтры</span>
                                    </h3>
                                    <button
                                        onClick={resetFilters}
                                        className="text-sm text-[#c8102e] hover:text-[#a50d24] flex items-center space-x-1 transition-colors"
                                    >
                                        <X size={14} />
                                        <span>Сбросить</span>
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <FilterSection title="Пол" icon="👤">
                                        {genderOptions.map((option) => (
                                            <RadioFilter
                                                key={option.value}
                                                name="gender"
                                                value={option.value}
                                                label={option.label}
                                                checked={
                                                    filters.gender ===
                                                    option.value
                                                }
                                                onChange={(value) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        gender: value,
                                                    }))
                                                }
                                            />
                                        ))}
                                    </FilterSection>

                                    <div>
                                        <h4 className="font-semibold text-[#c8102e] mb-3 flex items-center space-x-2">
                                            <Tag
                                                size={18}
                                                className="text-[#c8102e]"
                                            />
                                            <span>Бренд</span>
                                        </h4>

                                        {selectedBrand ? (
                                            <div className="bg-white p-4 rounded-lg">
                                                <div className="font-medium text-gray-900 mb-2">
                                                    Выбран:{" "}
                                                    {selectedBrand.label}
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            brand: [],
                                                        }))
                                                    }
                                                    className="text-sm text-[#c8102e] hover:underline flex items-center gap-1"
                                                >
                                                    <X size={14} />
                                                    Показать все бренды
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                                                {sortedBrandOptions.map((option) => (
                                                    <label
                                                        key={option.value}
                                                        className="flex items-center space-x-3 cursor-pointer group"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.brand.includes(
                                                                option.value,
                                                            )}
                                                            onChange={() =>
                                                                toggleFilter(
                                                                    "brand",
                                                                    option.value,
                                                                )
                                                            }
                                                            className="sr-only"
                                                        />
                                                        <div
                                                            className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all ${
                                                                filters.brand.includes(
                                                                    option.value,
                                                                )
                                                                    ? "border-[#c8102e] bg-[#c8102e]"
                                                                    : "border-gray-300 group-hover:border-[#c8102e]"
                                                            }`}
                                                        >
                                                            {filters.brand.includes(
                                                                option.value,
                                                            ) && (
                                                                <Check
                                                                    size={10}
                                                                    className="text-white"
                                                                />
                                                            )}
                                                        </div>
                                                        <span className="text-gray-700 text-sm group-hover:text-[#c8102e] transition-colors">
                                                            {option.label}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <FilterSection
                                        title="Страна"
                                        icon={
                                            <MapPin
                                                size={18}
                                                className="text-[#c8102e]"
                                            />
                                        }
                                    >
                                        {countryOptions.map((option) => (
                                            <RadioFilter
                                                key={option.value}
                                                name="country"
                                                value={option.value}
                                                label={option.label}
                                                checked={
                                                    filters.country ===
                                                    option.value
                                                }
                                                onChange={(value) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        country: value,
                                                    }))
                                                }
                                            />
                                        ))}
                                    </FilterSection>

                                    <PriceSliderSection
                                        priceRange={priceRange}
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        onMinChange={handleMinPriceChange}
                                        onMaxChange={handleMaxPriceChange}
                                    />

                                    <FilterSection
                                        title="Цвет"
                                        icon={
                                            <Palette
                                                size={18}
                                                className="text-[#c8102e]"
                                            />
                                        }
                                    >
                                        <div className="grid grid-cols-4 gap-3">
                                            {colorOptions.map((option) => (
                                                <ColorFilter
                                                    key={option.value}
                                                    option={option}
                                                    checked={filters.color.includes(
                                                        option.value,
                                                    )}
                                                    onChange={() =>
                                                        toggleFilter(
                                                            "color",
                                                            option.value,
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </FilterSection>

                                    <FilterSection
                                        title="Материал"
                                        icon={
                                            <Settings
                                                size={18}
                                                className="text-[#c8102e]"
                                            />
                                        }
                                    >
                                        {materialOptions.map((option) => (
                                            <CheckboxFilter
                                                key={option.value}
                                                value={option.value}
                                                label={option.label}
                                                checked={filters.material.includes(
                                                    option.value,
                                                )}
                                                onChange={() =>
                                                    toggleFilter(
                                                        "material",
                                                        option.value,
                                                    )
                                                }
                                            />
                                        ))}
                                    </FilterSection>

                                    <FilterSection
                                        title="Тип оправы"
                                        icon={
                                            <Eye
                                                size={18}
                                                className="text-[#c8102e]"
                                            />
                                        }
                                    >
                                        {frameTypeOptions.map((option) => (
                                            <CheckboxFilter
                                                key={option.value}
                                                value={option.value}
                                                label={option.label}
                                                checked={filters.frameType.includes(
                                                    option.value,
                                                )}
                                                onChange={() =>
                                                    toggleFilter(
                                                        "frameType",
                                                        option.value,
                                                    )
                                                }
                                            />
                                        ))}
                                        <CheckboxFilter
                                            value="child"
                                            label="Детские оправы"
                                            checked={filters.child.includes(
                                                "child",
                                            )}
                                            onChange={() =>
                                                toggleFilter("child", "child")
                                            }
                                        />
                                    </FilterSection>

                                    {/* <FilterSection
                                        title="Бренд"
                                        icon={
                                            <Tag
                                                size={18}
                                                className="text-[#c8102e]"
                                            />
                                        }
                                    >
                                        <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                                            {brandOptions.map((option) => (
                                                <CheckboxFilter
                                                    key={option.value}
                                                    value={option.value}
                                                    label={option.label}
                                                    checked={filters.brand.includes(
                                                        option.value,
                                                    )}
                                                    onChange={() =>
                                                        toggleFilter(
                                                            "brand",
                                                            option.value,
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </FilterSection> */}
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            {displayedProducts.length > 0 ? (
                                <>
                                    <div
                                        className={
                                            viewMode === "grid"
                                                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                                : "space-y-6"
                                        }
                                    >
                                        {displayedProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                viewMode={viewMode}
                                            />
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Filter
                                            size={24}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <p className="text-gray-500 text-lg mb-2">
                                        Товары не найдены
                                    </p>
                                    <p className="text-gray-400">
                                        Попробуйте изменить параметры фильтрации
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// === Компоненты (обновлённые цвета) ===

const FilterSection = React.memo(({ title, icon, children }) => (
    <div>
        <h4 className="font-semibold text-[#c8102e] mb-3 flex items-center space-x-2">
            {typeof icon === "string" ? <span>{icon}</span> : icon}
            <span>{title}</span>
        </h4>
        {children}
    </div>
));

const RadioFilter = React.memo(({ name, value, label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
            className="sr-only"
        />
        <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                checked
                    ? "border-[#c8102e] bg-[#c8102e]"
                    : "border-gray-300 group-hover:border-[#c8102e]"
            }`}
        >
            {checked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
        </div>
        <span className="text-gray-700 text-sm group-hover:text-[#c8102e] transition-colors">
            {label}
        </span>
    </label>
));

const CheckboxFilter = React.memo(({ value, label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
        />
        <div
            className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all ${
                checked
                    ? "border-[#c8102e] bg-[#c8102e]"
                    : "border-gray-300 group-hover:border-[#c8102e]"
            }`}
        >
            {checked && <Check size={10} className="text-white" />}
        </div>
        <span className="text-gray-700 text-sm group-hover:text-[#c8102e] transition-colors">
            {label}
        </span>
    </label>
));

const ColorFilter = React.memo(({ option, checked, onChange }) => (
    <label className="relative flex flex-col items-center cursor-pointer group">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
        />
        <div
            className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center group-hover:scale-105 ${
                checked
                    ? "border-[#c8102e] ring-2 ring-[#c8102e]/30 scale-110 shadow-md"
                    : "border-gray-300 group-hover:border-[#c8102e]"
            }`}
            style={{ backgroundColor: option.color }}
        >
            {checked && (
                <>
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                    <Check size={12} className="text-[#c8102e] relative z-10" />
                </>
            )}
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {option.label}
        </span>
    </label>
));

const PriceSliderSection = React.memo(
    ({ priceRange, minPrice, maxPrice, onMinChange, onMaxChange }) => {
        const [isDragging, setIsDragging] = useState(null);
        const sliderRef = useRef(null);

        // Актуальные значения для document listeners (чтобы не было stale closure)
        const latestRef = useRef({
            priceRange,
            minPrice,
            maxPrice,
            onMinChange,
            onMaxChange,
        });

        useEffect(() => {
            latestRef.current = {
                priceRange,
                minPrice,
                maxPrice,
                onMinChange,
                onMaxChange,
            };
        }, [priceRange, minPrice, maxPrice, onMinChange, onMaxChange]);

        const handleMouseMove = useCallback(
            (e) => {
                const {
                    priceRange: currRange,
                    minPrice: minP,
                    maxPrice: maxP,
                    onMinChange: updateMin,
                    onMaxChange: updateMax,
                } = latestRef.current;

                if (!isDragging || !sliderRef.current) return;

                const rect = sliderRef.current.getBoundingClientRect();
                let offsetX = e.clientX - rect.left;
                offsetX = Math.max(0, Math.min(offsetX, rect.width));

                const percentage = offsetX / rect.width;
                const newPrice = Math.round(minP + percentage * (maxP - minP));

                if (isDragging === "min" && newPrice <= currRange.max) {
                    updateMin({ target: { value: newPrice.toString() } });
                } else if (isDragging === "max" && newPrice >= currRange.min) {
                    updateMax({ target: { value: newPrice.toString() } });
                }
            },
            [isDragging],
        );

        const handleMouseUp = useCallback(() => {
            setIsDragging(null);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }, [handleMouseMove]);

        const handleMouseDown = useCallback(
            (e, type) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(type);
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            },
            [handleMouseMove, handleMouseUp],
        );

        // Клик по треку — сразу перемещает ближайшую ручку
        const handleTrackClick = useCallback(
            (e) => {
                if (!sliderRef.current || isDragging) return;

                const rect = sliderRef.current.getBoundingClientRect();
                let offsetX = e.clientX - rect.left;
                offsetX = Math.max(0, Math.min(offsetX, rect.width));

                const percentage = offsetX / rect.width;
                const clickPrice = Math.round(
                    (minPrice || 0) +
                        percentage * ((maxPrice || 70000) - (minPrice || 0)),
                );

                const curr = latestRef.current.priceRange;
                const distMin = Math.abs(clickPrice - curr.min);
                const distMax = Math.abs(clickPrice - curr.max);

                if (distMin <= distMax) {
                    latestRef.current.onMinChange({
                        target: { value: clickPrice.toString() },
                    });
                } else {
                    latestRef.current.onMaxChange({
                        target: { value: clickPrice.toString() },
                    });
                }
            },
            [minPrice, maxPrice, isDragging],
        );

        if (
            minPrice === undefined ||
            maxPrice === undefined ||
            minPrice >= maxPrice
        ) {
            return null;
        }

        const minPercent =
            ((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100;
        const maxPercent =
            ((priceRange.max - minPrice) / (maxPrice - minPrice)) * 100;

        return (
            <div>
                <h4 className="font-semibold text-[#c8102e] mb-3 flex items-center space-x-2">
                    <DollarSign size={18} className="text-[#c8102e]" />
                    <span>Цена, ₽</span>
                </h4>
                <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>от {priceRange.min.toLocaleString("ru-RU")}</span>
                        <span>до {priceRange.max.toLocaleString("ru-RU")}</span>
                    </div>

                    <div
                        ref={sliderRef}
                        className="relative h-10 bg-transparent cursor-pointer select-none"
                        onClick={handleTrackClick}
                    >
                        {/* Фон */}
                        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full -translate-y-1/2" />

                        {/* Активный диапазон */}
                        <div
                            className="absolute top-1/2 h-1.5 bg-gradient-to-r from-[#c8102e] to-[#a50d24] rounded-full -translate-y-1/2"
                            style={{
                                left: `${Math.max(0, minPercent)}%`,
                                width: `${Math.max(0, maxPercent - minPercent)}%`,
                            }}
                        />

                        {/* Ручка MIN */}
                        <div
                            className="absolute top-1/2 w-5 h-5 bg-white border-2 border-[#c8102e] rounded-full shadow-lg -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-20 hover:scale-110 transition-transform"
                            style={{ left: `${minPercent}%` }}
                            onMouseDown={(e) => handleMouseDown(e, "min")}
                        />

                        {/* Ручка MAX */}
                        <div
                            className="absolute top-1/2 w-5 h-5 bg-white border-2 border-[#c8102e] rounded-full shadow-lg -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-20 hover:scale-110 transition-transform"
                            style={{ left: `${maxPercent}%` }}
                            onMouseDown={(e) => handleMouseDown(e, "max")}
                        />
                    </div>
                </div>
            </div>
        );
    },
);

const ProductCard = React.memo(({ product, viewMode }) => (
    <Link
        to={`/product/${product.id}`}
        className={`bg-white rounded-xl shadow overflow-hidden group border border-gray-100 hover:border-[#c8102e]/40 transition-all duration-300 hover:shadow-xl ${
            viewMode === "list" ? "flex" : "block"
        }`}
    >
        <div
            className={`${
                viewMode === "list"
                    ? "w-48 h-48 flex-shrink-0"
                    : "aspect-square"
            } bg-white p-6`}
        >
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
            />
        </div>
        <div className="p-6 flex-1">
            <p className="text-sm text-[#c8102e] font-semibold mb-2">
                {product.brand}
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#c8102e] transition-colors">
                {product.name}
            </h3>
            <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-[#c8102e] whitespace-pre">
                    {product.price.toLocaleString("ru-RU")} ₽
                </p>
                <button className="px-5 py-2 bg-[#c8102e] text-white rounded-lg hover:bg-[#a50d24] transition-colors font-medium">
                    Подробнее
                </button>
            </div>
        </div>
    </Link>
));

const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center mt-10 space-x-2 flex-wrap gap-2">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
        >
            Назад
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = currentPage > 3 ? currentPage - 2 + i : i + 1;
            if (page > totalPages) return null;
            return (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg min-w-[40px] ${
                        currentPage === page
                            ? "bg-[#c8102e] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transition-colors`}
                >
                    {page}
                </button>
            );
        })}
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
        >
            Вперед
        </button>
    </div>
));

export default Frames;
