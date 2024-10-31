import { localStorageKeys } from './local-storage';

const queryKeys = {
  progress: (appId: string, userId: string | null | undefined) => ['progress', appId, userId] as const,
  user: () => ['user', localStorage.getItem(localStorageKeys.token)] as const,
};

export default queryKeys;
