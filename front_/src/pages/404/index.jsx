import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <section className="container">
      <div className="not-found">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
          404
        </motion.h1>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .2, ease: 'easeOut' } }}
          exit={{ y: 40, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
          Page Not Found
        </motion.p>
      </div>
    </section>
  )
}

export default NotFound