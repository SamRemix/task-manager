import { useState } from 'react'

const useToggle = () => {
  const [display, setDisplay] = useState(false)

  const toggle = () => {
    setDisplay(!display)
  }

  return { display, toggle }
}


export default useToggle