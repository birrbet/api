import { google } from 'googleapis';

export const identityToolkit = google.identitytoolkit({
  auth: process.env.GOOGLE_API_KEY,
  version: 'v3',
});

export const IDENTITY_TOOLKIT = 'IDENTITY_TOOLKIT';
