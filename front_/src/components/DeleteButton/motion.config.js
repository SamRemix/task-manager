const config = {
  deleteButtonAnimation: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: .6
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: .2
      }
    }
  },
  backdropAnimation: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: .1
      }
    }
  },
  modalAnimation: {
    initial: {
      y: 80,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .1
      }
    }
  }
}

export default config