import * as React from 'react';

function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, (value: React.SetStateAction<T>) => void, () => void] {
  const [state, setInternalState] = React.useState<T>(initialValue);

  React.useEffect(() => {
    const value = localStorage.getItem(key);

    if (!value) return;

    setInternalState(JSON.parse(value));
  }, [key]);

  const setState = (value: React.SetStateAction<T>) => {
    if (typeof value === 'function') {
      setInternalState((prev) => {
        const newValue = (value as (prev: T) => T)(prev);

        localStorage.setItem(key, JSON.stringify(newValue));

        return newValue;
      });
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
    setInternalState(value);
  };

  const clear = () => {
    localStorage.removeItem(key);
    setInternalState(initialValue);
  };

  return [state, setState, clear];
}

export default useLocalStorageState;
