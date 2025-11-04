import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { LowEngagement } from './pages/LowEngagement';
import { Feedback } from './pages/Feedback';
import { About } from './pages/About';
import './App.css';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Navigation />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/low-engagement" element={<LowEngagement />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
