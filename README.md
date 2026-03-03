# 👨‍💻 Kittanate Thanee - Interactive Developer Portfolio

A highly interactive, performance-optimized personal portfolio built with **Next.js** and **Tailwind CSS**. Designed to showcase not just projects and experience, but also a deep understanding of DOM manipulation, rendering performance, and creative UX/UI design.

> 📸 <img src="https://img2.pic.in.th/Screenshot-2026-03-03-115741.png" alt="Screenshot 2026 03 03 115741" border="0" width="800">

---

## ✨ Key Features & Architecture

This portfolio goes beyond static text by implementing advanced frontend techniques:

- **🦎 Context-Aware Interactive Mascot:** A custom SVG Iguana mascot built entirely with code (no external image assets). It utilizes `IntersectionObserver` and custom DOM events to jump between components, track mouse movements, and react to UI states (e.g., hiding when a modal opens).
- **🌌 High-Performance Canvas Background:** Instead of rendering hundreds of DOM elements for the particle background, it uses the HTML5 `<canvas>` API. This ensures a buttery-smooth 60FPS parallax scrolling experience without causing browser layout thrashing.
- **⚡ Hardware-Accelerated Animations:** Powered by **Anime.js**, utilizing CSS transforms (`translate`, `scale`, `rotate`) instead of altering margins/paddings, ensuring minimal layout repaints.
- **🧱 Data-Driven Architecture:** Follows the "Separation of Concerns" principle. All content (Bio, Experience, Projects) is decoupled from the UI components and strictly managed via a centralized `src/data/data.json` file.
- **💡 Advanced Micro-Interactions:** Features dynamic Spotlight Hover effects (using CSS custom properties via JS), organic staggering delays, and a live real-time tenure counter.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Anime.js](https://animejs.com/)
- **Carousel:** [React Slick](https://react-slick.neostack.com/)
- **Language:** TypeScript / React (Strict Mode)

---

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have Node.js installed (v18.x or later is recommended).

### 1. Clone the repository
```bash
git clone [https://github.com/Kittanate-Th/profile.git](https://github.com/Kittanate-Th/profile.git)
cd profile
```
### 2. Install dependencies
```bash
npm install
# or yarn install / pnpm install
```
### 3.Run the development server
```bash
npm run dev
#Open http://localhost:3000 with your browser to see the result.
```
### 📂 Content Management (How to update)
This project is built with maintainability in mind. You do not need to dig into the React components to update your resume details.

Simply open src/data/data.json and modify the objects. The UI will automatically adapt and render the new data.

````json
// Example: src/data/data.json
{
  "experience": [
    {
      "id": "1",
      "type": "work",
      "title": "Programmer",
      "organization": "LONGBEE PACKAGING CO., LTD.",
      "period": "August 2025 - Present",
      "startDate": "2025-08-01", 
      "description": "Your detailed accomplishments here..."
    }
  ]
}
````

### 📬 Contact
```text
I'm currently open to new opportunities! Feel free to reach out:

- **LinkedIn:** [Kittanate Thanee](https://www.linkedin.com/in/kittanate-thanee-674b092b3/)
- **Email:** [kittanate.th@gmail.com](mailto:kittanate.th@gmail.com)
```