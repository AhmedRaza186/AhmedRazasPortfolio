# Ahmed Raza's Personal Portfolio

Welcome to the frontend repository for Ahmed Raza's interactive and premium personal portfolio! This web application showcases my professional journey, skills, projects, and achievements as a Full Stack Developer. It features modern design aesthetics, smooth animations, and an integrated AI Assistant.

## 🔗 Links

- **Live Frontend Portfolio:** [https://ahmed-razas-portfolio.vercel.app](https://ahmed-razas-portfolio.vercel.app)
- **Live Backend API:** [https://ahmedrazassportfolio-backend.vercel.app](https://ahmedrazassportfolio-backend.vercel.app)
- **Backend Repository:** [https://github.com/AhmedRaza186/AhmedRaza-sPortfolio-backend](https://github.com/AhmedRaza186/AhmedRaza-sPortfolio-backend)

## ✨ Features

- **Integrated AI Assistant:** A custom chatbot built into the UI that communicates with the Groq-powered backend API to answer visitor questions dynamically, perfectly matching language and script (English, Roman Urdu, Urdu).
- **Smooth Animations & Interactions:** Utilizes **GSAP (GreenSock)** for sophisticated page transitions, hover effects, and micro-animations, delivering a premium "wow" factor.
- **Fluid Smooth Scrolling:** Integrates **Lenis** to provide buttery smooth scrolling experiences across all devices.
- **Dynamic Routing:** Built with **React Router v7** for seamless, single-page application navigation between Home, Work, About, Achievements, Journey, and Contact sections.
- **Modern Styling:** Designed using **Tailwind CSS v4**, featuring a carefully crafted dark-mode-first premium aesthetic, glassmorphism, and responsive layouts.
- **Custom Markdown Rendering:** A lightweight, secure, custom `MarkdownRenderer` built specifically to parse AI responses without injecting dangerous HTML, ensuring internal and external links work correctly.
- **Contact Form:** Integrated with **EmailJS** to allow visitors to send direct messages without needing a dedicated backend mail server.

## 🛠️ Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP
- **Scroll Management:** Lenis
- **Routing:** React Router DOM
- **Forms/Email:** EmailJS

## 🚀 Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedRaza186/AhmedsPortfolio.git
   cd AhmedsPortfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating a `.env` file in the root directory:
   ```env
   # Ensure you don't include a trailing slash in the URL
   VITE_BACKEND_URL="http://localhost:8000"
   ```
   *(Update any other keys like EmailJS service IDs if necessary).*
4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:5173`.

## 📦 Deployment (Vercel)

This project is optimized for deployment on Vercel. 
- Ensure that the environment variable `VITE_BACKEND_URL` is set to the live backend route (e.g., `https://ahmedrazassportfolio-backend.vercel.app`) in your Vercel Project Settings.
- The build command `npm run build` uses Vite to output the optimized static production bundle.
