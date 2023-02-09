import capitalize from './capitalize'

const useDocumentTitle = currentPage => {
  if (currentPage) {
    document.title = capitalize(currentPage)
  }
}

export default useDocumentTitle