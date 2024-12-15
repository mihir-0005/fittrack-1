import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { API_ENDPOINTS } from '../config/apiConfig';
import axios from 'axios';

export const setupBiometricAuth = async (googleId) => {
  try {
    // Get registration options
    const optionsRes = await axios.post(
      `${API_ENDPOINTS.BASE_URL}/api/auth/register/${googleId}/challenge`,
      {},
      { withCredentials: true }
    );

    // Start registration process
    const credential = await startRegistration(optionsRes.data);

    // Verify registration
    const verificationRes = await axios.post(
      `${API_ENDPOINTS.BASE_URL}/api/auth/register/${googleId}/verify`,
      { credential },
      { withCredentials: true }
    );

    return verificationRes.data.verified;
  } catch (error) {
    console.error('Biometric setup error:', error);
    throw new Error(error.response?.data?.error || 'Failed to setup biometric authentication');
  }
};

export const verifyBiometricAuth = async (googleId) => {
  try {
    // Get authentication options
    const optionsRes = await axios.post(
      `${API_ENDPOINTS.BASE_URL}/api/auth/authenticate/${googleId}/challenge`,
      {},
      { withCredentials: true }
    );

    // Start authentication process
    const credential = await startAuthentication(optionsRes.data);

    // Verify authentication
    const verificationRes = await axios.post(
      `${API_ENDPOINTS.BASE_URL}/api/auth/authenticate/${googleId}/verify`,
      { credential },
      { withCredentials: true }
    );

    return verificationRes.data.verified;
  } catch (error) {
    console.error('Biometric verification error:', error);
    throw new Error(error.response?.data?.error || 'Failed to verify biometric authentication');
  }
};