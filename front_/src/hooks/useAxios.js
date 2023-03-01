import axios from 'axios'

const useAxios = token => {
  const instance = axios.create({
    // baseURL: 'https://task-manager-mern-back.vercel.app',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return { instance }
}

export default useAxios