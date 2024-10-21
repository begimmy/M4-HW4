import React, { useState, useEffect, useRef } from 'react';

const Form = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps((prevLaps) => [...prevLaps, (time / 1000).toFixed(2)]);
  };

  return (
    <div>
      <h1>{(time / 1000).toFixed(2)} s</h1>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
      <button onClick={lap} disabled={!isRunning}>Lap</button>
      <ul>
        {laps.map((lapTime, index) => (
          <li key={index}>{lapTime} s</li>
        ))}
      </ul>
    </div>
  );
};

export default Form;