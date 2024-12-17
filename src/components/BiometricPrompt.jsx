import React, { useState } from 'react';
import { Fingerprint, Loader } from 'lucide-react';
import { startAuthentication } from '@simplewebauthn/browser';
import { authService } from '../services/auth/authService';

export default function BiometricPrompt({ onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuthenticate = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = JSON.parse(localStorage.getItem('userData'));
      const options = await authService.verifyBiometricLogin(userData.googleId);
      const credential = await startAuthentication(options);

      const verificationRes = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/api/auth/authenticate/${userData.googleId}/verify`,
        { credential },
        { withCredentials: true }
      );

      if (verificationRes.data.verified) {
        onSuccess();
      } else {
        throw new Error('Authentication failed');
      }
    } catch (err) {
      console.error('Error during biometric authentication:', err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-[#364958] mb-4">Biometric Authentication</h2>
        <p className="text-gray-600 mb-6">
          Please verify your identity using your device's biometric authentication.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleAuthenticate}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-[#55828B] text-white py-3 rounded-lg hover:bg-[#3B6064] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Fingerprint className="w-5 h-5" />
            )}
            {loading ? 'Verifying...' : 'Verify'}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}