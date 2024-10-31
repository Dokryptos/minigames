import { Episode } from './episode';

interface CharacterRequest {}

type Status = 'open' | 'closed' | 'partial' | 'done';

interface EpisodeProgress {
  end_at?: string | null | 'None';
  status?: Episode['status'];
  events: Record<string, { status: Status }>;
  help: Record<number, { status: Status }>;
  history: {
    archive?: Record<number, { status: boolean; date?: string }>;
    audio?: Record<number, { status: boolean; date?: string }>;
    video?: Record<number, { status: boolean; date?: string }>;
    document?: Record<number, { status: boolean; date?: string }>;
    lieu?: Record<string | number, { status: boolean; date?: string }>;
  };
  objectives: Record<string | number, { status: Status }>;
}

type ClueType = keyof EpisodeProgress['history'];

interface Progress {
  character_requests: CharacterRequest;
  boxes: Record<`box_${number}`, EpisodeProgress>;
  episodes?: Record<string, EpisodeProgress>;
  quizzes: Record<number, boolean>;
}

export type { ClueType, Progress, EpisodeProgress };
