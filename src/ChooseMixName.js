import { ReactComponent as ArrowIcon } from "./icons/arrow-icon.svg";

export default function ChooseMixName({
  toggleMixesOpen,
  toggleChoosingName,
  newMix,
  setAllMixes,
  allMixes,
}) {
  function saveMix() {
    const mixNameInput = document.getElementById("mix-name-input").value;
    if (mixNameInput) {
      const mixObject = { name: mixNameInput, mix: newMix };
      if (!localStorage.getItem("ALL_SOUND_MIXES")) {
        localStorage.setItem("ALL_SOUND_MIXES", JSON.stringify([mixObject]));
        setAllMixes(JSON.parse(localStorage.getItem("ALL_SOUND_MIXES")));
      } else {
        const obj = allMixes;
        const allSoundMixes = [];
        for (let i = 0; i < obj.length; i++) {
          allSoundMixes.push(obj[i]);
        }
        allSoundMixes.unshift(mixObject);
        localStorage.setItem("ALL_SOUND_MIXES", JSON.stringify(allSoundMixes));
        setAllMixes(JSON.parse(localStorage.getItem("ALL_SOUND_MIXES")));
      }
      toggleMixesOpen();
    }
  }

  return (
    <div className="choose-mix-name">
      <div className="choose-mix-name-top">
        <ArrowIcon onClick={toggleChoosingName} className="arrow-icon" />
        <h2>Choose a name</h2>
      </div>
      <input
        id="mix-name-input"
        type="text"
        name="user"
        placeholder="Favorite Mix"
      />
      <button onClick={saveMix} className="save-mix-btn">
        Save
      </button>
    </div>
  );
}
