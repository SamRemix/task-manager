import { memo } from 'react'
import { motion } from 'framer-motion'
import config from './motion.config'

// import { useBoardsContext } from '../../hooks/useBoardsContext'

const Home = () => {
  // const { boards } = useBoardsContext()

  return (
    <section className="container home-page">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Task Manager
      </motion.h1>

      {/* {boards && boards.map(board => (
        <p key={board._id}>{board.title}</p>
      ))} */}
    </section>
  )
}

export default memo(Home)