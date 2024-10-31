function listenKeyboard(onPress: (key: KeyboardEvent['key']) => void, rootNode: HTMLElement) {
  const listener = (e: KeyboardEvent) => {
    onPress(e.key);
  };

  rootNode.addEventListener('keydown', listener);

  return () => {
    rootNode.removeEventListener('keydown', listener);
  };
}

export default listenKeyboard;
