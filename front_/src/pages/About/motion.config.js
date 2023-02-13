const config = {
  aboutPageAnimation: {
    initial: {
      y: 40,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .4
      }
    },
    exit: {
      y: 40,
      opacity: 0,
      transition: {
        duration: .2
      }
    }
  }
}

export default config