import { progressService } from '@/services/progress';
import { Progress } from '@/types/progress';
import { enableShortcuts } from './env';
import { localStorageKeys } from '@/constants/local-storage';

const restoreSave = enableShortcuts
  ? async (appId: string, save: Progress) => {
      if (!enableShortcuts) {
        return;
      }

      await progressService.delete(appId);
      await progressService.update(appId, save);

      localStorage.removeItem(localStorageKeys.app2.machine);
      localStorage.removeItem(localStorageKeys.beaurecueil.machine);
      sessionStorage.clear();
    }
  : () => {};

export default restoreSave;
