import React from 'react';
import { fnSecondsToTime } from '../utils/fnSecondsToTime';

interface TimerProps {
  mainTime: number;
}

export function Timer({ mainTime }: TimerProps): JSX.Element {
  return <div className={'timer'}>{fnSecondsToTime(mainTime)}</div>;
}
