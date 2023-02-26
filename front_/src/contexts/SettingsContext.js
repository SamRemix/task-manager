import { useEffect, createContext, useReducer } from 'react'

const initialState = {
  theme: '',
  fontFamily: 'Poppins',
  fontSize: 100
}

const SET_THEME = 'SET_THEME'
const SET_FONT_FAMILY = 'SET_FONT_FAMILY'
const SET_FONT_SIZE = 'SET_FONT_SIZE'

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      }

    case SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload
      }

    case SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const SettingsContext = createContext(initialState)

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState)

  const browserTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const html = document.documentElement

  const storeData = (key, value) => {
    localStorage.setItem(key, value)
    html.setAttribute(key, value)
    dispatch({ type: `SET_${key.toUpperCase()}`, payload: value })
  }

  // set default theme
  const theme = localStorage.getItem('theme')

  useEffect(() => {
    storeData('theme', theme ?? browserTheme)
  }, [theme])

  // set font family
  const fontFamily = localStorage.getItem('font_family')

  useEffect(() => {
    storeData('font_family', fontFamily ?? 'Poppins')
  }, [fontFamily])

  // set font size
  const fontSize = localStorage.getItem('font_size')

  useEffect(() => {
    storeData('font_size', fontSize ?? 100)

    html.style.fontSize = html.getAttribute('font_size') + '%'
  }, [fontSize])

  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}