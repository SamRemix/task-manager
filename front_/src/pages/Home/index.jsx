import { motion } from 'framer-motion'
import config from './motion.config'

const Home = () => {
  return (
    <section className="container home-page">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Task Manager
      </motion.h1>
    </section>
  )
}

export default Home