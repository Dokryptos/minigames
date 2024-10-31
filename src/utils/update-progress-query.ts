import { Progress } from '@/types/progress';
import { queryClient } from './query-client';
import queryKeys from '@/constants/query-keys';
import deepMerge from './deep-merge';
import { localStorageKeys } from '@/constants/local-storage';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

function updateProgressQuery(appId: string, update: DeepPartial<Progress>) {
  localStorage.getItem('token');

  queryClient.setQueryData<Progress>(
    queryKeys.progress(appId, localStorage.getItem(localStorageKeys.userId)),
    (data) => {
      if (!data) return data;

      const result = deepMerge(data, update);

      return result;
    }
  );
}

export default updateProgressQuery;
