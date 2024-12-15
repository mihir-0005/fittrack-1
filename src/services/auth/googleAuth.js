import { handleApiError } from '../../utils/errorHandler';

export const fetchGoogleProfile = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Google profile');
    }
    
    const data = await response.json();
    console.log('Google profile data:', data); // Add logging
    return data;
  } catch (error) {
    console.error('Error fetching Google profile:', error);
    throw error;
  }
};

export const validateGoogleProfile = (profile) => {
  console.log('Validating profile:', profile); // Add logging
  if (!profile?.id || !profile?.email || !profile?.name) {
    throw new Error('Invalid Google profile data');
  }
  return true;
};

export const prepareUserData = (profile) => {
  const userData = {
    googleId: profile.id,
    email: profile.email,
    name: profile.name,
    picture: profile.picture,
  };
  console.log('Prepared user data:', userData); // Add logging
  return userData;
};