import { localStorageKeys } from '@/constants/local-storage';
import * as React from 'react';

interface TimerProps {
  durationSeconds: number;
  onTimeOver: () => void;
}
function useTimer({ durationSeconds, onTimeOver }: TimerProps) {
  const [timeLeftSeconds, setTimeLeftSeconds] = React.useState(
    () => Number(localStorage.getItem(localStorageKeys.timer)) || durationSeconds
  );

  React.useEffect(() => {
    const myInterval = setInterval(() => {
      if (timeLeftSeconds > 0) {
        setTimeLeftSeconds(timeLeftSeconds - 1);

        localStorage.setItem(localStorageKeys.timer, (timeLeftSeconds - 1).toString());
      } else if (timeLeftSeconds === 0) {
        onTimeOver();

        clearInterval(myInterval);

        localStorage.removeItem(localStorageKeys.timer);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  const isTimeOver = timeLeftSeconds === 0;
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;

  return {
    isTimeOver,
    minutes,
    seconds,
  };
}

export default useTimer;
