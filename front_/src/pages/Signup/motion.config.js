const config = {
  nameInputAnimation: {
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
      x: 80,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .4
      }
    }
  },
  emailInputAnimation: {
    initial: {
      x: -160,
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
      x: 80,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .3
      }
    }
  },
  passwordInputAnimation: {
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
      x: 80,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .2
      }
    }
  },
  passwordVerifierAnimation: {
    initial: {
      x: -160,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .6,
        delay: .3
      }
    },
    exit: {
      x: 80,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .1
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
        delay: .4
      }
    },
    exit: {
      x: 80,
      opacity: 0,
      transition: {
        duration: .2
      }
    }
  },
  errorMessageAnimation: {
    initial: {
      x: -80,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .4
      }
    },
    exit: {
      opacity: 0
    }
  }
}

export default config