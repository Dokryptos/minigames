const localStorageKeys = {
  // Loading
  loaderHasBeenSeen: 'loader-has-been-seen',
  // Auth context
  token: 'token',
  tokenRefreshedAt: 'token-refreshed-at',
  userId: 'user-id',
  redirect: 'redirect',
  // Box context
  currentBox: 'current-box',
  boxStatus: 'box-status',
  // Shortcuts
  disableShortcuts: 'disable-shortcuts',
  // Audio context
  backgroundMusicEnabled: 'background-music-enabled',
  // Carousel
  carouselIndex: 'carousel-index',

  // App 2 specific
  rescueChoice: 'rescue-choice',
  timer: 'timer',
  forestProgress: 'forest-progress',
  app2: {
    machine: 'tarot-machine',
    currentBox: 'tarot-box-current',
    boxStatus: 'tarot-box-status',
  },

  // beaurecueil
  beaurecueil: {
    machine: 'beaurecueil-machine',
  },

  // ciao-bella
  ciaobella: {
    machine: 'ciao-bella-machine',
  },

  // woodlock
  woodlock: {
    machine: 'woodlock-machine',
    currentBox: 'woodlock-box-current',
    boxStatus: 'woodlock-box-status',
  },

  // illusion
  illusion: {
    machine: 'illusion-machine',
    currentBox: 'illusion-box-current',
    boxStatus: 'illusion-box-status',
    cipherKey: 'illusion-cipher-key',
  },
} as const;

export { localStorageKeys };
