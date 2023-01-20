import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'

import axios from '../../axios.config'

import Button from '../../components/Button'
import { Form } from 'semantic-ui-react'

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
      <Form onSubmit={updateUserName}>
        <div>
          <Form.Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            maxLength="36" />
        </div>

        <Button>
          <p>Update name</p>
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
      </Form>
    </motion.div>
  )
}

UpdateUserName.propTypes = {
}

export default memo(UpdateUserName)