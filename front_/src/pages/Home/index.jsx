// import './styles.scss'

import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import Header from '../../components/Header'

import setDocumentTitle from '../../utils/setDocumentTitle'

const Home = () => {
  setDocumentTitle('Home')

  return (
    <section className="container">
      <Header>
        <h1 className="title">Home</h1>
      </Header>
      <div className="content">
        <motion.p {...config.homePageAnimation}>Simplify Your Task Management.</motion.p>
      </div>
    </section>
  )
}

export default memo(Home)