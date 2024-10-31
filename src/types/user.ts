import AGE_MEAN from '@/constants/age-mean';
import { Progress } from './progress';

type User = {
  _id: string;
  name: string;
  email: string;
  checkedMail: boolean;
  phoneNumber: string;
  mailOptIn: boolean;
  detectiveCount: number;
  ageMean: (typeof AGE_MEAN)[number];
  progress: Progress;
};

export type { User };
