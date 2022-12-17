const config = {
  pageTitleAnimation: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: .6
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
  errorMessageAnimation: {
    initial: {
      y: 40,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .2
      }
    },
    exit: {
      y: 40,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  }
}

export default config