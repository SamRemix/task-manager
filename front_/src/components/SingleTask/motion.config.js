const config = {
  singleTaskAnimation: {
    initial: {
      opacity: 0,
      scale: .4
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: .4,
      transition: {
        duration: .1
      }
    },
    transition: {
      duration: .3
    }
  }
}

export default config