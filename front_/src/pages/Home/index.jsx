// import './styles.scss'

import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import Header from '../../components/Header'
import QueryStatus from '../../components/QueryStatus'

import setDocumentTitle from '../../utils/setDocumentTitle'

const Home = ({ loading, error }) => {
  setDocumentTitle('Home')

  if (loading || error) {
    return <QueryStatus loading={loading} error={error} />
  }

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