import { ThemeContext } from '../contexts/ThemeContext'
import { useContext } from 'react'

export const useThemeContext = () => {
  return useContext(ThemeContext)
}