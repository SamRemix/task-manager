const config = {
  activeItemAnimation: {
    initial: {
      // y: -40,
      scale: 0,
    },
    animate: {
      // y: 0,
      scale: 1,
    },
    exit: {
      scale: 0,
      transition: {
        duration: .2
        // delay: .1
      }
    },
    transition: {
      duration: .3
    }
  }
}

export default config