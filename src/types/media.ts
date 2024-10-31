interface MediaVideo {
  id: string;
  name: string;
  url: string;
  fallback: undefined | string;
  placeholder?: string;
  thumbnail?: string;
}

interface MediaAudio {
  id: string;
  name: string;
  url: string;
  transcript?: string;
  placeholder?: string;
  avatars?: string[];
}

export type { MediaVideo, MediaAudio };
