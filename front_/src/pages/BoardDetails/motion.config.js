const config = {
  topBarAnimation: {
    initial: {
      y: 80,
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
      x: 40,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
  deleteManyButtonAnimation: {
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
      scale: .4
    },
    transition: {
      duration: .1
    }
  }
}

export default config