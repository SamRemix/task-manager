const config = {
  backdropAnimation: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: .2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: .2
      }
    }
  },
  modalAnimation: {
    initial: {
      // y: 40,
      x: '100%',
      // opacity: 0,
    },
    animate: {
      // y: 0,
      x: 0,
      // opacity: 1,
      transition: {
        duration: .2
      }
    },
    exit: {
      // y: 40,
      x: '100%',
      // opacity: 0,
      transition: {
        duration: .1
      }
    }
  }
}

export default config