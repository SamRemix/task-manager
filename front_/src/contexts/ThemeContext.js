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

  const theme = localStorage.getItem('theme')

  const browserTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  useEffect(() => {
    if (!theme) {
      dispatch({ type: 'SET_THEME', payload: browserTheme })

      localStorage.setItem('theme', browserTheme)

      document.documentElement.setAttribute('theme', browserTheme)

      return
    }

    dispatch({ type: 'SET_THEME', payload: theme })

    document.documentElement.setAttribute('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}