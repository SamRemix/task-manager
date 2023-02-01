import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuthQueries from '../../hooks/useAuthQueries'

import Input from '../../components/Input'
import Button from '../../components/Button'

const Login = () => {
  const { error, setError, login } = useAuthQueries()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()

    login({ email, password })
  }

  return (
    <section className="container">
      <form onSubmit={handleLogin}>
        <motion.div {...config.emailInputAnimation}>
          <Input
            placeholder="Email"
            value={email}
            onChange={e => {
              setError(false)
              setEmail(e.target.value)
            }}
            focus={true}
          />
        </motion.div>

        <motion.div {...config.passwordInputAnimation}>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => {
              setError(false)
              setPassword(e.target.value)
            }}
          />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Button type="form-button">Log in</Button>
        </motion.div>

        {error && (
          <motion.p
            className="error-message"
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        )}
      </form>
    </section>
  )
}

export default memo(Login)