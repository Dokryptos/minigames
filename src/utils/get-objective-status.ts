import { Episode } from '@/types/episode';
import { Progress } from '@/types/progress';
import getEpisodeProgress from './get-episode-progress';

const getObjectiveStatus = (
  progress: Progress | undefined,
  episodeId: Episode['id'],
  objectiveId: number | string
) => getEpisodeProgress(progress, episodeId)?.objectives?.[objectiveId]?.status;

export default getObjectiveStatus;
