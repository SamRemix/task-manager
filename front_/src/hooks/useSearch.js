import { useState } from 'react'

const useSearch = () => {
  const [prefix, setPrefix] = useState('')

  const format = string => {
    let filter = prefix.trim().toLowerCase()

    if (prefix.startsWith('#')) {
      filter = filter.split('#')[1]
    }

    return string.trim().toLowerCase().startsWith(filter)
  }

  const search = data => (
    data.filter(d => (
      prefix.startsWith('#') ? (
        d.tags.find(({ title }) => (
          format(title) // search tasks by tag title
        ))
      ) : format(d.title) // search tasks by title
    ))
  )

  return { prefix, setPrefix, search }
}

export default useSearch