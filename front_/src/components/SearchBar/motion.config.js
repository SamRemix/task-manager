const config = {
  searchBarAnimation: {
    initial: {
      y: 80,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .6
      }
    },
    exit: {
      x: 80,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  }
}

export default config