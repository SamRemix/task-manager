// import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoardsContext } from './useBoardsContext'
import axios from '../axios.config'

const useBoards = () => {
  const navigate = useNavigate()

  const { state, dispatch } = useBoardsContext()

  // const getBoards = async () => {
  //   dispatch({ type: 'LOADING' })

  //   try {
  //     const { data } = await axios.get('/boards')

  //     dispatch({ type: 'GET_BOARDS', payload: data })
  //     setBoards(data)
  //   } catch (err) {
  //     dispatch({ type: 'ERROR', payload: err.response.data.error || err.message })
  //   }
  // }

  // useEffect(() => {
  //   getBoards()
  // }, [])

  const getBoard = async id => {
    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.get(`/boards/${id}`)

      dispatch({ type: 'GET_BOARD', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error || err.message })
    }
  }

  const createBoard = async newBoard => {
    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.post('/boards', { title: newBoard })

      dispatch({ type: 'CREATE_BOARD', payload: data })

      navigate(`/boards/${data._id}`)
    } catch (err) {
      console.log(err);
      dispatch({ type: 'ERROR', payload: err.response.data.error || err.message })
    }
  }

  const updateBoard = async (id, newBoard) => {
    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.patch(`/boards/${id}`, { title: newBoard })

      dispatch({ type: 'UPDATE_BOARD', payload: data })

      navigate(`/boards/${id}`)
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error || err.message })
    }
  }

  const deleteBoard = async id => {
    const { data } = await axios.delete(`/boards/${id}`)

    dispatch({ type: 'DELETE_BOARD', payload: data })
    navigate('/')
  }

  return { state, getBoard, createBoard, updateBoard, deleteBoard }
}

export default useBoards