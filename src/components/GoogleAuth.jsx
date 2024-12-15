import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { LogIn } from 'lucide-react';
import { fetchGoogleProfile, validateGoogleProfile, prepareUserData } from '../services/auth/googleAuth';
import { saveUserProfile } from '../services/auth/userAuth';
import { AuthContainer, ErrorMessage, GoogleButton } from './styles/AuthStyles';

const GoogleAuth = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (tokenResponse) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Get access token
      const accessToken = tokenResponse.access_token;
      if (!accessToken) {
        throw new Error('No access token received');
      }

      // Fetch Google profile
      const userProfile = await fetchGoogleProfile(accessToken);
      console.log('Got user profile:', userProfile);

      // Validate profile data
      validateGoogleProfile(userProfile);

      // Prepare user data
      const userData = prepareUserData(userProfile);
      console.log('Saving user data:', userData);

      // Save to backend
      const savedUser = await saveUserProfile(userData);
      console.log('User saved successfully:', savedUser);

      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('googleToken', accessToken);

      // Redirect to home
      window.location.href = '/home';
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => setError('Google sign in failed. Please try again.'),
    scope: 'email profile https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read'
  });

  return (
    <AuthContainer>
      <div className="flex flex-col items-center">
        <GoogleButton
          onClick={() => login()}
          disabled={isLoading}
          className={`flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
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