import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuthQueries from '../../hooks/useAuthQueries'

import PasswordValidation from '../../components/PasswordValidation'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Signup = () => {
  const { error, setError, signup } = useAuthQueries()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = e => {
    e.preventDefault()

    signup({ name, email, password })
  }

  return (
    <section className="container signup">
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
    </section>
  )
}

export default memo(Signup)