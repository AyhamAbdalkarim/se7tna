# صحتنا | Sehetna

> منصة تقنية صحية تساعد على تحسين الوصول للخدمات الصحية وبناء تجربة صحية أفضل.
> A modern, responsive, multi-page static website for the **Sehetna** healthcare initiative.

موقع ثابت (Static Website) بالكامل مبني بـ HTML5 و CSS3 و JavaScript (Vanilla) — بدون أي خادم أو قاعدة بيانات — وجاهز للنشر المجاني عبر **GitHub Pages**.

---

## المعاينة السريعة

فقط افتح ملف `index.html` مباشرةً في المتصفح، ولا حاجة لأي إعداد.

للمعاينة عبر خادم محلي (اختياري):

```bash
# باستخدام Python
python -m http.server 8080
# ثم افتح: http://localhost:8080
```

---

## المميزات

- تصميم عصري احترافي بأسلوب "التقنية الصحية" (Healthcare Tech).
- **متعدد الصفحات** ومترابط بالكامل مع نفس شريط التنقل والتذييل.
- متجاوب بالكامل (Mobile-First) ويعمل على جميع الأحجام.
- دعم كامل للغة العربية واتجاه RTL.
- تأثيرات حركية ناعمة، تمرير سلس، وبطاقات بتصميم Glassmorphism.
- تحسينات SEO لكل صفحة (Meta + Open Graph).
- إمكانية وصول (Accessibility): HTML دلالي، ARIA، تباين جيد، وتنقل بلوحة المفاتيح.
- لا مكتبات ثقيلة — فقط Google Fonts و Font Awesome عبر CDN.

---

## بنية المشروع

```
se7tna/
│
├── index.html              # الصفحة الرئيسية
├── about.html              # من نحن (الرؤية، الرسالة، الأهداف)
├── projects.html           # معرض المشاريع
├── project-details.html    # تفاصيل مشروع (دراسة حالة)
├── services.html           # الخدمات
├── news.html               # الأخبار والفعاليات
├── team.html               # الفريق الطبي (أطباء، صيادلة، ممرضون...)
│
├── assets/
│   ├── css/
│   │   └── style.css       # كل تنسيقات الموقع
│   ├── js/
│   │   └── script.js       # كل وظائف JavaScript
│   └── images/
│       └── logo.png        # شعار صحتنا
│
└── README.md
```

---

## الألوان (هوية العلامة)

| العنصر        | اللون     |
| ------------- | --------- |
| Primary       | `#0F766E` |
| Secondary     | `#14B8A6` |
| Background     | `#F8FAFC` |
| Text          | `#1E293B` |

---

## وظائف JavaScript

- قائمة الجوال (Mobile menu toggle).
- تحديد الصفحة النشطة تلقائياً في شريط التنقل.
- تمرير سلس (Smooth scrolling) للروابط الداخلية.
- تأثيرات ظهور عند التمرير (Scroll reveal).
- عدّادات رقمية متحركة للإحصائيات.
- زر العودة للأعلى (Back to top).
- تحديث سنة الحقوق تلقائياً في التذييل.

---

## التواصل

يتم التواصل عبر البريد الإلكتروني وروابط التواصل الاجتماعي الموجودة في تذييل
(Footer) جميع الصفحات: `info@sehetna.org`.

---

## النشر المجاني عبر GitHub Pages

### 1) رفع المشروع إلى GitHub

إذا كان المستودع مربوطاً مسبقاً (كما هو الحال هنا):

```bash
git add .
git commit -m "Add Sehetna static website"
git push origin main
```

أو لإنشاء مستودع جديد:

```bash
git init
git add .
git commit -m "Initial commit: Sehetna website"
git branch -M main
git remote add origin https://github.com/USERNAME/se7tna.git
git push -u origin main
```

### 2) تفعيل GitHub Pages

1. افتح المستودع على GitHub.
2. اذهب إلى **Settings** ← **Pages**.
3. من قسم **Source** اختر الفرع **main** والمجلد **/ (root)**.
4. اضغط **Save**.

### 3) الوصول إلى الموقع

بعد دقيقة تقريباً سيكون الموقع متاحاً على:

```
https://USERNAME.github.io/se7tna/
```

> استبدل `USERNAME` باسم المستخدم الخاص بك على GitHub.
> لهذا المستودع: `https://ayhamabdalkarim.github.io/se7tna/`

لا يتطلب ذلك أي استضافة مدفوعة أو نطاق خاص.

---

## التقنيات المستخدمة

- HTML5 (Semantic)
- CSS3 (Custom properties, Grid, Flexbox, RTL)
- JavaScript (Vanilla, ES6+)
- [Google Fonts](https://fonts.google.com) — Tajawal & Poppins
- [Font Awesome 6](https://fontawesome.com) (عبر CDN)

---

## الترخيص

هذا المشروع من إعداد **فريق صحتنا التطوّعي** لأغراض الخدمة المجتمعية.
يمكنك استخدامه وتعديله بحرية.

© صحتنا Sehetna
