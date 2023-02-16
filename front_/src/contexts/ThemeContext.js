import { useState, useEffect, createContext } from 'react'

const defaultTheme = matchMedia('(prefers-color-scheme: dark)').matches

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const currTheme = localStorage.getItem('theme')

    if (!currTheme) {
      return defaultTheme
    }

    return currTheme
  })

  const toggleTheme = () => {
    setTheme(curr => (
      curr === 'light' ? 'dark' : 'light'
    ))
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)

    document.documentElement.setAttribute('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}