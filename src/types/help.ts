type Hint = {
  // id: number;
  text: string[];
  image?: string | null;
  type?: 'answer' | 'hint';
};

type Help = {
  id: string;
  objectiveId?: string;
  title: string;
  hints: Hint[];
  status?: 'open' | 'closed' | 'done';
};

export type { Help, Hint };
