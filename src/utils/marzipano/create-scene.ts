import * as Marzipano from 'marzipano';

function createScene(
  url: string,
  viewer: Marzipano.Viewer | null,
  data: {
    levels: {
      size: number;
      tileSize: number;
    }[];
    faceSize: number;
    initialViewParameters: Marzipano.RectilinearViewParams;
  }
) {
  if (!viewer) {
    throw new Error('Viewer not initialized');
  }

  const source = Marzipano.ImageUrlSource.fromString(`${url}/{z}/{f}/{y}/{x}.jpg`, {
    cubeMapPreviewUrl: `${url}/preview.jpg`,
  });
  const geometry = new Marzipano.CubeGeometry(data.levels);

  const limiter = Marzipano.RectilinearView.limit.traditional(
    data.faceSize,
    (100 * Math.PI) / 180,
    (120 * Math.PI) / 180
  );
  const view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

  const scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true,
  });

  return {
    scene: scene,
    view: view,
  };
}

export default createScene;
