import { Watch, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* معلومات المشروع */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Watch className="w-6 h-6 text-primary-400" />
              <h3 className="text-lg font-bold">متجر الساعات الحديثة</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              مشروع جامعي لتوضيح مفهوم تطبيق Full Stack باستخدام React و Express.
              يعرض مجموعة متنوعة من الساعات العالمية بجودة عالية.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/" className="hover:text-primary-400 transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-primary-400 transition-colors">
                  المنتجات
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary-400 transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary-400 transition-colors">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h4 className="text-lg font-bold mb-4">معلومات التواصل</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+963 933 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>info@modernwatchsyria.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>دمشق، سوريا</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>
            &copy; {currentYear} متجر الساعات الحديثة. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
