interface Objective {
  id: number | string; // 11;
  title: string; // 'La menteuse';
  subtitle: string; // 'Retrouvez les derniers mots de la victime';
  status: 'open' | 'done' | 'closed' | 'partial'; // 'open';
  episodeId?: number; // 1;

  label?: string; // 'Réponse';
  detail: string[]; // ['D'après ce qu'il dit dans ce paragraphe, il faudrait qu'on retrouve les derniers mots de la victime.', 'Vous parlez d'une histoire glauque...'];
  errorMessage: string; // 'Il y a des points sur lesquels je ne suis pas d'accord, réessayez de nouveau';
  errors?: (
    | { hint: string[]; progress: { accessors: string[]; value: any }[] }
    | { hint: string[]; answer: string[] }
    | { hint: string[]; min: number }
  )[];

  choices?: string[]; // [('-- Choisissez le type de victime --',  'Victime du Grand Œuvre du tueur au Tarot (tueur organisé)',  'Victime collatérale du Tueur au Tarot (tueur organisé)',  'Victime de Charles Garraud (tueur désorganisé)')];
  victimes?: { img: string; name: string }[]; // [{ img: 'assets/photos-personnages/elodie_bouchard.jpg'; name: 'Elodie Bouchard' }, { img: 'assets/photos-personnages/marianne_chauve.jpg'; name: 'Marianne Chauve' }, { img: 'assets/photos-personnages/xavier_monrency.jpg'; name: 'Xavier Monrency' }, { img: 'assets/photos-personnages/nicolas_chaussee.jpg'; name: 'Nicolas Chaussée' }, { img: 'assets/photos-personnages/rebecca_dumont.jpg'; name: 'Rebecca Dumont' }, { img: 'assets/photos-personnages/Jacqueline-Houdin.jpg'; name: 'Jacqueline Houdin';}];

  predetail?: string[];

  answer: string[]; // ['jauraisdulasauver', 'jauraidulasauver', 'jauraisdulasauve', 'jauraidulasauve'];
  answer_max_distance?: number; // 2;
  answersrc: string | null; // 'sounds/104-objectifs-reussis-1.mp3';
  answertext: string[]; // ['Raphaëlle:', 'Bien joué, j'ai l'impression que vous avez résolu ce paragraphe du poème. Si je comprends bien, le tueur connaissait sa victime, mais pas l'inverse. Continuons notre enquête.', '-', 'Lauren:', 'Faire parler sa victime avant de la tuer, c'est un procédé classique de personnalisation. On sent qu'il y prend du plaisir. De même que le petit rituel qu'il lui impose. Je vous invite à analyser à quel type de tueur on a à faire. Je vous envoie pour cela un extrait du livre de profiling que j'ai co-écrit. Dans une affaire de tueur en série, ça ne peut que nous aider ! A quel type de tueur avons-nous donc affaire ?'];
  answer_dialogs?: {
    speaker: string;
    avatarSrc: string;
    text: string[];
  }[];

  newanswer?: string[]; // ['organise', 'tueurorganise'];
  newanswersrc?: string | null; // null;
  newanswertext?: string[]; // ['Nous avons donc affaire à un tueur organisé...', 'Gardez bien cela à l'esprit pour le reste de l'enquête.'];
  newdetail?: string[]; // ['A quel type de tueur avons nous affaire ?'];
  newerrorMessage?: string; // 'Non je ne pense pas que ce soit cela.';
  newlabel?: string; // 'Réponse';

  partial_title?: string;
  partial_subtitle?: string;

  done_subtitle?: string;
}

export type { Objective };
