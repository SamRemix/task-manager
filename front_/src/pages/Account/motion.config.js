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
        delay: .5
      }
    }
  },
  nameButtonAnimation: {
    initial: {
      x: -160,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .4,
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
        delay: .4
      }
    }
  },
  emailButtonAnimation: {
    initial: {
      x: -160,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .4,
        delay: .5
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
  currentPasswordInputAnimation: {
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
        delay: .3
      }
    }
  },
  newPasswordInputAnimation: {
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
        delay: .4
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
  passwordButtonAnimation: {
    initial: {
      x: -160,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .4,
        delay: .6
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
  },
  timestampsAnimation: {
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
}

export default config