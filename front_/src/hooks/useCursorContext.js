import { useContext } from 'react'
import { CursorContext } from '../contexts/CursorContext'

const useCursorContext = () => {
  const { items, printed, dispatch } = useContext(CursorContext)
  // span element can be set in item property for bolder font weight

  // activate an item without displaying it (items)
  const addItem = item => {
    dispatch({ type: 'ADD', payload: item })
  }

  // remove selected item from 'items' & 'printed'
  const removeItem = item => {
    dispatch({ type: 'REMOVE', payload: item })
  }

  // remove all items from 'items' & 'printed'
  const resetItem = () => {
    dispatch({ type: 'RESET' })
  }

  // activate an item and display it (printed)
  const printItem = item => {
    dispatch({ type: 'PRINT', payload: item })
  }

  return { items, printed, addItem, removeItem, resetItem, printItem }
}

export default useCursorContext