function dispatchEscape() {
  dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
}

export default dispatchEscape;
