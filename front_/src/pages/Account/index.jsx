import './styles.scss'

import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'

import { formatDistanceToNowStrict } from 'date-fns'

import { Form } from 'semantic-ui-react'

const Account = () => {
  const { loading, user, error } = useAuthContext()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.token)

  return (
    <section className="container">
      {/* {user && <motion.div
        className="account"
        {...config.accountComponentAnimation}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Account created {formatDistanceToNowStrict(new Date(user.createdAt), { addSuffix: true })}.</p>
      </motion.div>} */}
      <Form>
        <motion.div {...config.nameInputAnimation}>
          <Form.Input
            type="text"
            className={`title__input${error && ' error'}`}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Title"
            maxLength="36"
            autoFocus />
        </motion.div>

        <motion.div {...config.emailInputAnimation}>
          <Form.Input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Description (optional)">
          </Form.Input>
        </motion.div>

        <motion.div {...config.passwordInputAnimation}>
          <Form.Input
            type="text"
            className={`title__input${error && ' error'}`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password" />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Form.Button className="submit" content="Update infos" secondary />
          ) : (
            <Form.Button className="submit" content="Update infos" loading secondary />
          )}
        </motion.div>

        {error && <div
          className="error-message">
          <motion.p
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        </div>}
      </Form>
    </section>
  )
}

export default memo(Account)