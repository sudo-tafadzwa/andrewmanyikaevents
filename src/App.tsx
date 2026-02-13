import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ValentineLanding } from './pages/ValentineLanding';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ValentineLanding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
