import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

const UpdateUserEmail = () => {
  const { user, dispatch } = useAuthContext()

  const [email, setEmail] = useState(user.email)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateUserEmail = async e => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.patch(`/user/${user._id}`, { email })

      dispatch({ type: 'UPDATE', payload: data })

      setError(false)
    } catch (err) {
      setError(err.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div {...config.emailFormAnimation}>
      <form onSubmit={updateUserEmail}>
        <Input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button type="form-button">
          <p>Update email</p>
        </Button>

        {error && (
          <div className="error-message">
            <motion.p
              {...config.errorMessageAnimation}>
              {error}
            </motion.p>
          </div>
        )}
      </form>
    </motion.div>
  )
}

export default memo(UpdateUserEmail)