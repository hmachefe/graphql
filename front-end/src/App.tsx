// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import GameListPage from './pages/GameListPage';
import GameDetailPage from './pages/GameDetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GameListPage />} />
      <Route path="/games/:id" element={<GameDetailPage />} />
    </Routes>
  );
}
