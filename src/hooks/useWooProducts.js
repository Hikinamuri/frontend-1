import { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_WC_URL || 'https://egooptika.ru/wp-json/wc/v3';
const CONSUMER_KEY = process.env.REACT_APP_WC_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_WC_SECRET;

// Глобальный кэш для всех экземпляров хука, по категориям
const globalCache = {};

// Фиксированный маппинг для HEX-цветов
const colorMap = {
  'Бежевый': '#ebc8b2',
  'Белый': '#ffffff',
  'Бронза': '#43291f',
  'Голубой': '#b3dcfd',
  'Желтый': '#ffff00',
  'Зеленый': '#4caf50',
  'Золотой': '#ffdf2b',
  'Коралловый': '#ff7f50',
  'Коричневый': '#795548',
  'Красный': '#ff0000',
  'Медь': '#b87333',
  'Оранжевый': '#dd9933',
  'Прозрачный': '#ffffff',
  'Розовый': '#ffc0cb',
  'Серебряный': '#e5e5e5',
  'Серый': '#bcbcbc',
  'Синий': '#0000ff',
  'Слоновая кость': '#fffff0',
  'Фиолетовый': '#8b00ff',
  'Черный': '#212121',
};

// Фиксированный список цветов
const fixedColorOptions = Object.entries(colorMap).map(([label, color]) => ({
  value: label,
  label,
  color
}));

export const useWooProducts = (filters, sortBy, priceRange, itemsPerPage, currentPage, categoryId = '108') => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(false);

  // Загружаем все продукты один раз при монтировании
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const fetchAllProducts = async () => {
      // Проверяем кэш для этой категории
      const now = Date.now();
      const catCache = globalCache[categoryId];
      if (catCache && catCache.products && (now - catCache.lastFetch) < catCache.cacheDuration) {
        console.log(`Используем кэшированные товары для категории ${categoryId}`);
        setAllProducts(catCache.products);
        setLoading(false);
        return;
      }

      if (!CONSUMER_KEY || !CONSUMER_SECRET) {
        console.warn('Ключи API не настроены — использую пустые данные');
        setAllProducts([]);
        setLoading(false);
        return;
      }

      let retryCount = 0;
      const maxRetries = 2;

      const attemptFetch = async () => {
        try {
          setLoading(true);
          setError(null);
          console.log(`Загрузка всех товаров из WooCommerce для категории ${categoryId}... (попытка ${retryCount + 1})`);
          let allData = [];
          let page = 1;
          let hasMore = true;
          // Загружаем пачками по 50 товаров
          while (hasMore && page <= 10) { // Максимум 500 товаров
            const response = await axios.get(`${API_BASE}/products`, {
              params: {
                per_page: 50,
                page: page,
                category: categoryId,
                consumer_key: CONSUMER_KEY,
                consumer_secret: CONSUMER_SECRET,
                status: 'publish',
                stock_status: 'instock'
              },
              timeout: 30000 // 30 секунд на страницу
            });

            const pageData = response.data || [];
            if (pageData.length === 0) {
              hasMore = false;
            } else {
              allData.push(...pageData);
              console.log(`Страница ${page}: ${pageData.length} товаров`);
              page++;
            }

            // Небольшая пауза между запросами
            if (hasMore) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }

          const mappedProducts = allData.map(mapProduct);

          // Сохраняем в кэш для этой категории
          globalCache[categoryId] = {
            products: mappedProducts,
            lastFetch: Date.now(),
            cacheDuration: 5 * 60 * 1000 // 5 минут кэширования
          };

          setAllProducts(mappedProducts);
          console.log(`Загружено всего ${mappedProducts.length} товаров для категории ${categoryId}`);
          return;
        } catch (err) {
          retryCount++;
          console.error(`Попытка ${retryCount} failed:`, err.message);
          if (retryCount >= maxRetries) {
            throw err;
          }
          await new Promise(resolve => setTimeout(resolve, 2000 * retryCount));
          return attemptFetch();
        }
      };

      try {
        await attemptFetch();
      } catch (err) {
        console.error('Все попытки загрузки провалились:', err);
        setError(`Ошибка загрузки товаров: ${err.message}`);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const mapProduct = (product) => {
      const attributes = {};
      if (product.attributes && product.attributes.length > 0) {
        product.attributes.forEach(attr => {
          let key = attr.slug.replace('pa_', '');
          if (key === 'sex') key = 'gender';
          if (key === 'тип-оправы') key = 'frameType';
          attributes[key] = attr.options || [];
        });
      }

      return {
        id: product.id,
        name: product.name,
        brand: product.etheme_brands?.[0]?.name || 'Без бренда',
        price: parseInt(product.price || 0),
        image: product.images?.[0]?.src || 'https://via.placeholder.com/300x300?text=No+Image',
        gender: attributes.gender?.[0] || 'Унисекс',
        country: attributes.country?.[0] || 'Не указано',
        type: attributes.frameType?.[0] || 'Не указан',
        color: attributes.color || [],
        material: attributes.material || [],
        categories: product.categories?.map(cat => cat.name) || []
      };
    };

    fetchAllProducts();
  }, [categoryId]);

  // Вычисляем min/max цены один раз при загрузке продуктов
  const { minPrice, maxPrice } = useMemo(() => {
    if (!allProducts.length) return { minPrice: 0, maxPrice: 70000 };
    const prices = allProducts.map(p => p.price).filter(p => p > 0);
    if (!prices.length) return { minPrice: 0, maxPrice: 70000 };
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    // Округляем для красивого отображения в слайдере
    return {
      minPrice: Math.floor(min / 1000) * 1000,
      maxPrice: Math.ceil(max / 1000) * 1000
    };
  }, [allProducts]); // Только при изменении allProducts

  // Предварительно вычисленные уникальные опции
  const uniqueOptions = useMemo(() => {
    if (!allProducts.length) {
      return {
        genderOptions: [{ value: 'all', label: 'Все' }],
        countryOptions: [{ value: 'all', label: 'Все' }],
        materialOptions: [],
        frameTypeOptions: [],
        colorOptions: fixedColorOptions,
        brandOptions: []
      };
    }

    // Используем Set для быстрого удаления дубликатов
    const genders = new Set();
    const countries = new Set();
    const materials = new Set();
    const frameTypes = new Set();
    const brands = new Set();

    allProducts.forEach(product => {
      if (product.gender && product.gender !== 'Унисекс') genders.add(product.gender);
      if (product.country && product.country !== 'Не указано') countries.add(product.country);
      if (product.type && product.type !== 'Не указан') frameTypes.add(product.type);
      if (product.brand && product.brand !== 'Без бренда') brands.add(product.brand);
      product.material.forEach(m => materials.add(m));
    });

    return {
      genderOptions: [
        { value: 'all', label: 'Все' },
        ...Array.from(genders).map(g => ({ value: g, label: g }))
      ],
      countryOptions: [
        { value: 'all', label: 'Все' },
        ...Array.from(countries).map(c => ({ value: c, label: c }))
      ],
      materialOptions: Array.from(materials).map(m => ({ value: m, label: m })),
      frameTypeOptions: Array.from(frameTypes).map(t => ({ value: t, label: t })),
      colorOptions: fixedColorOptions,
      brandOptions: Array.from(brands).map(b => ({ value: b, label: b }))
    };
  }, [allProducts]); // Только при изменении allProducts

  // Оптимизированная фильтрация с useMemo
  const filteredProducts = useMemo(() => {
    if (!allProducts.length) return [];

    // Быстрая фильтрация без создания промежуточных массивов
    const filtered = allProducts.filter(product => {
      // Проверяем самые быстрые фильтры сначала
      if (filters.gender !== 'all' && product.gender !== filters.gender) return false;
      if (filters.country !== 'all' && product.country !== filters.country) return false;
      if (product.price < priceRange.min || product.price > priceRange.max) return false;

      // Проверяем множественные фильтры (они медленнее)
      if (filters.material.length > 0 && !filters.material.some(mat => product.material.includes(mat)))
        return false;
      if (
        filters.frameType.length > 0 &&
        !filters.frameType.includes(product.type)
      )
        return false;
      if (filters.color.length > 0 && !filters.color.some(col => product.color.includes(col)))
        return false;
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;

      return true;
    });

    // Сортировка только если нужно
    if (sortBy !== 'default') {
      const sorted = [...filtered]; // Создаем копию только при необходимости сортировки
      switch (sortBy) {
        case 'price-low':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
          break;
      }
      return sorted;
    }

    return filtered;
  }, [allProducts, filters, sortBy, priceRange.min, priceRange.max]); // Зависимости только от примитивов

  // Пагинация
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return {
    products: paginatedProducts,
    loading,
    error,
    total: filteredProducts.length,
    minPrice,
    maxPrice,
    ...uniqueOptions
  };
};