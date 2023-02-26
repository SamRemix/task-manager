import { useContext } from 'react'
import { SettingsContext } from '../contexts/SettingsContext'

export const useSettingsContext = () => {
  const { theme, fontFamily, fontSize, dispatch } = useContext(SettingsContext)

  const switchTheme = props => {
    dispatch({ type: 'SET_THEME', payload: props })

    localStorage.setItem('theme', props)
  }

  const setFontFamily = props => {
    dispatch({ type: 'SET_FONT_FAMILY', payload: props })

    localStorage.setItem('font_family', props)
  }

  const setFontSize = props => {
    dispatch({ type: 'SET_FONT_SIZE', payload: props })

    localStorage.setItem('font_size', props)
  }

  return { theme, fontFamily, fontSize, switchTheme, setFontFamily, setFontSize, dispatch }
}

export default useSettingsContext