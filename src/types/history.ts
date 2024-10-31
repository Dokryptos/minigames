type History = {
  id?: string; // 'box1document6';
  name?: string; // 'Message affiché au mur dans la planque du tueur';
  detail: string; // 'Message affiché au mur dans la planque du tueur';
  thumbnail: string; // 'thumbnails/documents/126_Message_dans_la_planque_LD.jpg';
  status?: boolean;
  message?: string[];
  episodeId: number;
  historyType: 'archive' | 'document' | 'audio' | 'video' | 'lieu';
  historyId: number;
} & (
  | {
      media: {
        type: 'audio' | 'video' | 'document' | 'exploration';
        id: string;
      };
      medias?: undefined;
    }
  | {
      media?: undefined;
      medias: {
        type: 'audio' | 'video' | 'document' | 'exploration';
        id: string;
      }[];
    }
);

export type { History };
