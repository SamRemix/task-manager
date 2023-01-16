import './styles.scss'

import { memo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import PasswordValidation from './PasswordValidation'

import { useAuthContext } from '../../hooks/useAuthContext'
import useDisplayPassword from '../../hooks/useDisplayPassword'

import axios from '../../axios.config'

import { Form, Icon } from 'semantic-ui-react'

const Signup = () => {
  const { dispatch } = useAuthContext()
  const { displayPassword, togglePassword } = useDisplayPassword()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(false)

  const signup = async e => {
    e.preventDefault()

    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.post('/user/signup', {
        name,
        email,
        password
      })

      dispatch({ type: 'LOGIN', payload: data })

      localStorage.setItem('token', JSON.stringify(data.token))

      setError(false)

      navigate('/')
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <section className="container signup">
      <Form onSubmit={signup}>
        <motion.div {...config.nameInputAnimation}>
          <Form.Input
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Name"
            autoFocus />
        </motion.div>

        <motion.div {...config.emailInputAnimation}>
          <Form.Input
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="Email" />
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

          <PasswordValidation password={password} />
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

export default memo(Signup)