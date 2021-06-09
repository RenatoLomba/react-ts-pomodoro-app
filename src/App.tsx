import React from 'react';
import { PomodoroTimer } from './components/PomodoroTimer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={10}
        longRestTime={20}
        cycles={2}
      />
    </div>
  );
}

export default App;
