import useTimer from '@/hooks/use-timer';

interface TimerProps {
  durationSeconds: number;
  onTimeOver: () => void;
}
const Timer = ({ durationSeconds, onTimeOver }: TimerProps) => {
  const { isTimeOver, minutes, seconds } = useTimer({ durationSeconds, onTimeOver });

  return (
    <div className="font-gabriele animate-pulse rounded border-2 border-solid border-red-700 px-4 text-xl">
      {isTimeOver ? (
        '00:00'
      ) : (
        <>
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </>
      )}
    </div>
  );
};

export default Timer;
