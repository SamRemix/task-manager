import { useState } from 'react'

const useSearch = () => {
  const [prefix, setPrefix] = useState('')

  const search = data => (
    data.filter(({ title }) => (
      title.trim().toLowerCase().startsWith(prefix.trim().toLowerCase())
    ))
  )

  return { setPrefix, search }
}

export default useSearch