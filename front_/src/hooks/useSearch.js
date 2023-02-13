import { useState } from 'react'

const useSearch = () => {
  const [prefix, setPrefix] = useState('')

  const search = data => (
    prefix.startsWith('#') ? (
      // search tasks by tag
      data.filter(({ tags }) => (
        tags.find(({ title }) => (
          title
            .trim()
            .toLowerCase()
            .startsWith(
              prefix
                .split('#')[1]
                .trim()
                .toLowerCase()
            )
        ))
      ))
    ) : (
      // search tasks by title
      data.filter(({ title }) => (
        title
          .trim()
          .toLowerCase()
          .startsWith(
            prefix
              .trim()
              .toLowerCase()
          )
      ))
    )
  )

  return { prefix, setPrefix, search }
}

export default useSearch