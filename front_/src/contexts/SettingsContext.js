import { useEffect, createContext, useReducer } from 'react'

const initialState = {
  theme: '',
  font: 'Poppins'
}

const SET_THEME = 'SET_THEME'
const SET_FONT = 'SET_FONT'

const settingsReducer = (state = initialState, action) => {
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

export const SettingsContext = createContext(initialState)

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState)

  const browserTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const storeData = (key, value) => {
    localStorage.setItem(key, value)
    document.documentElement.setAttribute(key, value)
    dispatch({ type: `SET_${key.toUpperCase()}`, payload: value })
  }

  // set default theme
  const theme = localStorage.getItem('theme')

  useEffect(() => {
    storeData('theme', theme ?? browserTheme)
  }, [theme])

  // set font family
  const font = localStorage.getItem('font')

  useEffect(() => {
    storeData('font', font ?? 'Poppins')
  }, [font])

  return (
    <SettingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}