import { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const defaultTheme = matchMedia('(prefers-color-scheme: dark)').matches

export const ThemeContext = createContext({
  theme: '',
  toggleTheme: () => { }
})

export const ThemeContextProvider = ({ children }) => {
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