import { localStorageKeys } from '@/constants/local-storage';

const apiUrl = import.meta.env.VITE_API as string;
const cdnUrl = import.meta.env.VITE_CDN as string;
const enableShortcuts =
  localStorage.getItem(localStorageKeys.disableShortcuts) !== 'true' &&
  (import.meta.env.VITE_SHORCUTS === 'true' || import.meta.env.DEV);

/**
 * Sentry
 */
const sentryDSN = import.meta.env.VITE_SENTRY_DSN as string;
const sentryEnv = import.meta.env.VITE_SENTRY_ENV as string;
const sentryRelease = import.meta.env.VITE_SENTRY_RELEASE as string;

export { apiUrl, cdnUrl, enableShortcuts, sentryDSN, sentryEnv, sentryRelease };
