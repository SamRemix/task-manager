import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

const UpdateUserPassword = () => {
  const { user, dispatch } = useAuthContext()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateUserPassword = async e => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.patch(`/user/${user._id}`, {
        currentPassword,
        newPassword
      })

      dispatch({ type: 'UPDATE_USER', payload: data })

      setError(false)
    } catch (err) {
      setLoading(false)
      setError(err.response.data.error)
    }
  }

  return (
    <motion.div {...config.passwordFormAnimation}>
      <form onSubmit={updateUserPassword}>

        <Input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={e => {
            setError(false)
            setCurrentPassword(e.target.value)
          }}
        />

        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={e => {
            setError(false)
            setNewPassword(e.target.value)
          }}
        />

        <Button type="form-button">
          <p>Update password</p>
        </Button>

        {error && (
          <div
            className="error-message">
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

export default memo(UpdateUserPassword)