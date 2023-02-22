import { useState } from 'react'

const useToggle = (value = false) => {
  const [display, setDisplay] = useState(value)

  const toggle = () => {
    setDisplay(!display)
  }

  return { display, toggle }
}


export default useToggle