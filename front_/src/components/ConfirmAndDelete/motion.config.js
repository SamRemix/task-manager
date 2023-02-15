const config = {
  deleteButtonAnimation: {
    transition: {
      duration: .2
    }
  },
  cancelButtonAnimation: {
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
      duration: .2
    }
  },
  confirmMessageAnimation: {
    initial: {
      x: -40,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 40,
      opacity: 0
    },
    transition: {
      duration: .4
    }
  }
}

export default config