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
  accountComponentAnimation: {
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
      y: 80,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  }
}

export default config