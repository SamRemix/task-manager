import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

const UpdateUserName = () => {
  const { user, dispatch } = useAuthContext()

  const [name, setName] = useState(user.name)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateUserName = async e => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.patch(`/user/${user._id}`, { name })

      dispatch({ type: 'UPDATE', payload: data })

      setError(false)
    } catch (err) {
      setError(err.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div {...config.nameFormAnimation}>
      <form onSubmit={updateUserName}>
        <Input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Button type="form-button">
          <p>Update name</p>
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

UpdateUserName.propTypes = {
}

export default memo(UpdateUserName)