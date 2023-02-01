const config = {
  userCardAnimation: {
    initial: {
      x: '-100%',
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
      x: '-100%',
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
  navbarItemAnimation: {
    initial: {
      x: '-100%',
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
      x: '-100%',
      opacity: 0,
      transition: {
        duration: .4
      }
    }
  },
  itemTitleAnimation: {
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
        duration: .4
      }
    }
  }
}

export default config