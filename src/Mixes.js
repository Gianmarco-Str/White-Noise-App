import { useState } from "react";
import SaveMix from "./SaveMix";
import ChooseMixName from "./ChooseMixName";
import { ReactComponent as XIcon } from "./icons/x-icon.svg";

export default function Mixes({
  toggleMixesOpen,
  soundsState,
  setSoundsState,
  allMixes,
  setAllMixes,
  setPlayingAll,
  resetAllSounds,
}) {
  const [choosingName, setChoosingName] = useState(false);
  const [newMix, setNewMix] = useState("");

  function toggleChoosingName(bool) {
    setChoosingName(bool);
  }

  function getSoundsData() {
    soundsState.map((sound, i) => {
      if (sound.playing || sound.marked) {
        toggleChoosingName(true);
        setNewMix(soundsState);
      }
    });
  }

  return (
    <div className="mixes hide-on-mount">
      <XIcon onClick={toggleMixesOpen} className="x-icon" />
      {!choosingName ? (
        <SaveMix
          toggleMixesOpen={toggleMixesOpen}
          XIcon={XIcon}
          getSoundsData={getSoundsData}
          allMixes={allMixes}
          setSoundsState={setSoundsState}
          setPlayingAll={setPlayingAll}
          resetAllSounds={resetAllSounds}
          setAllMixes={setAllMixes}
        />
      ) : (
        <ChooseMixName
          toggleChoosingName={() => toggleChoosingName(false)}
          toggleMixesOpen={toggleMixesOpen}
          XIcon={XIcon}
          newMix={newMix}
          setAllMixes={setAllMixes}
          allMixes={allMixes}
        />
      )}
    </div>
  );
}
