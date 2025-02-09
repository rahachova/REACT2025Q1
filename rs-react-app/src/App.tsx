import './App.css';
import { Home } from './components/home/Home';
import { Routes, Route } from 'react-router';
import { MovieDetails } from './components/movie-details/MovieDetails';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<MovieDetails />} />
      </Route>
    </Routes>
  );
}
