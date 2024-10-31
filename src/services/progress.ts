import { localStorageKeys } from '@/constants/local-storage';
import gameData from '@/data/app-2/game';
import { DeepPartial } from '@/types/deep-partial';
import { Progress } from '@/types/progress';
import request from '@/utils/request';
import updateProgressQuery from '@/utils/update-progress-query';

const DEFAULT_APP_ID = gameData.id;

class ProgressService {
  get(appId: string = DEFAULT_APP_ID) {
    return request<Progress>(`/progress/${appId}`);
  }

  /**
   * Delete the progress of the current app
   */
  async delete(appId: string = DEFAULT_APP_ID) {
    await request(`/progress/${appId}`, { method: 'DELETE' });

    const keys = Object.values(localStorageKeys[appId as keyof typeof localStorageKeys]);
    keys.forEach((key) => localStorage.removeItem(key));

    sessionStorage.clear();
  }

  /**
   * Main method
   */
  async update(appId: string, data: DeepPartial<Progress>) {
    updateProgressQuery(appId, data);

    return request(`/progress/${appId}`, { method: 'PUT', data });
  }

  /**
   * Mark a quizz as completed
   */
  async completeQuizz(boxId: number) {
    await this.update(DEFAULT_APP_ID, { quizzes: { [boxId]: true } });

    updateProgressQuery(DEFAULT_APP_ID, { quizzes: { [boxId]: true } });
  }
}

export const progressService = new ProgressService();
