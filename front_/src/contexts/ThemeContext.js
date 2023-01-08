import { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const defaultTheme = matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('theme', defaultTheme ? 'dark' : 'light')

  const toggleTheme = () => {
    setTheme(curr => (
      curr === 'light' ? 'dark' : 'light'
    ))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}