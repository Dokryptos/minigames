import { Episode } from '@/types/episode';
import { Progress } from '@/types/progress';

const getEpisodeProgress = (progress: Progress | undefined, episodeId: Episode['id']) =>
  progress?.boxes?.[`box_${episodeId}`] ||
  (progress?.episodes?.[
    `episode_${episodeId}`
  ] as any as Progress['boxes'][`box_${typeof episodeId}`]);

export default getEpisodeProgress;
