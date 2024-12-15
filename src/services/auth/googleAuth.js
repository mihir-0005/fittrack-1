import { handleApiError } from '../../utils/errorHandler';

export const fetchGoogleProfile = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google API error:', errorData);
      throw new Error(`Failed to fetch Google profile: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log('Google profile data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching Google profile:', error);
    throw error;
  }
};

export const validateGoogleProfile = (profile) => {
  console.log('Validating profile:', profile);
  
  if (!profile) {
    throw new Error('Profile data is missing');
  }
  
  const requiredFields = ['id', 'email', 'name'];
  const missingFields = requiredFields.filter(field => !profile[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
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
  
  console.log('Prepared user data:', userData);
  return userData;
};