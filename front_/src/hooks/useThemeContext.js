import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export const useThemeContext = () => {
  const { theme, font, dispatch } = useContext(ThemeContext)

  const switchTheme = props => {
    dispatch({ type: 'SET_THEME', payload: props })

    localStorage.setItem('theme', props)
  }

  const setFont = props => {
    dispatch({ type: 'SET_FONT', payload: props })

    localStorage.setItem('font', props)
  }

  return { theme, font, switchTheme, setFont, dispatch }
}

export default useThemeContext