import { memo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'
import useDisplayPassword from '../../hooks/useDisplayPassword'

import axios from '../../axios.config'

import { Form, Icon } from 'semantic-ui-react'

const Login = () => {
  const { dispatch } = useAuthContext()
  const { displayPassword, togglePassword } = useDisplayPassword()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(false)

  const login = async e => {
    e.preventDefault()

    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.post('/user/login', {
        email,
        password
      })

      dispatch({ type: 'LOGIN', payload: data })

      localStorage.setItem('token', JSON.stringify(data.token))

      setError(false)

      navigate('/')
    } catch (err) {
      setError(err.response.data.error)
      // dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  return (
    // test
    <section className="container">
      <Form onSubmit={login}>
        <motion.div {...config.emailInputAnimation}>
          <Form.Input
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            autoFocus />
        </motion.div>

        <motion.div {...config.passwordInputAnimation}>
          <Form.Input
            icon={
              <Icon
                name={displayPassword ? 'hide' : 'unhide'}
                onClick={togglePassword} />
            }
            type={displayPassword ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="Password" />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Form.Button className="submit" content="Submit" secondary />
        </motion.div>

        {error && (
          <motion.p
            className="error-message"
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        )}
      </Form>
    </section>
  )
}

export default memo(Login)