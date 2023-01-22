import { useEffect } from 'react'

import capitalize from '../utils/capitalize'

const useDocumentTitle = currentPage => {
  useEffect(() => {
    if (currentPage) {
      document.title = capitalize(currentPage)
    }
  }, [])
}

export default useDocumentTitle