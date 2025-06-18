# AI Tech Portfolio - Mohamed H. Abdelaziz (Amrikyy)

A modern, interactive portfolio showcasing cutting-edge AI, quantum computing, and blockchain projects. Built with React, TypeScript, and advanced web technologies.

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
git clone https://github.com/Moeabdelaziz007/ai-tech-portfolio.git

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
## 🧪 Testing | الاختبارات

Run tests with Jest:

```bash
pnpm run test
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

Visit the live site: [https://Moeabdelaziz007.github.io/ai-tech-portfolio/](https://Moeabdelaziz007.github.io/ai-tech-portfolio/)

زور الموقع المباشر: [https://Moeabdelaziz007.github.io/ai-tech-portfolio/](https://Moeabdelaziz007.github.io/ai-tech-portfolio/)

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

- **GitHub**: [@Moeabdelaziz007](https://github.com/Moeabdelaziz007)
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

## 🌟 Featured Projects

### 1. Quantum Circuit Simulator
**Live Demo:** [Quantum Simulator](/projects/quantum-simulator)

An interactive quantum computing simulator that allows users to:
- Design quantum circuits with drag-and-drop interface
- Simulate quantum gates (X, Y, Z, H, CNOT, SWAP)
- View real-time measurement results and probabilities
- Explore educational examples (Bell states, GHZ states, superposition)
- Run both exact state vector calculations and sampling simulations

**Technologies:** React, TypeScript, Math.js, Chart.js, Quantum Computing

### 2. AI-Powered Analytics Dashboard
Advanced machine learning platform for real-time data analytics and predictive modeling.

**Technologies:** Python, TensorFlow, React, Node.js, Docker, Kubernetes

### 3. Blockchain Trading Bot
Automated cryptocurrency trading system with AI-driven market analysis.

**Technologies:** Python, PyTorch, FastAPI, Redis, PostgreSQL, Docker

### 4. Neural Network Visualizer
Interactive tool for visualizing and understanding deep learning architectures.

**Technologies:** React, D3.js, Three.js, Python, Flask

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Gemini API Key (for AI Code Assistant)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Moeabdelaziz007/ai-tech-portfolio.git
cd ai-tech-portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your free Gemini API key from: https://makersuite.google.com/app/apikey

4. Start the development server:
```bash
pnpm dev
```

5. Open http://localhost:5173 in your browser

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons

### Quantum Simulator
- **Math.js** - Mathematical operations
- **Chart.js** - Data visualization
- **React Chart.js 2** - Chart components

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
ai-tech-portfolio/
├── src/
│   ├── components/          # Main portfolio components
│   ├── projects/           # Project-specific components
│   │   └── quantum-simulator/
│   │       ├── components/ # Quantum simulator components
│   │       ├── lib/        # Simulation logic
│   │       └── pages/      # Project pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── App.tsx             # Main application
├── public/
│   ├── data/               # JSON data files
│   └── images/             # Static images
└── package.json
```

## 🎯 Features

### Portfolio Features
- **Responsive Design** - Works on all devices
- **Dark Theme** - Modern dark UI with neon accents
- **Smooth Animations** - Framer Motion powered transitions
- **Interactive Sections** - Hero, About, Projects, Dashboard, Contact
- **AI Chatbot** - Bilingual Arabic/English assistant
- **SEO Optimized** - Meta tags, sitemap, robots.txt

### Quantum Simulator Features
- **Circuit Editor** - Visual quantum circuit builder
- **Gate Library** - X, Y, Z, H, CNOT, SWAP gates
- **Real-time Simulation** - Instant results and visualization
- **Multiple Modes** - Exact calculations vs. sampling
- **Educational Examples** - Pre-built quantum states
- **Measurement Statistics** - Detailed probability analysis

## 🚀 Deployment

### GitHub Pages
The project is automatically deployed to GitHub Pages via GitHub Actions.

**Live Site:** https://moeabdelaziz007.github.io/ai-tech-portfolio

### Manual Deployment
```bash
# Build for production
pnpm build

# Deploy to GitHub Pages
pnpm deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohamed H. Abdelaziz (Amrikyy)**
- GitHub: [@Moeabdelaziz007](https://github.com/Moeabdelaziz007)
- LinkedIn: [Mohamed Abdelaziz](https://linkedin.com/in/mohamed-abdelaziz-ai)

## 🙏 Acknowledgments

- Quantum computing concepts and algorithms
- React and TypeScript communities
- Open source contributors
- AI and machine learning research community

---

**Built with 🤖 AI • ⚡ Tech • 🔮 Quantum Innovation**
