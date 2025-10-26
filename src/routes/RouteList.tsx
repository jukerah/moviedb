import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const RouteList = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/search" element={<SearchPage />} />

      <Route path="/movie/:id" element={<MovieDetailsPage />} />

      <Route path="/favorites" element={<FavoritesPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);
