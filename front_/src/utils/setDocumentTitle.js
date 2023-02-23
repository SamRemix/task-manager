import capitalize from './capitalize'

const useDocumentTitle = page => {
  if (page) {
    document.title = capitalize(page)
  }
}

export default useDocumentTitle