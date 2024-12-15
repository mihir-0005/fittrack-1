const handleSuccess = async (tokenResponse) => {
  try {
    setError('');
    const accessToken = tokenResponse.access_token;
    console.log('Got access token:', accessToken);
    
    const userProfile = await fetchGoogleProfile(accessToken);
    console.log('Got user profile:', userProfile);
    
    if (!userProfile) {
      throw new Error('Failed to fetch user profile');
    }

    const userData = {
      googleId: userProfile.id,
      email: userProfile.email,
      name: userProfile.name,
      picture: userProfile.picture,
    };
    console.log('Saving user data:', userData);

    await saveUserProfile(userData);
    console.log('Profile saved successfully');

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('googleToken', accessToken);

    window.location.reload();
  } catch (error) {
    console.error('Authentication error:', error);
    setError('Failed to sign in. Please try again.');
  }
};
