import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Watch, ArrowLeft, Shield, Truck, Clock, HeartHandshake } from 'lucide-react';
import { getProducts, Product } from '../services/api';

export default function Home() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setLatestProducts(data.slice(0, 4));
      })
      .catch(() => {
        setLatestProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: 'جودة مضمونة',
      desc: 'جميع ساعاتنا أصلية 100% مع شهادة ضمان',
    },
    {
      icon: <Truck className="w-8 h-8 text-primary-600" />,
      title: 'توصيل سريع',
      desc: 'نوصل طلبك إلى باب منزلك في أسرع وقت',
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: 'دعم على مدار الساعة',
      desc: 'فريق دعم جاهز لمساعدتك في أي وقت',
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-primary-600" />,
      title: 'ضمان استرداد',
      desc: 'يمكنك إرجاع الساعة خلال 30 يوماً',
    },
  ];

  return (
    <div>
      {/* Hero Section - قسم الترحيب */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                <Watch className="w-4 h-4" />
                <span>أفضل تشكيلة ساعات في المنطقة</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                اكتشف أناقة الوقت مع متجر الساعات الحديثة
              </h1>
              <p className="text-primary-100 text-lg leading-relaxed">
                نقدم لك تشكيلة متنوعة من أفضل الساعات العالمية بأسعار تنافسية.
                سواء كنت تبحث عن ساعة رياضية أو كلاسيكية أو ذكية، لدينا ما يناسبك.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-primary-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  تصفح المنتجات
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  تعرف علينا
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="ساعة فاخرة"
                className="rounded-2xl shadow-2xl shadow-black/20 w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview - نبذة عن المتجر */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">نبذة عن المتجر</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              متجر الساعات الحديثة هو وجهتك المثالية للحصول على أفضل الساعات العالمية.
              نحن نؤمن بأن الساعة ليست مجرد أداة لمعرفة الوقت، بل هي تعبير عن شخصيتك وأناقتك.
              نختار لك بعناية أرقى الماركات العالمية لتكون دائماً في الموعد بأناقة.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Products - أحدث الساعات */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">أحدث الساعات</h2>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
          ) : latestProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-12">لا توجد منتجات حالياً</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-2">{product.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-primary-700">
                        {product.price.toLocaleString()} ر.س
                      </span>
                      <Link
                        to={`/products/${product.id}`}
                        className="text-sm text-gray-500 hover:text-primary-600 font-medium"
                      >
                        التفاصيل
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features - مزايا المتجر */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">لماذا تختار متجرنا؟</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">ابدأ رحلتك مع الوقت الآن</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            تصفح تشكيلتنا الواسعة واختر الساعة التي تعكس أسلوبك
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            تصفح المنتجات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
