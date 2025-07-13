import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOAuthLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      navigate('/login', { state: { error } });
    } else if (token) {
      handleOAuthLogin(token);
    } else {
      navigate('/login');
    }
  }, [location, navigate, handleOAuthLogin]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing OAuth Login...</h1>
        <p>Please wait while we authenticate you.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;