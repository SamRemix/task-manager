import { motion } from 'framer-motion'

const Home = () => {
  return (
    <section className="container home-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6 } }}
        exit={{ opacity: 0, transition: { duration: .4 } }}>
        Home
      </motion.h1>

      <motion.div
        className="content"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6 } }}
        exit={{ y: 80, opacity: 0, transition: { duration: .4 } }}>
      </motion.div>
    </section>
  )
}

export default Home