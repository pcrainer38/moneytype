import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

function ThemeProvider(props) {
  const [theme, setTheme] = useState("light");

  return <ThemeContext.Provider value={{ theme, setTheme }} {...props} />;
}

export default ThemeProvider;
