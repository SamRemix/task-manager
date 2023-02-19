import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuthContext from '../../hooks/useAuthContext'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const Login = () => {
  const { error, setError, login } = useAuthContext()

  setDocumentTitle('Log in')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()

    login({ email, password })
  }

  return (
    <section className="container">
      <Header>
        <h1 className="title">Log in</h1>
      </Header>

      <div className="content">
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
      </div>
    </section>
  )
}

export default memo(Login)