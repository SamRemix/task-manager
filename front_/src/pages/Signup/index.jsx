import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuthContext from '../../hooks/useAuthContext'

import Header from '../../components/Header'
import PasswordValidation from '../../components/PasswordValidation'
import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const Signup = () => {
  const { error, setError, signup } = useAuthContext()

  setDocumentTitle('Sign up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = e => {
    e.preventDefault()

    signup({ name, email, password })
  }

  return (
    <section className="container">
      <Header>
        <h1 className="title">Sign up</h1>
      </Header>

      <div className="content">
        <form onSubmit={handleSignup}>
          <motion.div {...config.nameInputAnimation}>
            <Input
              placeholder="Name"
              value={name}
              onChange={e => {
                setError(false)
                setName(e.target.value)
              }}
              focus={true}
            />
          </motion.div>

          <motion.div {...config.emailInputAnimation}>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => {
                setError(false)
                setEmail(e.target.value)
              }}
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

          <motion.div {...config.passwordValidationAnimation}>
            <PasswordValidation password={password} />
          </motion.div>

          <motion.div {...config.submitButtonAnimation}>
            <Button type="form-button">Sign up</Button>
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

export default memo(Signup)