import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useLogin from '../../hooks/useLogin'

import { Loader, Dimmer, Button } from 'semantic-ui-react'

const Login = () => {
  const { loading, error, login } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    await login(email, password)
  }

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
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

export default memo(Login)