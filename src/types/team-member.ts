import { ImageMeta } from './image-meta';

type TeamMember = {
  id: string;
  order: number;
  name: string;
  role: string;
  actionName: string;
  icon: string;
  trackingId: string;
  actionTitle: string;
  question: string;
  img: ImageMeta;
  catchphrases: string[];
  requests: any;
  state?: any;
  guard?: any;
  errorMessages: {
    alreadyAnsweredInThisBox: string;
    alreadyAnsweredInPreviousBox: string;
    empty: string;
    notFound: string;
  };
  input: {
    label: string;
    placeholder: string;
    type: string;
  };
};

export type { TeamMember };
