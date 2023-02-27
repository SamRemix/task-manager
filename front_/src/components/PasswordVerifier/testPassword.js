const tests = [{
  condition: '8 characters',
  action: string => (
    string.length >= 8
  )
}, {
  condition: '1 uppercase character',
  action: string => (
    /[A-Z]/.test(string)
  )
}, {
  condition: '1 lowercase character',
  action: string => (
    /[a-z]/.test(string)
  )
}, {
  condition: '1 number',
  action: string => (
    /\d/.test(string)
  )
}, {
  condition: '1 special character',
  action: string => (
    /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(string)
  )
}]

export default tests