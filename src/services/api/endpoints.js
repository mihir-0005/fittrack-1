// API endpoints configuration
const BASE_URL = 'https://fittrack-1-yefe.onrender.com/api';

export const ENDPOINTS = {
  workouts: {
    base: `${BASE_URL}/workouts`,
    byUser: (userId) => `${BASE_URL}/workouts/user/${userId}`,
    byId: (id) => `${BASE_URL}/workouts/${id}`
  },
  users: {
    base: `${BASE_URL}/users`,
    byId: (id) => `${BASE_URL}/users/${id}`,
    onboarding: `${BASE_URL}/users/onboarding`
  },
  auth: {
    base: `${BASE_URL}/auth`,
    register: (googleId) => `${BASE_URL}/auth/register/${googleId}`,
    authenticate: (googleId) => `${BASE_URL}/auth/authenticate/${googleId}`
  },
  diet: {
    base: `${BASE_URL}/diet/entries`,
    daily: (userId) => `${BASE_URL}/diet/entries/${userId}/daily`,
    weekly: (userId) => `${BASE_URL}/diet/entries/${userId}/weekly`
  },
  challenges: {
    base: `${BASE_URL}/challenges`,
    join: (id) => `${BASE_URL}/challenges/${id}/join`
  },
  posts: {
    base: `${BASE_URL}/posts`,
    like: (id) => `${BASE_URL}/posts/${id}/like`,
    comments: (id) => `${BASE_URL}/posts/${id}/comments`
  }
};