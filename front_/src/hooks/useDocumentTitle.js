import { useEffect } from 'react'

const useDocumentTitle = currentPage => {
  useEffect(() => {
    if (!currentPage) {
      document.title = currentPage
    }
  }, [])
}

export default useDocumentTitle