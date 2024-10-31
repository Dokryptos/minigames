import { Episode } from './episode';
import { ClueType } from './progress';

type CharacterRequest = {
  id?: string;
  ask: string[];
  text: string[];
  episodeId?: Episode['id'];
  objectiveId?: (string | number)[];
  historyType?: ClueType;
  historyId?: number;
  media?: {
    type: 'audio' | 'video' | 'document';
    id: string;
  };
  status?: boolean;
  comment?: {
    /**
     * audio file id
     */
    id: string;
  };
  /**
   * The distance is the number of characters that can be different between the answer and the user input.
   */
  distance?: number;
  /**
   * In some cases, the request can have a side effect.
   * When this is the case, the request must be replayable in case a player gets stuck.
   */
  replayable?: boolean;

  errors?: (
    | {
        progress: { accessors: string[]; value: any }[];
        hint: string[];
      }
    | {
        answer: string[];
        distance?: number;
        hint: string[];
      }
  )[];
};

export type { CharacterRequest };
