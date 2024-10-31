import * as React from 'react';

function useEsc(callback: () => void, rootNode: HTMLElement = document as unknown as HTMLElement) {
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    rootNode.addEventListener('keydown', handleEsc);

    return () => {
      rootNode.removeEventListener('keydown', handleEsc);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export { useEsc };
