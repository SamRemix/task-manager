import './styles.scss'

import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'

import UpdateUserName from './UpdateUserName'
import UpdateUserEmail from './UpdateUserEmail'
import UpdateUserPassword from './UpdateUserPassword'

import { isValid, formatDistanceToNowStrict, parseISO } from 'date-fns'

const Account = () => {
  const { user } = useAuthContext()

  return (
    <section className="container account">
      {user && (
        <>
          {isValid(parseISO(user.createdAt)) && (
            <motion.div className="timestamps" {...config.timestampsAnimation}>
              <p>Account created {formatDistanceToNowStrict(parseISO(user.createdAt), { addSuffix: true })}.</p>
              {user.createdAt !== user.updatedAt && (
                <p>Last update {formatDistanceToNowStrict(parseISO(user.updatedAt), { addSuffix: true })}.</p>
              )}
            </motion.div>
          )}

          <UpdateUserName />

          <UpdateUserEmail />

          <UpdateUserPassword />
        </>
      )}
    </section>
  )
}

export default memo(Account)