import { useState, useEffect, createContext, useReducer } from 'react'

const initialState = {
  theme: '',
  font: 'Poppins'
}

const SET_THEME = 'SET_THEME'
const SET_FONT = 'SET_FONT'

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      }

    case SET_FONT:
      return {
        ...state,
        font: action.payload
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const ThemeContext = createContext(initialState)

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  const browserTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const storeData = (key, value) => {
    localStorage.setItem(key, value)
    document.documentElement.setAttribute(key, value)
  }

  const theme = localStorage.getItem('theme')

  // set theme
  useEffect(() => {
    if (!theme) {
      dispatch({ type: 'SET_THEME', payload: browserTheme })
      storeData('theme', browserTheme)

      return
    }

    dispatch({ type: 'SET_THEME', payload: theme })
    storeData('theme', theme)
  }, [theme])

  const font = localStorage.getItem('font')

  // set font family
  useEffect(() => {
    if (!font) {
      dispatch({ type: 'SET_FONT', payload: 'Poppins' })
      storeData('font', 'Poppins')

      return
    }

    dispatch({ type: 'SET_FONT', payload: font })
    storeData('font', font)
  }, [font])

  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}