import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import useFetch from '../../hooks/useFetch'

import PasswordVerifier from '../../components/PasswordVerifier'
import Input from '../../components/Input'
import Button from '../../components/Button'

const UpdateUserForm = ({ user }) => {
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const { error, setError, fetchData } = useFetch({
    method: 'patch',
    url: `/user/${user?._id}`,
    type: 'UPDATE_USER'
  })

  const update = (e, context) => {
    e.preventDefault()

    return {
      name: () => {
        fetchData({ name })
      },
      email: () => {
        fetchData({ email })
      },
      password: () => {
        fetchData({ currentPassword, newPassword })
      }
    }[context]()
  }

  // const updateName = e => {
  //   e.preventDefault()

  //   fetchData({ name })
  // }

  // const updateEmail = e => {
  //   e.preventDefault()

  //   fetchData({ email })
  // }

  // const updatePassword = e => {
  //   e.preventDefault()

  //   fetchData({ currentPassword, newPassword })
  // }

  return (
    <div className="forms-container">
      <form onSubmit={e => update(e, 'name')}>
        <motion.div {...config.nameInputAnimation}>
          <Input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </motion.div>

        <motion.div {...config.nameButtonAnimation}>
          <Button type="form-button">
            <p>Update name</p>
          </Button>
        </motion.div>
      </form>

      <form onSubmit={e => update(e, 'email')}>
        <motion.div {...config.emailInputAnimation}>
          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </motion.div>

        <motion.div {...config.emailButtonAnimation}>
          <Button type="form-button">
            <p>Update email</p>
          </Button>
        </motion.div>
      </form>

      <form onSubmit={e => update(e, 'password')}>
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

        <motion.div {...config.passwordVerifierAnimation}>
          <PasswordVerifier password={newPassword} />
        </motion.div>

        <motion.div {...config.passwordButtonAnimation}>
          <Button type="form-button">
            <p>Update password</p>
          </Button>
        </motion.div>
      </form>
    </div>
  )
}

UpdateUserForm.propTypes = {
  user: PropTypes.object
}

export default memo(UpdateUserForm)