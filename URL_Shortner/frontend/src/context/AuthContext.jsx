import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';//This hook lets you redirect users programmatically (e.g., after login or logout).
import api from '../api/authApi';

const AuthContext = createContext();//Creates the context — kind of like a global store to hold and share auth data.

export const AuthProvider = ({ children }) => {//A component that wraps your app and provides auth data/functions to every child component.
  const [user, setUser] = useState(null);//null means no one is logged in.
  const [loading, setLoading] = useState(true);//Tracks whether we're still checking if a user is already logged in (used for loading states).
  const navigate = useNavigate();//Hook to redirect users to pages programmatically.

  useEffect(() => {//This runs once when the app loads.Checks if the user is already logged in by verifying their token.
    const checkAuth = async () => {//If there's a saved token in localStorage, attach it to all future Axios requests.
      try {
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const { data } = await api.get('/api/auth/me');
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);//Once the check is done, we’re no longer "loading".
      }
    };
    
    checkAuth();
  }, []);//[]: means this effect runs only once on page load.

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/api/auth/login', credentials);//Sends login request.
      localStorage.setItem('token', data.token);//Saves the token.
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;//Adds the token to Axios so all requests are authenticated.
      
      const userResponse = await api.get('/api/auth/me');
      setUser(userResponse.data.user);
      navigate('/dashboard');
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const register = async (userData) => {
    try {
      await api.post('/api/auth/register', userData);
      await login({ email: userData.email, password: userData.password });
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const handleOAuthLogin = (token) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Fetch user details
    api.get('/api/auth/me')//Fetches user info after OAuth and sets it.
      .then(response => {
        setUser(response.data.user);
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Failed to fetch user after OAuth:', error);
        logout();
      });
  };

  return (//Makes all these variables and functions available throughout the app (to pages/components that call useAuth()).
    <AuthContext.Provider value={{ user, loading, login, register, logout, handleOAuthLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
//Custom hook to easily access this context in any component using : const { user, login } = useAuth();
export const useAuth = () => useContext(AuthContext);