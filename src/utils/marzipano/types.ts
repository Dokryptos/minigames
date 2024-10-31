type Level = {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
};

type LinkHotspot = {
  yaw: number;
  pitch: number;
  rotation: number;
  target: string;
};

type InfoHotspot = {
  yaw: number;
  pitch: number;
  title: string;
  text: string;
};

type Scene = {
  id: string;
  name: string;
  levels: Level[];
  faceSize: number;
  initialViewParameters: {
    yaw: number;
    pitch: number;
    fov: number;
  };
  linkHotspots: LinkHotspot[];
  infoHotspots: InfoHotspot[];
};

type Data = {
  scenes: Scene[];
  name: string;
  settings: {
    mouseViewMode: string;
    autorotateEnabled: boolean;
    fullscreenButton: boolean;
    viewControlButtons: boolean;
  };
};

export type { Scene, Data, Level, LinkHotspot, InfoHotspot };
