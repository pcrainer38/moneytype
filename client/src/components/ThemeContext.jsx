import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useRef, useState } from "react";
import { GET_SETTINGS } from "../utils/queries.js";
import { UPDATE_SETTINGS } from "../utils/mutations.js";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

function ThemeProvider(props) {
  const hasSetTheme = useRef(false);
  const { loading, data, error } = useQuery(GET_SETTINGS);
  const [updateSettings] = useMutation(UPDATE_SETTINGS);
  const [theme, setThemeInternal] = useState("light");

  function setTheme(theme) {
    updateSettings({ variables: { theme } });
    setThemeInternal(theme);
  }

  if (!error && !loading && !hasSetTheme.current) {
    setThemeInternal(data.userSettings.theme);
    hasSetTheme.current = true;
  }

  return <ThemeContext.Provider value={{ theme, setTheme }} {...props} />;
}

export default ThemeProvider;
