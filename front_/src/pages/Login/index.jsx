import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuth from '../../hooks/useAuth'

import { Loader, Form } from 'semantic-ui-react'

const Login = () => {
  const { loading, error, login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    await login(email, password)
  }

  if (loading) {
    return <Loader active content="Loading" />
  }

  return (
    // test
    <section className="container">
      <Form onSubmit={handleSubmit}>
        <motion.div>
          <Form.Input
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            autoFocus
            {...config.emailInputAnimation} />
        </motion.div>
        <motion.div>
          <Form.Input
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            {...config.passwordInputAnimation} />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Form.Button className="submit" content="Submit" secondary />
        </motion.div>

        {error && <motion.p
          className="error-message"
          {...config.errorMessageAnimation}>
          {error}
        </motion.p>}
      </Form>
    </section>
  )
}

export default memo(Login)