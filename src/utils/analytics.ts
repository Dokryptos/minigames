const events = {
  DATALAYER_READY: 'datalayer_ready',
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  BACKGROUND_MUSIC: 'background_music',
  TURORIEL_BEGIN: 'turoriel_begin',
  TURORIEL_COMPLETE: 'turoriel_complete',
  START_INVESTIGATION: 'start_investigation',
  START_BOX: 'start_box',
  COMPLETE_BOX: 'complete_box',
  OBJECTIVE_FAILURE: 'objective_failure',
  OBJECTIVE_SUCCESS: 'objective_success',
  CLICK_REQUEST: 'click_request',
  SUBMIT_REQUEST: 'submit_request',
  OPEN_FILE: 'open_file',
  CLICK_TRANSCRIPTION: 'click_transcription',
  VIDEO: 'video',
  AUDIO: 'audio',
  CLICK_HELP: 'click_help',
  VIEW_HELP: 'view_help',
  COMPLETE_QUIZ: 'complete_quiz',
  COMPLETE_INVESTIGATION: 'complete_investigation',
} as const;

const INVESTIGATION_NAME = 'Le tueur au tarot';

type UserData = { user_id: string; user_email: string };

type EventReady = {
  event: 'datalayer_ready';
  investigation_name: string;
  current_box_number: string;
  user_data: UserData;
};
type EventSignUp = { event: 'sign_up'; user_data: UserData };
type EventLogin = { event: 'login'; user_data: UserData; last_login_date: string };
type EventResetPassword = { event: 'reset_password'; user_data: UserData };
type EventBackgroundMusic = { event: 'background_music'; music_choice: 'yes' | 'no' };
type EventTutorielBegin = { event: 'tutoriel_begin' };
type EventTutorielComplete = { event: 'tutoriel_complete' };
type EventStartInvestigation = { event: 'start_investigation'; investigation_name: string };
type EventStartBox = { event: 'start_box'; box_number: string };
type EventCompleteBox = { event: 'complete_box'; box_number: string };
type EventObjectiveFailure = {
  event: 'objective_failure';
  objective_name: string;
  box_number: string;
  /**
   * value submitted by the user
   */
  objective_term: string;
};
type EventObjectiveSuccess = {
  event: 'objective_success';
  objective_name: string;
  box_number: string;
  /**
   * value submitted by the user
   */
  objective_term: string;
};
type EventClickRequest = { event: 'click_request'; action_name: string; box_number: string };
type EventSubmitRequest = {
  event: 'submit_request';
  action_name: string;
  box_number: string;
  request_term: string;
  success: boolean;
};
type EventOpenFile = {
  event: 'open_file';
  file_name: string;
  file_type: string;
  box_number: string;
  document_id: string;
};
type EventClickTranscription = {
  event: 'click_transcription';
  document_id: string;
  file_name: string;
  box_number: string;
};
type EventVideo = {
  event: 'video';
  action: 'start' | 'progress' | 'pause' | 'complete';
  percent: number;
  title: string;
  box_number: string;
  document_id: string;
};
type EventAudio = {
  event: 'audio';
  action: 'start' | 'progress' | 'pause' | 'complete';
  percent: number;
  title: string;
  box_number: string;
  document_id: string;
};
type EventClickHelp = { event: 'click_help'; objective_name: string; box_number: string };
type EventViewHelp = {
  event: 'view_help';
  objective_name: string;
  nb_help: string;
  box_number: string;
};
type EventCompleteQuiz = {
  event: 'complete_quiz';
  box_number: string;
  failure: string; // '1,4,7'
  question_count: number;
  score: number;
};
type EventCompleteInvestigation = {
  event: 'complete_investigation';
  investigation_name: string;
};

type EventType =
  | EventReady
  | EventResetPassword
  | EventSignUp
  | EventLogin
  | EventBackgroundMusic
  | EventTutorielBegin
  | EventTutorielComplete
  | EventStartInvestigation
  | EventStartBox
  | EventCompleteBox
  | EventObjectiveFailure
  | EventObjectiveSuccess
  | EventClickRequest
  | EventSubmitRequest
  | EventOpenFile
  | EventClickTranscription
  | EventVideo
  | EventAudio
  | EventClickHelp
  | EventViewHelp
  | EventCompleteQuiz
  | EventCompleteInvestigation;

declare global {
  interface Window {
    dataLayer: any[];
  }
}

function track(data: EventType) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);

  if (import.meta.env.DEV) {
    console.log('track', data);
  }
}

interface PageLoadedArgs {
  currentBoxNumber: number;
  userId: string;
  userEmail: string;
}

/**
 * Send initial data when the page is loaded.
 */
function pageLoaded({ currentBoxNumber, userId, userEmail }: PageLoadedArgs) {
  track({
    event: events.DATALAYER_READY,
    investigation_name: INVESTIGATION_NAME,
    current_box_number: `${currentBoxNumber}`,
    user_data: {
      user_id: userId,
      user_email: userEmail,
    },
  });
}

export { INVESTIGATION_NAME, events, track, pageLoaded };
