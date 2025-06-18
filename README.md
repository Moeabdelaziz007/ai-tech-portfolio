# AI Tech Portfolio | معرض أعمال الذكاء الاصطناعي

A modern, responsive portfolio website showcasing AI and technology projects. Built with React, TypeScript, Vite, and Tailwind CSS.

موقع معرض أعمال حديث ومتجاوب يعرض مشاريع الذكاء الاصطناعي والتكنولوجيا. مبني باستخدام React و TypeScript و Vite و Tailwind CSS.

## 🚀 Features | المميزات

- **Modern UI/UX** | واجهة مستخدم حديثة
- **Responsive Design** | تصميم متجاوب
- **Dark/Light Theme** | سمة داكنة/فاتحة
- **Interactive Components** | مكونات تفاعلية
- **Performance Optimized** | محسن للأداء
- **SEO Friendly** | صديق لمحركات البحث

## 🛠️ Tech Stack | التقنيات المستخدمة

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Charts**: Chart.js, Recharts
- **Icons**: Lucide React, React Icons

## 📦 Installation | التثبيت

```bash
# Clone the repository | استنسخ المستودع
git clone https://github.com/cryptojoker710/ai-tech-portfolio.git

# Navigate to project directory | انتقل إلى مجلد المشروع
cd ai-tech-portfolio

# Install dependencies | ثبت التبعيات
pnpm install

# Start development server | ابدأ خادم التطوير
pnpm run dev
```

## 🚀 Development | التطوير

```bash
# Start development server | ابدأ خادم التطوير
pnpm run dev

# Build for production | ابنِ للإنتاج
pnpm run build

# Preview production build | اعرض بناء الإنتاج
pnpm run preview

# Run linting | تشغيل فحص الكود
pnpm run lint
```

## 🌐 Deployment | النشر

This project is automatically deployed to GitHub Pages using GitHub Actions.

يتم نشر هذا المشروع تلقائياً على GitHub Pages باستخدام GitHub Actions.

### Manual Deployment | النشر اليدوي

```bash
# Build the project | ابنِ المشروع
pnpm run build

# Deploy to GitHub Pages | انشر على GitHub Pages
pnpm run deploy
```

### Live Demo | العرض المباشر

Visit the live site: [https://cryptojoker710.github.io/ai-tech-portfolio/](https://cryptojoker710.github.io/ai-tech-portfolio/)

زور الموقع المباشر: [https://cryptojoker710.github.io/ai-tech-portfolio/](https://cryptojoker710.github.io/ai-tech-portfolio/)

## 📁 Project Structure | هيكل المشروع

```
ai-tech-portfolio/
├── public/                 # Static assets | الأصول الثابتة
├── src/
│   ├── components/         # React components | مكونات React
│   │   ├── ui/            # UI components | مكونات الواجهة
│   │   └── ...            # Feature components | مكونات الميزات
│   ├── hooks/             # Custom hooks | خطافات مخصصة
│   ├── lib/               # Utility functions | دوال مساعدة
│   └── main.tsx           # App entry point | نقطة دخول التطبيق
├── .github/workflows/     # GitHub Actions | إجراءات GitHub
└── ...                    # Configuration files | ملفات الإعداد
```

## 🤝 Contributing | المساهمة

1. Fork the repository | انسخ المستودع
2. Create a feature branch | أنشئ فرع ميزة
3. Make your changes | أجرِ تغييراتك
4. Test thoroughly | اختبر بدقة
5. Submit a pull request | أرسل طلب سحب

## 📄 License | الترخيص

This project is licensed under the MIT License.

هذا المشروع مرخص تحت رخصة MIT.

## 📞 Contact | التواصل

- **GitHub**: [@cryptojoker710](https://github.com/cryptojoker710)
- **Email**: [Your Email | بريدك الإلكتروني]

---

Made with ❤️ using modern web technologies

مصنوع بـ ❤️ باستخدام تقنيات الويب الحديثة

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
