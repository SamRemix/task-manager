const config = {
  titleInputAnimation: {
    initial: {
      x: -160,
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
      x: 120,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .2
      }
    }
  },
  submitButtonAnimation: {
    initial: {
      x: -160,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .2
      }
    },
    exit: {
      x: 120,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .1
      }
    }
  },
  tagsContainerAnimation: {
    initial: {
      x: -160,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .4
      }
    },
    exit: {
      x: 120,
      opacity: 0,
      transition: {
        duration: .2
      }
    }
  },
  tagAnimation: {
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