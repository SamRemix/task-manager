import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuth from '../../hooks/useAuth'

import { Button } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'

const Signup = () => {
  const { loading, error, signup } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    await signup(name, email, password)
  }

  if (loading) {
    return <Loader active content="Loading" />
  }

  return (
    // test
    <section className="container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Sign Up
      </motion.h1>

      <form onSubmit={handleSubmit}>
        <motion.input
          type="text"
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder="Name"
          autoFocus
          {...config.nameInputAnimation} />

        <motion.input
          type="text"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          {...config.emailInputAnimation} />

        <motion.input
          type="text"
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

export default memo(Signup)