import './styles.scss'

import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import PasswordValidation from './PasswordValidation'

import { useAuthContext } from '../../hooks/useAuthContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

const Signup = () => {
  const { dispatch } = useAuthContext()

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
      <form onSubmit={signup}>
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

          <PasswordValidation password={password} />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Button type="form-button" disabled={error}>Sign up</Button>
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