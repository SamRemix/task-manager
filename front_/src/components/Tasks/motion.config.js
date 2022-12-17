const config = {
  toDoContainerAnimation: {
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
      x: -80,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
  inProgressContainerAnimation: {
    initial: {
      y: 80,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .4
      }
    },
    exit: {
      x: 80,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
  doneContainerAnimation: {
    initial: {
      y: 80,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .6
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