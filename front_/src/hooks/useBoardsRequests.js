// import { useEffect, useContext } from 'react'
// import { useBoardsContext, BoardsContext } from '../contexts/BoardsContext'
// import axios from '../axios.config'

// const useBoardsRequests = () => {
//   const { state, dispatch } = useContext(BoardsContext)

//   const getBoards = async () => {
//     dispatch({ type: 'LOADING' })

//     try {
//       const response = await axios.get('/boards')

//       dispatch({ type: 'GET_BOARDS', payload: response.data })
//     } catch (err) {
//       dispatch({ type: 'ERROR', payload: err.response.data.error })
//     }
//   }

//   // useEffect(() => {
//   //   getBoards()
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [])

//   const getBoard = async id => {
//     dispatch({ type: 'LOADING' })

//     try {
//       const response = await axios.get(`/boards/${id}`)

//       dispatch({ type: 'GET_BOARDS', payload: response.data })
//     } catch (err) {
//       dispatch({ type: 'ERROR', payload: err.response.data.error })
//     }
//   }

//   return { state, getBoards, getBoard }
// }

// export default useBoardsRequests