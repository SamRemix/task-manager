import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useAuthQueries from '../../hooks/useAuthQueries'

import axios from '../../axios.config'

import Modal from '../../components/Modal'
import PasswordValidation from '../../components/PasswordValidation'
import Input from '../../components/Input'
import Button from '../../components/Button'

const UpdateUserForm = ({ user }) => {
  const { dispatch } = useAuthQueries()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [isOpen, setIsOpen] = useState(true)

  if (success || error) {
    setTimeout(() => {
      setIsOpen(false)
    }, 10000)
  }

  const updateName = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.patch(`/user/${user._id}`, {
        name
      })
      console.log(data);

      dispatch({ type: 'UPDATE_USER', payload: data.user })

      setSuccess(data.success)
      setError('')
      setIsOpen(true)
    } catch (err) {
      setSuccess('')
      setError(err.response.data.error)
      setIsOpen(true)
    }
  }

  const updateEmail = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.patch(`/user/${user._id}`, {
        email
      })

      console.log(data);

      dispatch({ type: 'UPDATE_USER', payload: data.user })

      setError(false)
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  const updatePassword = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.patch(`/user/${user._id}`, {
        currentPassword,
        newPassword
      })

      console.log(data);

      dispatch({ type: 'UPDATE_USER', payload: data.user })

      setError(false)
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <div className="forms-container">
      <form onSubmit={updateName}>
        <motion.div {...config.nameInputAnimation}>
          <Input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Button type="form-button">
            <p>Update name</p>
          </Button>
        </motion.div>
      </form>

      <form onSubmit={updateEmail}>
        <motion.div {...config.emailInputAnimation}>
          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Button type="form-button">
            <p>Update email</p>
          </Button>
        </motion.div>
      </form>

      <form onSubmit={updatePassword}>
        <motion.div {...config.currentPasswordInputAnimation}>
          <Input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={e => {
              setError(false)
              setCurrentPassword(e.target.value)
            }}
          />
        </motion.div>

        <motion.div {...config.newPasswordInputAnimation}>
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={e => {
              setError(false)
              setNewPassword(e.target.value)
            }}
          />
        </motion.div>

        <motion.div {...config.passwordValidationAnimation}>
          <PasswordValidation password={newPassword} />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Button type="form-button">
            <p>Update password</p>
          </Button>
        </motion.div>
      </form>

      <AnimatePresence>
        {isOpen && (success || error) && (
          <Modal type="message" error={error} setIsOpen={setIsOpen}>
            {success || error}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

UpdateUserForm.propTypes = {
  user: PropTypes.object.isRequired
}

export default memo(UpdateUserForm)