const config = {
  addTaskButtonAnimation: {
    initial: {
      x: -80,
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
      x: -80,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
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
  },
  taskQuickAddAnimation: {
    initial: {
      y: -40
    },
    animate: {
      y: 0,
      transition: {
        duration: .4
      }
    },
    exit: {
      y: -40,
      transition: {
        duration: .2
      }
    }
  },
  settingsButtonAnimation: {
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