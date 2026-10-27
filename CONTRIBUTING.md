# Contributing to CoderDojo Braga (kunai)

Thank you for your interest in contributing to the CoderDojo Braga website!

Please make sure to read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) in all community interactions.

---

## 📥 Prerequisites

To run this project locally, you need:

- **[Bun](https://bun.sh/)** or other JS package manager and runtime
- **Git**

---

## 🔧 Setup & Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/coderdojobraga/kunai.git
   cd kunai
   ```

2. **Install dependencies:**

   ```bash
   bun install
   # or: npm install
   ```

3. **Configure environment variables (optional):**
   If you need to access the `/backoffice` administration panel:

   ```bash
   cp env.example .env
   ```

   Edit `.env` to set your desired `BACKOFFICE_PASSWORD` and `BACKOFFICE_SECRET`.

4. **Start the development server:**
   ```bash
   bun dev
   # or: npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔨 Scripts

- **`bun dev`** – Start the development server with hot-reload Turbopack.
- **`bun run build`** – Build the production bundle and verify type-checking.
- **`bun run lint`** – Run ESLint checks across the codebase.

---

## 🚀 Pull Request Workflow

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make clean, atomic changes.
3. Ensure your code passes build and linting before submitting:
   ```bash
   bun run lint
   bun run build
   ```
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: ...`, `fix: ...`, `chore: ...`).
5. Open a Pull Request against the `main` branch with a clear description of what changed.
