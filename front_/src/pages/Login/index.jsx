import { useState } from 'react'
import { motion } from 'framer-motion'
import config from './motion.config'
import { useLogin } from '../../hooks/useLogin'
import { Button } from 'semantic-ui-react'

const Login = () => {
  const { login, error } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    // test
    <section className="container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Log In
      </motion.h1>

      <form onSubmit={handleSubmit}>
        <motion.input
          type="text"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          autoFocus
          {...config.emailInputAnimation} />

        <motion.input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          {...config.passwordInputAnimation} />

        <motion.div {...config.submitButtonAnimation}>
          <Button className="submit" primary>Submit</Button>
        </motion.div>

        {error && <motion.p
          className="error-message"
          {...config.errorMessageAnimation}>
          {error}
        </motion.p>}
      </form>
    </section>
  )
}

export default Login