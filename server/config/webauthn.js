import dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== 'production';

export const webAuthnConfig = {
  rpName: 'FitTrack',
  rpID: isDevelopment ? 'localhost' : process.env.DOMAIN,
  origin: isDevelopment ? 'https://flourishing-basbousa-b3c0d9.netlify.app/' : `https://${process.env.DOMAIN}`,
  expectedOrigin: isDevelopment ? 'https://flourishing-basbousa-b3c0d9.netlify.app/' : `https://${process.env.DOMAIN}`,
};

export const authenticatorSelection = {
  authenticatorAttachment: 'platform',
  userVerification: 'preferred',
  requireResidentKey: false,
};