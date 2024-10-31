type Question = {
  id: number;
  image: string | null;
  choices: string[];
  question: string[];
  multi?: boolean | null;
};

type Answer = {
  id: number;
  image: string | null;
  answer: string | string[];
  explanation: string[];
  multi?: boolean | null;
};

type Quizz = {
  id: number;
  box_id: number;
  // status: boolean;
  questions: Question[];
  answers: Answer[];
};

export type { Quizz, Question, Answer };
