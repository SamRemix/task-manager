import { useContext } from 'react'
import { SettingsContext } from '../contexts/SettingsContext'

export const useSettingsContext = () => {
  const { theme, font, dispatch } = useContext(SettingsContext)

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

export default useSettingsContext