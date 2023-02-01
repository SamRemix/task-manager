const verifyPassword = password => {
  const verifyLength = () => (
    password.length >= 8
  )

  const verifyUppercase = () => (
    /[A-Z]/.test(password)
  )

  const verifyLowercase = () => (
    /[a-z]/.test(password)
  )

  const verifyNumber = () => (
    /\d/.test(password)
  )

  const verifySpecialChar = () => (
    /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password)
  )

  return { verifyLength, verifyUppercase, verifyLowercase, verifyNumber, verifySpecialChar }
}

export default verifyPassword