import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextProps = {
  theme: Theme
  handleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  handleTheme: () => {}
})
  // createContext<[Theme, Dispatch<SetStateAction<Theme>>]>('null');

// const useTheme = () => {
//   const [theme, setTheme] = useContext(ThemeContext);

//   return { theme, onChange: handleTheme };
// };

const useTheme = () => useContext(ThemeContext)

    function getColorMode(): Theme {
      const colorPreference = window.localStorage.getItem('appTheme')
      const hasColorPreference = typeof colorPreference === 'string'

      if (hasColorPreference) return colorPreference as Theme
      
      const mqPreference = window.matchMedia("(prefers-color-scheme: dark)")
      const hasMQPreference = typeof mqPreference.matches === 'boolean'

      if (hasMQPreference) {
        return mqPreference.matches ? 'dark' : 'light'
      }
      return 'light'
    }

const ThemeProvider = ({ children }: { children: React.ReactNode}) => {
  const [theme, setTheme] = useState<Theme>(getColorMode);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      changeTheme("dark")
    } else {
      document.documentElement.classList.remove("dark");
      changeTheme("light")
    }
  };
  
  const changeTheme = (value: Theme) => {
    setTheme(value);
    localStorage.setItem("appTheme", value);
  }

  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };