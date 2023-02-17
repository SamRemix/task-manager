import './styles.scss'

import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useAuthQueries from '../../hooks/useAuthQueries'

import UpdateUserForm from './UpdateUserForm'
import Header from '../../components/Header'
import Button from '../../components/Button'

import formatDate from '../../utils/formatDate'
import setDocumentTitle from '../../utils/setDocumentTitle'

const Account = () => {
  const { user } = useAuthQueries()

  setDocumentTitle(user?.name)

  return (
    <section className="container account">
      <Header>
        <h1 className="title">Acccount</h1>

        <Button type="back" />
      </Header>

      <div className="content">
        <UpdateUserForm user={user} />

        {/* {user && ( */}
        <motion.div className="tips timestamps" {...config.timestampsAnimation}>
          <p>Account created: {formatDate(user.createdAt)}.</p>

          {user.createdAt !== user.updatedAt && (
            <p>Last update: {formatDate(user.updatedAt)}.</p>
          )}
        </motion.div>
        {/* )} */}
      </div>
    </section>
  )
}

export default memo(Account)