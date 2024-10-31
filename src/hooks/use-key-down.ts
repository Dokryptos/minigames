import * as React from 'react';
import listenKeyboard from '@/utils/listen-arrow-direction';

function useKeyDown<E extends HTMLElement>(onPress: (key: KeyboardEvent['key']) => void) {
  const rootNodeRef = React.useRef<E>(document.body as unknown as E);

  React.useEffect(() => {
    const unsubscribe = listenKeyboard(onPress, rootNodeRef.current);

    return () => {
      unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return rootNodeRef;
}

export default useKeyDown;
