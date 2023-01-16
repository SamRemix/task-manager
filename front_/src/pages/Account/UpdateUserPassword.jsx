import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'
import useDisplayPassword from '../../hooks/useDisplayPassword'

import axios from '../../axios.config'

import { Form, Icon } from 'semantic-ui-react'

const UpdateUserPassword = () => {
  const { user, dispatch } = useAuthContext()
  const { displayPassword, togglePassword } = useDisplayPassword()

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

      dispatch({ type: 'UPDATE', payload: data })

      setError(false)
    } catch (err) {
      setError(err.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div {...config.passwordFormAnimation}>
      <Form onSubmit={updateUserPassword}>
        <div>
          <Form.Input
            icon={
              <Icon
                name={displayPassword ? 'hide' : 'unhide'}
                onClick={togglePassword} />
            }
            type={displayPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="Current Password" />

          <Form.Input
            icon={
              <Icon
                name={displayPassword ? 'hide' : 'unhide'}
                onClick={togglePassword} />
            }
            type={displayPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Password" />
        </div>

        <div>
          {!loading ? (
            <Form.Button className="submit" content="Update password" secondary />
          ) : (
            <Form.Button className="submit" content="Update password" loading secondary />
          )}
        </div>

        {error && (
          <div
            className="error-message">
            <motion.p
              {...config.errorMessageAnimation}>
              {error}
            </motion.p>
          </div>
        )}
      </Form>
    </motion.div>
  )
}

export default memo(UpdateUserPassword)