const config = {
  backButtonAnimation: {
    initial: {
      x: -20,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: .2,
        delay: .1
      }
    },
    exit: {
      x: -20,
      opacity: 0,
      transition: {
        duration: .2,
        delay: .1
      }
    }
  }
}

export default config