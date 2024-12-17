import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { LogIn } from 'lucide-react';
import { authService } from '../services/auth/authService';
import { AuthContainer, ErrorMessage, GoogleButton } from './styles/AuthStyles';

const GoogleAuth = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (tokenResponse) => {
    try {
      setIsLoading(true);
      setError('');
      
      const accessToken = tokenResponse.access_token;
      if (!accessToken) {
        throw new Error('No access token received');
      }

      await authService.authenticateWithGoogle(accessToken);
      window.location.href = '/home';
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => setError('Google sign in failed'),
    scope: 'email profile'
  });

  return (
    <AuthContainer>
      <div className="flex flex-col items-center">
        <GoogleButton
          onClick={() => login()}
          disabled={isLoading}
          className={`flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg 
            shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <LogIn className="w-5 h-5" />
          <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
        </GoogleButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </AuthContainer>
  );
};

export default GoogleAuth;