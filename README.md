# 👨‍💻 Kittanate Thanee - Interactive Developer Portfolio

This is my personal portfolio, packed with interactivity and built for top-notch performance using **Next.js** and **Tailwind CSS.** It's not just about listing projects and experience—it's a way to show off my skills in DOM manipulation, smooth rendering, and creative UX/UI design.

![Screenshot of the portfolio](https://img2.pic.in.th/Screenshot-2026-03-03-115741.png)

---

## ✨ Key Features & Architecture

This portfolio goes beyond a typical static site by incorporating advanced frontend techniques for a highly engaging user experience:

- **🦎 Smart Interactive Mascot:** A custom SVG iguana that brings the page to life. It uses `IntersectionObserver` and custom DOM events to seamlessly hop between sections, track mouse movements, and react to UI changes (like hiding itself when a modal opens).
- **🌌 Smooth Canvas Background:** The background particle effects are built using the HTML5 `<canvas>` API instead of heavy DOM elements. This ensures a fluid, 60FPS parallax scrolling experience without slowing down the browser.
- **⚡ Hardware-Accelerated Animations:** Powered by Anime.js, the animations rely strictly on CSS transforms (like translate, scale, and rotate) rather than layout-altering properties. This minimizes browser repaints and keeps the performance highly efficient.
- **🧱 Data-Driven Architecture:** Built with the "separation of concerns" principle. All content—such as the bio, experience, and projects—is fully decoupled from the UI and managed centrally in a simple `src/data/data.json` file.
- **💡 Engaging Micro-Interactions:** Includes dynamic spotlight hover effects driven by CSS variables and JS, organic staggered delays, and a live real-time counter tracking current job tenure.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Anime.js](https://animejs.com/)
- **Carousel:** [React Slick](https://react-slick.neostack.com/)
- **Language:** TypeScript / React (Strict Mode)

---

## 🚀 How to Get It Running

Want to try this out on your own machine? Here's the quick guide:

### What You'll Need
Node.js (version 18.x or higher works best).

### 1. Clone the Repo
```bash
git clone https://github.com/Kittanate-Th/profile.git
cd profile
```
### 2. Install Dependencies
```bash
npm install
# Or use yarn install / pnpm install if you prefer
```
### 3. Start the Dev Server
```bash
npm run dev
# http://localhost:3000 in your browser
```

### 📂 Updating Content
I made this easy to maintain—no need to poke around in React components. Just edit src/data/data.json, and the UI will update automatically.
````json
// Example from src/data/data.json
{
  "experience": [
    {
      "id": "1",
      "type": "work",
      "title": "Software Engineer",
      "organization": "Nasa",
      "period": "August 2025 - Present",
      "startDate": "2025-08-01", 
      "description": "Your detailed accomplishments here..."
    }
  ]
}
````

### 📬Get in Touch
Im on the lookout for mew opportunities feel free to reach out!!

- LinkedIn:  [Kittanate Thanee](https://www.linkedin.com/in/kittanate-thanee-674b092b3/)
- Email:  kittanate.th@gmail.com
