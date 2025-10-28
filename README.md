# TMDB Movie System

This project is a React + TypeScript application that allows users to explore movies, create favorite lists, and discover new content using the [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

🌐 **Access the live application:** [https://moviedb-mauve.vercel.app](https://www.themoviedb-mauve.vercel.app)

---

## 🔑 TMDB API Configuration

To ensure the application works correctly, you need to configure the [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

### 1. Create an account and generate a token

1. Create a free account at: [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Generate your **API Key** (Read Access Token) at: [API Settings](https://www.themoviedb.org/settings/api)

### 2. Environment variable

Create a `.env` file in the project root (do not commit this file) based on `.env.example`:

```env
VITE_TMDB_KEY="INSERT_YOUR_READ_ACCESS_TOKEN_HERE"
```

---

## 🚀 Available Scripts

Make sure you are using **Node.js 22.21.0** or higher.

```bash
# Install dependencies
npm install

# Run the application in development mode
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Run unit tests
npm run test
```
