import React, { useState } from 'react';
import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';
import { LogIn } from 'lucide-react';
import { fetchGoogleProfile, saveUserProfile } from '../services/authService';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
`;

const GoogleAuth = () => {
  const [error, setError] = useState('');

  const handleSuccess = async (tokenResponse) => {
    try {
      setError('');
      const accessToken = tokenResponse.access_token;
      const userProfile = await fetchGoogleProfile(accessToken);
      
      if (!userProfile) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = {
        googleId: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        picture: userProfile.picture,
      };

      await saveUserProfile(userData);

      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('googleToken', accessToken);

      window.location.reload();
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Failed to sign in. Please try again.');
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => setError('Google sign in failed. Please try again.'),
    scope: `
      email profile 
      https://www.googleapis.com/auth/fitness.activity.read 
      https://www.googleapis.com/auth/fitness.heart_rate.read 
      https://www.googleapis.com/auth/fitness.sleep.read
    `.replace(/\s+/g, ' '),
  });

  return (
    <AuthContainer>
      <div className="flex flex-col items-center">
        <button
          onClick={() => login()}
          className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </AuthContainer>
  );
};

export default GoogleAuth;