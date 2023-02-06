const config = {
  headerButtonsAnimation: {
    initial: {
      x: 80,
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
      x: 40,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
  searchBarAnimation: {
    initial: {
      x: 80,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .1
      }
    },
    exit: {
      x: 40,
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  }
}

export default config