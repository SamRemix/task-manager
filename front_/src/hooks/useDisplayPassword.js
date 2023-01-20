import { useState } from 'react'

const useDisplayPassword = () => {
  const [displayPassword, setDisplayPassword] = useState(false)

  const togglePassword = () => {
    setDisplayPassword(display => (
      display ? false : true
    ))
  }

  return { displayPassword, togglePassword }
}

export default useDisplayPassword