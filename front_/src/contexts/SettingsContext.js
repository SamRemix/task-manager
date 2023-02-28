import { useState, useEffect, createContext, useReducer } from 'react'

const initialState = {
  theme: '',
  fontFamily: 'Poppins',
  fontSize: 100
}

const SET_THEME = 'SET_THEME'
const SET_FONT_FAMILY = 'SET_FONT_FAMILY'
const SET_FONT_SIZE = 'SET_FONT_SIZE'

const SettingsReducer = (state = initialState, action) => {
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

  const [state, dispatch] = useReducer(SettingsReducer, initialState)

  const browserTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const html = document.documentElement

  const storeData = (key, value) => {
    localStorage.setItem(key, value)
    html.setAttribute(key, value)
    dispatch({ type: `SET_${key.toUpperCase()}`, payload: value })
  }

  const theme = localStorage.getItem('theme') || browserTheme
  const fontFamily = localStorage.getItem('font_family') || 'Poppins'
  const fontSize = localStorage.getItem('font_size') || 100

  useEffect(() => {
    storeData('theme', theme)
  }, [theme])

  useEffect(() => {
    storeData('font_family', fontFamily)
  }, [fontFamily])

  const { addEventListener, innerWidth } = window

  const [windowWidth, setWindowWidth] = useState(innerWidth)

  useEffect(() => {
    addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })

    localStorage.setItem('font_size', fontSize)
    dispatch({ type: 'SET_FONT_SIZE', payload: fontSize })

    html.style.fontSize = windowWidth < 768 ? (
      fontSize * .8 + '%'
    ) : fontSize + '%'
  }, [windowWidth, fontSize])

  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}