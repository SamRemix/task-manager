import { BoardsContext } from '../contexts/BoardsContext'
import { useContext } from 'react'

export const useBoardsContext = () => {
  const context = useContext(BoardsContext)

  if (!context) {
    throw Error('useBoardContext must be used inside an BoardContextProvider')
  }

  return context
}