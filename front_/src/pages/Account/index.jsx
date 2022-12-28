import './styles.scss'

import { memo } from 'react'
import { motion } from 'framer-motion'
import config from './motion.config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { formatDistanceToNowStrict } from 'date-fns'

const Account = () => {
  const { user } = useAuthContext()

  return (
    <section className="container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Account
      </motion.h1>

      {user && <motion.div
        className="account"
        {...config.accountComponentAnimation}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Account created {formatDistanceToNowStrict(new Date(user.createdAt), { addSuffix: true })}.</p>
      </motion.div>}
    </section>
  )
}

export default memo(Account)