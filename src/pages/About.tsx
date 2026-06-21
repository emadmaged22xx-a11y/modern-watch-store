import { Watch, Target, Eye, Award } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <Watch className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">من نحن</h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            تعرف على فكرة مشروع متجر الساعات الحديثة وأهدافه التعليمية
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* تعريف بالمتجر */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Watch className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">تعريف بالمتجر</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                متجر الساعات الحديثة هو مشروع جامعي يهدف إلى توضيح مفهوم تطبيق Full Stack باستخدام
                React.js في الواجهة الأمامية و Node.js مع Express في الواجهة الخلفية.
                يعرض المشروع تشكيلة من الساعات العالمية من ماركات مشهورة مع إمكانية التصفح والبحث والتفاصيل.
              </p>
            </div>

            {/* الرؤية */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">رؤيتنا</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                أن نكون نموذجاً تعليمياً ممتازاً يساعد الطلاب على فهم كيفية بناء تطبيق ويب
                متكامل باستخدام التقنيات الحديثة، مع التركيز على تنظيم الكود، التصميم الحديث،
                والتفاعل بين الواجهة الأمامية والخلفية.
              </p>
            </div>

            {/* الرسالة */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">رسالتنا</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                توفير بيئة تعليمية عملية تشرح بشكل مباشر مفاهيم تطوير الويب المتكامل،
                مع تطبيق حقيقي يمكن تشغيله والتفاعل معه، وكود نظيف مفصول بشكل صحيح
                بين Frontend و Backend.
              </p>
            </div>

            {/* الأهداف */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">أهداف المشروع</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">&#9679;</span>
                  <span>فهم العلاقة بين Frontend و Backend في تطبيق ويب حقيقي</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">&#9679;</span>
                  <span>تطبيق React Router للتنقل بين الصفحات في SPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">&#9679;</span>
                  <span>استخدام Axios للتواصل مع REST API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">&#9679;</span>
                  <span>تصميم واجهة حديثة باستخدام Tailwind CSS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">&#9679;</span>
                  <span>بناء Backend بـ Express.js مع تخزين بيانات في JSON</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
