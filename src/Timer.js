import { ReactComponent as XIcon } from "./icons/x-icon.svg";
import React, { useState, useEffect } from "react";

export default function Timer({
  toggleTimerOpen,
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  isRunning,
  setIsRunning,
  soundsState,
  changeBoolAll,
}) {
  function stopTimer() {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  return (
    <div className="timer hide-on-mount">
      <XIcon onClick={toggleTimerOpen} className="x-icon" />
      <h2>Stop playing after</h2>

      <div className="timer-input-container">
        <input
          type="number"
          value={hours}
          min={0}
          max={60}
          onChange={(e) => setHours(parseInt(e.target.value))}
          readOnly={isRunning}
        />
        <h2>H</h2>
        <input
          type="number"
          value={minutes}
          min={0}
          max={60}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          readOnly={isRunning}
        />
        <h2>M</h2>
        <input
          type="number"
          value={seconds}
          min={0}
          max={60}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
          readOnly={isRunning}
        />
        <h2>S</h2>
      </div>
      {!isRunning ? (
        <button onClick={() => setIsRunning(true)} className="save-mix-btn">
          Start
        </button>
      ) : (
        <div>
          <button onClick={stopTimer} className="save-mix-btn">
            Stop
          </button>
        </div>
      )}
    </div>
  );
}
