import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useRef, useState } from "react";
import { GET_THEME } from "../utils/queries.js";
import { UPDATE_THEME } from "../utils/mutations.js";
import User from "../utils/user.js";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

function ThemeProvider(props) {
  const hasSetTheme = useRef(false);
  const saveFetchedTheme = useRef(false);
  const {
    loading,
    data,
    error,
    refetch: refetchTheme,
  } = useQuery(GET_THEME);
  const [updateSettings] = useMutation(UPDATE_THEME);
  const [theme, setThemeInternal] = useState(localStorage?.theme ?? "light");

  function setTheme(theme) {
    if (User.isLoggedIn()) updateSettings({ variables: { theme } });
    setThemeInternal(theme);
    localStorage.setItem("theme", theme);
  }

  function queryTheme() {
    hasSetTheme.current = false;
    saveFetchedTheme.current = true;
    refetchTheme();
  }

  if (!error && !loading && !hasSetTheme.current) {
    if (saveFetchedTheme.current) setTheme(data.userSettings.theme);
    else setThemeInternal(data.userSettings.theme);
    hasSetTheme.current = true;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, queryTheme }} {...props} />
  );
}

export default ThemeProvider;
