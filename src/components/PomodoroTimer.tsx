import React from 'react';
import { useInterval } from '../hooks/useInterval';
import { playSound } from '../utils/fnPlaySound';
import { fnSecondsToTime } from '../utils/fnSecondsToTime';
import { Button } from './Button';
import { Timer } from './Timer';

interface PomodoroTimerProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer({
  pomodoroTime,
  shortRestTime,
  longRestTime,
  cycles,
}: PomodoroTimerProps): JSX.Element {
  const [mainTime, setMainTime] = React.useState(pomodoroTime);
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [workingTime, setWorkingTime] = React.useState(0);
  const [resting, setResting] = React.useState(false);
  const [restingTime, setRestingTime] = React.useState(0);
  const [actualCycles, setActualCycles] = React.useState(0);
  const [cyclesToLongRest, setCyclesToLongRest] = React.useState(0);
  const [fullWorkingTime, setFullWorkingTime] = React.useState(0);
  const [pomodoros, setPomodoros] = React.useState(0);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working, resting]);

  React.useEffect(() => {
    if (mainTime > 0) return;
    setPomodoros(pomodoros + 1);
    if (working) {
      if (cyclesToLongRest >= cycles) {
        rest(true);
        setCyclesToLongRest(0);
      } else {
        rest(false);
      }
      return;
    }

    work();
    setCyclesToLongRest(cyclesToLongRest + 1);
    setActualCycles(actualCycles + 1);
  }, [mainTime]);

  useInterval(
    () => {
      if (working) {
        setWorkingTime(workingTime + 1);
      }

      if (resting) {
        setRestingTime(restingTime + 1);
      }
      setMainTime(mainTime - 1);
      setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const work = React.useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTime);
    playSound(audioRef, 'sounds/bell-start.mp3');
  }, [setTimeCounting, setWorking, setResting, setMainTime, pomodoroTime]);

  const rest = React.useCallback(
    (isLongRest: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);
      setMainTime(isLongRest ? longRestTime : shortRestTime);
      playSound(audioRef, 'sounds/bell-finish.mp3');
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      longRestTime,
      shortRestTime,
    ],
  );

  const pause = React.useCallback(
    () => setTimeCounting(!timeCounting),
    [setTimeCounting],
  );

  return (
    <div className="pomodoro">
      <h2>You are: {working ? 'working' : 'resting'}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text={'Work'} onClick={work} />
        <Button text={'Rest'} onClick={() => rest(false)} />
        {(working || resting) && (
          <Button text={timeCounting ? 'Pause' : 'Play'} onClick={pause} />
        )}
      </div>

      <div className="details">
        <p>Cycles: {actualCycles}</p>
        <p>Working time: {fnSecondsToTime(workingTime)}</p>
        <p>Resting time: {fnSecondsToTime(restingTime)}</p>
        <p>Pomodoros: {pomodoros}</p>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
