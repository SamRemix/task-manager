const transition = {
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
    opacity: 0,
    scale: .9,
    transition: {
      duration: .4
    }
  }
}

export default transition