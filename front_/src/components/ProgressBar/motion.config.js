const config = {
  progressBarAnimation: {
    initial: {
      x: -40,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .6
      }
    },
    exit: {
      x: -40,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
  progressBarItemAnimation: {
    initial: {
      scale: 0
    },
    animate: {
      scale: 1
    },
    exit: {
      scale: 0
    },
    transition: {
      duration: .4
    }
  },
  arrowAnimation: {
    initial: {
      y: -40,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: -40,
      opacity: 0
    },
    transition: {
      duration: .3
    }
  }
}

export default config