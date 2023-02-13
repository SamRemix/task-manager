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
  percentAnimation: {
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
      duration: .2
    }
  },
  arrowAnimation: {
    initial: {
      y: -20,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: -20,
      opacity: 0
    },
    transition: {
      duration: .2
    }
  }
}

export default config