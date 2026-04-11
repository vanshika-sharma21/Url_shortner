import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import OAuthCallback from './pages/Auth/OAuthCallback';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
    console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    console.log("All env:", import.meta.env);
  }, []);
  
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/oauth-callback" element={<OAuthCallback />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <PrivateRoute>
                    <AnalyticsPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/analytics/:urlId" 
                element={
                  <PrivateRoute>
                    <AnalyticsPage />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;