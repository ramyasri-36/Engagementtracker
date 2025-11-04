import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { LowEngagement } from './pages/LowEngagement';
import { Feedback } from './pages/Feedback';
import { About } from './pages/About';
import './App.css';

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/low-engagement" element={<LowEngagement />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
