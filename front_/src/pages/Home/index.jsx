import './styles.scss'

import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import setDocumentTitle from '../../utils/setDocumentTitle'

const Home = () => {
  setDocumentTitle('Home')

  return (
    <section className="container home">
      {/* <h1>Task Manager</h1> */}
      {/* <p>Manage Your Tasks, Achieve Your Goals.</p> */}
      <motion.p {...config.homePageAnimation}>Simplify Your Task Management.</motion.p>
    </section>
  )
}

export default memo(Home)