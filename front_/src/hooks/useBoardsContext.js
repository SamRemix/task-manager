import { BoardsContext } from '../context/BoardsContext'
import { useContext } from 'react'

export const useBoardsContext = () => {
  const context = useContext(BoardsContext)

  if (!context) {
    throw Error('useBoardsContext must be used inside a BoardsContextProvider')
  }

  return context
}