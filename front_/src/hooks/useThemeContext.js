import { useState, useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export const useThemeContext = () => {
  const { theme, font, dispatch } = useContext(ThemeContext)

  const switchTheme = () => {
    dispatch({ type: 'SET_THEME', payload: theme === 'light' ? 'dark' : 'light' })
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
  }

  const setFont = props => {
    dispatch({ type: 'SET_FONT', payload: props })
  }

  return { theme, font, switchTheme, setFont, dispatch }
}

export default useThemeContext