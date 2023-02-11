import { useContext } from 'react'
import { CursorContext } from '../contexts/CursorContext'

const useCursorContext = () => {
  const { items, printed, dispatch } = useContext(CursorContext)

  // activate an item without displaying it
  const addItem = item => {
    dispatch({ type: 'ADD', payload: item })
  }

  // remove selected item (items & printed)
  const removeItem = item => {
    dispatch({ type: 'REMOVE', payload: item })
  }

  // remove all items (items & printed)
  const resetItem = () => {
    dispatch({ type: 'RESET' })
  }

  // activate an item and display it
  const printItem = item => {
    dispatch({ type: 'PRINT', payload: item })
  }

  return { items, printed, addItem, removeItem, resetItem, printItem }
}

export default useCursorContext