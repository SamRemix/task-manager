import './style.scss'

import { motion } from 'framer-motion'
import { useAuthContext } from '../../hooks/useAuthContext'
import { formatDistanceToNowStrict } from 'date-fns'

const Account = () => {
  const { user } = useAuthContext()

  return (
    <section className="container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        Account
      </motion.h1>

      {user && <motion.div
        className="account"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ y: 80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Account created {formatDistanceToNowStrict(new Date(user.createdAt), { addSuffix: true })}.</p>
      </motion.div>}
    </section>
  )
}

export default Account