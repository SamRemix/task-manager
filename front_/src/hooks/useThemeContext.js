import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export const useThemeContext = () => {
  const { theme, font, dispatch } = useContext(ThemeContext)

  const switchTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'

    dispatch({ type: 'SET_THEME', payload: nextTheme })

    localStorage.setItem('theme', nextTheme)
  }

  const setFont = props => {
    dispatch({ type: 'SET_FONT', payload: props })

    localStorage.setItem('font', props)

    // document.documentElement.setAttribute('font', props)
  }

  return { theme, font, switchTheme, setFont, dispatch }
}

export default useThemeContext