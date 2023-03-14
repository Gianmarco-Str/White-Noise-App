export default function SaveMix({
  toggleMixesOpen,
  XIcon,
  getSoundsData,
  allMixes,
  setSoundsState,
  setPlayingAll,
  resetAllSounds,
  setAllMixes,
}) {
  function changeMix(i) {
    setPlayingAll(true);
    resetAllSounds();
    setSoundsState((prevState) => {
      return prevState.map((sound, index) => {
        if (allMixes[i].mix[index].marked) {
          return {
            ...sound,
            marked: false,
            playing: allMixes[i].mix[index].marked,
          };
        }
        return {
          ...sound,
          playing: allMixes[i].mix[index].playing,
        };
      });
    });
  }

  function deleteMix(i) {
    const newArr = [...allMixes];
    newArr.splice(i, 1);
    localStorage.setItem("ALL_SOUND_MIXES", JSON.stringify(newArr));
    setAllMixes(JSON.parse(localStorage.getItem("ALL_SOUND_MIXES")));
  }

  return (
    <div className="save-mix">
      <div className="save-mix-top">
        <button
          className="save-mix-btn"
          onClick={getSoundsData}
          id="save-mix-btn"
        >
          + Save Mix
        </button>
      </div>
      <div className="all-mixes-container">
        {allMixes &&
          allMixes.map((mix, i) => (
            <div
              key={i}
              className={"mix-name-container"}
              onClick={() => changeMix(i)}
            >
              <XIcon
                className="x-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteMix(i);
                }}
              />
              <h2>{mix.name}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
