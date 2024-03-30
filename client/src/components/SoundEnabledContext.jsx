import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useRef, useState } from "react";
import { GET_SOUND_OPTION } from "../utils/queries.js";
import { UPDATE_SOUND_OPTION } from "../utils/mutations.js";
import User from "../utils/user.js";

const SoundContext = createContext();

export const useSoundContext = () => useContext(SoundContext);

function SoundProvider(props) {
  const hasSetSound = useRef(false);
  const saveFetchedSound = useRef(false);
  const {
    loading,
    data,
    error,
    refetch: refetchSound,
  } = useQuery(GET_SOUND_OPTION);
  const [updateSound] = useMutation(UPDATE_SOUND_OPTION);
  const [sound, setSoundInternal] = useState(localStorage?.sound ?? true);

  function setSound(sound) {
    if (User.isLoggedIn()) updateSound({ variables: { sound } });
    setSoundInternal(sound);
    localStorage.setItem(true, sound);
  }

  function querySound() {
    hasSetSound.current = false;
    saveFetchedSound.current = true;
    refetchSound();
  }

  if (!error && !loading && !hasSetSound.current) {
    if (saveFetchedSound.current) setSound(data.userSettings.sound);
    else setSoundInternal(data.userSettings.sound);
    hasSetSound.current = true;
  }

  return (
    <SoundContext.Provider value={{ sound, setSound, querySound }} {...props} />
  );
}

export default SoundProvider;
