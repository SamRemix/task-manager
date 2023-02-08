import { useContext } from 'react'
import { CursorContext } from '../contexts/cursorContext'

const useCursorContext = () => {
  const { items, dispatch } = useContext(CursorContext)

  const addItem = item => {
    dispatch({ type: 'ACTIVE', payload: item })
  }

  const removeItem = item => {
    dispatch({ type: 'DISACTIVE', payload: item })
  }

  return { items, addItem, removeItem }
}

export default useCursorContext