import axios from 'axios'

const useAxios = token => {
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return { instance }
}

export default useAxios