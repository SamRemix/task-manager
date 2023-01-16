import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'

import axios from '../../axios.config'

import { Form } from 'semantic-ui-react'

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
      <Form onSubmit={updateUserEmail}>
        <div>
          <Form.Input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email" />
        </div>

        <div>
          {!loading ? (
            <Form.Button className="submit" content="Update email" secondary />
          ) : (
            <Form.Button className="submit" content="Update email" loading secondary />
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

export default memo(UpdateUserEmail)