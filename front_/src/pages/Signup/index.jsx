import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuth from '../../hooks/useAuth'

import { Button } from 'semantic-ui-react'
import { Loader, Form } from 'semantic-ui-react'

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
      <Form onSubmit={handleSubmit}>
        <motion.div>
          <Form.Input
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Name"
            autoFocus
            {...config.nameInputAnimation} />
        </motion.div>

        <motion.div>
          <Form.Input
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            {...config.emailInputAnimation} />
        </motion.div>

        <motion.div>
          <Form.Input
            type="text"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            {...config.passwordInputAnimation} />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Button className="submit" content="Submit" secondary />
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

export default memo(Signup)