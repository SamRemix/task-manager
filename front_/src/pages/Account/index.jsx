import './styles.scss'

import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuthQueries from '../../hooks/useAuthQueries'
import useDocumentTitle from '../../hooks/useDocumentTitle'

import UpdateUserForm from './UpdateUserForm'

import formatDate from '../../utils/formatDate'

const Account = () => {
  const { user } = useAuthQueries()

  useDocumentTitle(user?.name)

  return (
    <section className="container account">
      <UpdateUserForm user={user} />

      {user && (
        <motion.div className="timestamps" {...config.timestampsAnimation}>
          <p>Account created: {formatDate(user.createdAt)}.</p>

          {user.createdAt !== user.updatedAt && (
            <p>Last update: {formatDate(user.updatedAt)}.</p>
          )}
        </motion.div>
      )}
    </section>
  )
}

export default memo(Account)