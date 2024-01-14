// authConfig.js
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './msalConfig'; // Ensure this path is correct

export const msalInstance = new PublicClientApplication(msalConfig);

console.log('MSAL Instance:', msalInstance);
