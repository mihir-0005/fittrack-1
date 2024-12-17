import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

export const authService = {
  async authenticateWithGoogle(accessToken) {
    try {
      // Fetch Google profile
      const profileResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      if (!profileResponse.ok) {
        throw new Error('Failed to fetch Google profile');
      }
      
      const profile = await profileResponse.json();
      
      // Save user data
      const userData = {
        googleId: profile.id,
        email: profile.email,
        name: profile.name,
        picture: profile.picture
      };

      // Create/update user in backend
      const response = await axios.post(`${API_ENDPOINTS.BASE_URL}/api/users`, userData);
      
      // Store auth data
      localStorage.setItem('googleToken', accessToken);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return response.data;
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Authentication failed. Please try again.');
    }
  },

  async setupBiometrics(googleId) {
    try {
      // Get registration options
      const optionsResponse = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/api/auth/register/${googleId}/challenge`,
        {},
        { withCredentials: true }
      );

      return optionsResponse.data;
    } catch (error) {
      console.error('Biometric setup error:', error);
      throw new Error('Failed to setup biometric authentication');
    }
  },

  async verifyBiometricRegistration(googleId, credential) {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/api/auth/register/${googleId}/verify`,
        { credential },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.error('Biometric verification error:', error);
      throw new Error('Failed to verify biometric registration');
    }
  },

  async verifyBiometricLogin(googleId) {
    try {
      const optionsResponse = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/api/auth/authenticate/${googleId}/challenge`,
        {},
        { withCredentials: true }
      );

      return optionsResponse.data;
    } catch (error) {
      console.error('Biometric login error:', error);
      throw new Error('Failed to verify biometric login');
    }
  }
};