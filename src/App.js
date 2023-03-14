import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import "./styles.css";
import sounds from "./sounds.js";
import Mixes from "./Mixes";
import Timer from "./Timer";
import { ReactComponent as GarbageBinIcon } from "./icons/garbage-bin-icon.svg";

export default function App() {
  const [soundsState, setSoundsState] = useState(sounds);
  const [playingAll, setPlayingAll] = useState(true);
  const [mixesOpen, setMixesOpen] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [allMixes, setAllMixes] = useState(
    JSON.parse(localStorage.getItem("ALL_SOUND_MIXES"))
  );

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function adjustVolume(i) {
    const audio = soundsState[i].audio;
    const volumeSlider = document.getElementById("volume-slider-" + i);
    audio.volume = volumeSlider.value;

    if (playingAll) {
      if (!soundsState[i].playing) {
        switchPlayingBool(i, true);
        audio.play();
      }
    }
  }

  function iconPlayAndPauseSound(i) {
    const audio = soundsState[i].audio;
    if (playingAll) {
      if (!soundsState[i].playing) {
        switchPlayingBool(i, true);
        audio.play();
      } else {
        audio.pause();
        switchPlayingBool(i, false);
      }
    }
  }

  function switchPlayingBool(i, bool) {
    setSoundsState((prevState) =>
      prevState.map((sound, index) => {
        if (index === i) {
          return { ...sound, playing: bool };
        }
        return sound;
      })
    );
  }

  function changeBoolAll() {
    let allPlaying = true;
    const updatedSoundsState = [];
    soundsState.map((sound) => {
      if (sound.playing) {
        allPlaying = false;
        updatedSoundsState.push({ ...sound, marked: true, playing: false });
      } else if (sound.marked) {
        allPlaying = true;
        updatedSoundsState.push({ ...sound, marked: false, playing: true });
      } else {
        updatedSoundsState.push(sound);
      }
    });
    setSoundsState(updatedSoundsState);
    setPlayingAll(allPlaying);
  }

  function resetAllSounds() {
    setSoundsState((prevState) => {
      return prevState.map((sound, i) => {
        const volumeSlider = document.getElementById(`volume-slider-${i}`);
        const audio = sound.audio;
        audio.volume = volumeSlider.value;
        audio.currentTime = 0;
        volumeSlider.value = 0.5;
        return { ...sound, marked: false, playing: false };
      });
    });
    if (!playingAll) {
      setPlayingAll(true);
    }
  }

  function toggleMixesOpen() {
    setMixesOpen((prevState) => !prevState);
    if (timerOpen) {
      setTimerOpen(false);
    }
  }

  function toggleTimerOpen() {
    setTimerOpen((prevState) => !prevState);
    if (mixesOpen) {
      setMixesOpen(false);
    }
  }

  soundsState.map((sound) => {
    sound.audio.addEventListener("ended", () => {
      replayOnFinish();
    });
  });

  function replayOnFinish() {
    soundsState.map((sound) => {
      if (sound.audio.ended) {
        sound.audio.play();
      }
    });
  }

  useEffect(() => {
    soundsState.map((sound) => {
      if (sound.playing && playingAll) {
        sound.audio.play();
      } else {
        sound.audio.pause();
      }
    });
  });

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setIsRunning(false);
          clearInterval(interval);
          soundsState.map((sound) => {
            if (sound.playing) {
              changeBoolAll();
            }
          });
        }
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [hours, minutes, seconds, isRunning]);

  useEffect(() => {
    if (seconds > 60) {
      setSeconds(60);
    } else if (!seconds && seconds !== 0) {
      setSeconds(0);
    }

    if (minutes > 60) {
      setMinutes(60);
    } else if (!minutes && minutes !== 0) {
      setMinutes(0);
    }

    if (hours > 60) {
      setHours(60);
    } else if (!hours && hours !== 0) {
      setHours(0);
    }
  }, [hours, minutes, seconds]);

  return (
    <div className="container">
      <div className="top-section">
        <div className={`count-container ${isRunning && "show"}`}>
          {hours}:{minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </div>

        <GarbageBinIcon onClick={resetAllSounds} className="garbage-bin-icon" />
        <div className="top-section-btn-container">
          <div onClick={toggleMixesOpen} className="mixes-btn">
            <h2>Mixes</h2>
          </div>
          <button onClick={changeBoolAll} id={"play-pause-btn"}>
            <div className={`play-pause-icon ${playingAll && "playing"}`}></div>
          </button>
          <div onClick={toggleTimerOpen} className="timer-btn">
            <h2>Timer</h2>
          </div>
        </div>
        {mixesOpen && (
          <Mixes
            toggleMixesOpen={toggleMixesOpen}
            soundsState={soundsState}
            setSoundsState={setSoundsState}
            allMixes={allMixes}
            setAllMixes={setAllMixes}
            setPlayingAll={setPlayingAll}
            resetAllSounds={resetAllSounds}
          />
        )}
        {timerOpen && (
          <Timer
            toggleTimerOpen={toggleTimerOpen}
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            soundsState={soundsState}
            changeBoolAll={changeBoolAll}
            timerOpen={timerOpen}
          />
        )}
      </div>

      <div className="main-section">
        <div className="sound-container">
          {soundsState.map((sound, i) => (
            <div key={i} className={"sound"}>
              <div className="icon-container">
                <ReactSVG
                  onClick={() => iconPlayAndPauseSound(i)}
                  className={`sound-icon ${
                    sound.playing || sound.marked ? "active" : ""
                  }`}
                  src={require(`./icons/${soundsState[i].type}-icon.svg`)}
                />
              </div>
              <p>{soundsState[i].type}</p>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                defaultValue={0.5}
                id={"volume-slider-" + i}
                onInput={() => adjustVolume(i)}
                className={"volume-slider"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
