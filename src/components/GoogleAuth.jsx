import React from 'react';
import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { userAPI } from '../services/api';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const fetchUserProfile = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile from Google');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Google profile:', error);
    throw error;
  }
};
console.log(response)
const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = async (tokenResponse) => {
    try {
      const accessToken = tokenResponse.access_token;
      const userProfile = await fetchUserProfile(accessToken);
      
      if (!userProfile) {
        throw new Error('Failed to fetch user profile');
      }

      // Transform Google profile data
      const userData = {
        googleId: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        picture: userProfile.picture,
      };

      // Save user data to MongoDB
      await userAPI.saveProfile(userData);

      // Store necessary data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('googleToken', accessToken);

      // Reload the page to trigger the onboarding check
      window.location.reload();
    } catch (error) {
      console.error('Authentication error:', error);
      // You might want to show an error message to the user here
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => console.error('Google login failed'),
    scope: `
      email profile 
      https://www.googleapis.com/auth/fitness.activity.read 
      https://www.googleapis.com/auth/fitness.heart_rate.read 
      https://www.googleapis.com/auth/fitness.sleep.read
    `.replace(/\s+/g, ' '),
  });

  return (
    <AuthContainer>
      <button
        onClick={() => login()}
        className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
      >
        <LogIn className="w-5 h-5" />
        <span>Sign in with Google</span>
      </button>
    </AuthContainer>
  );
};

export default GoogleAuth;