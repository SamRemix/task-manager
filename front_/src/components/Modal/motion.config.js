const config = {
  backdropAnimation: {
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
      duration: .3
    }
  },
  modalAnimation: {
    initial: {
      x: '100%'
    },
    animate: {
      x: 0
    },
    exit: {
      x: '100%'
    },
    transition: {
      duration: .3
    }
  }
}

export default config