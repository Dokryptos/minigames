import * as Marzipano from 'marzipano';

function switchScene(
  view: Marzipano.RectilinearView,
  scene: Marzipano.Scene,
  params: Marzipano.RectilinearViewParams
) {
  try {
    view.setParameters(params);
    scene.switchTo();
  } catch (error) {
    console.error('Error while switching scene', error);
  }
}

export default switchScene;
