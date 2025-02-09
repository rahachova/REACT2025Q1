import './App.css';
import { Home } from './components/home/Home';
import { Routes, Route } from 'react-router';
import { MovieDetails } from './components/movie-details/MovieDetails';
import { NotFound } from './components/not-found/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<MovieDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
