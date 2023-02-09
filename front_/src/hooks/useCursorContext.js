import { useContext } from 'react'
import { CursorContext } from '../contexts/CursorContext'

const useCursorContext = () => {
  const { items, dispatch } = useContext(CursorContext)

  const addItem = item => {
    dispatch({ type: 'ADD', payload: item })
  }

  const removeItem = item => {
    dispatch({ type: 'REMOVE', payload: item })
  }

  const resetItem = () => {
    dispatch({ type: 'RESET' })
  }

  return { items, addItem, removeItem, resetItem }
}

export default useCursorContext