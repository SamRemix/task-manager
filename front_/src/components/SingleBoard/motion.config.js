const config = {
  singleBoardAnimation: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: .4
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: .1,
      }
    }
  },
  boardTitleAnimation: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    },
    transition: {
      duration: .4
    }
  }
}

export default config