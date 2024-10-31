import * as Marzipano from 'marzipano';

function createViewer(domElement: HTMLElement, options?: Marzipano.ViewerOptions) {
  const viewer = new Marzipano.Viewer(domElement!, {
    ...options,
    controls: {
      mouseViewMode: 'drag',
      ...options?.controls,
    },
  });

  const viewerChildrens = viewer.domElement().children;
  // const viewerChildrens = viewerRef.current._domElement.children;

  for (const element_ of viewerChildrens) {
    if (element_.tagName === 'CANVAS' && 'style' in element_) {
      (element_ as HTMLDivElement).style.left = '0';
      (element_ as HTMLDivElement).style.top = '0';
    }
  }

  return viewer;
}

export default createViewer;
