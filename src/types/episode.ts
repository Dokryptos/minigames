import { ImageMeta } from './image-meta';

interface Episode {
  background?: ImageMeta;
  name: string;
  id: number;
  status: 'open' | 'closed' | 'done';
  cover: null | ImageMeta;
  music?: string;
}

export type { Episode, Episode as Box };
