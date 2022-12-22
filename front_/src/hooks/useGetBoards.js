import { useBoardsContext } from '../contexts/BoardsContext'
import axios from '../axios.config'

const useGetBoards = () => {
  const { loading, boards, error, dispatch } = useBoardsContext()

  const getBoards = async () => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.get('/boards')

      dispatch({ type: 'GET_BOARDS', boards: response.data })
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.response.data.error })
    }
  }

  const getSingleBoard = async id => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.get(`/boards/${id}`)

      // response.data.tasks.sort((a, b) => {
      //   return b.important - a.important
      // })

      dispatch({ type: 'GET_BOARDS', boards: response.data })
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.response.data.error })
    }
  }

  return { loading, boards, error, getBoards, getSingleBoard }
}

export default useGetBoards