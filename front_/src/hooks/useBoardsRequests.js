import { useBoardsContext } from '../contexts/BoardsContext'
import axios from '../axios.config'

const useBoardsRequests = () => {
  const { state, dispatch } = useBoardsContext()

  const getBoards = async () => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.get('/boards')

      dispatch({ type: 'GET_BOARDS', payload: response.data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  const getBoard = async id => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.get(`/boards/${id}`)

      dispatch({ type: 'GET_BOARDS', payload: response.data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  return { state, getBoards, getBoard }
}

export default useBoardsRequests