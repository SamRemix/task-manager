import './styles.scss'

import { memo, useEffect } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useGetBoards from '../../hooks/useGetBoards'

import { Loader, Dimmer } from 'semantic-ui-react'

import Item from './Item'

const Boards = () => {
  const { loading, boards, error, getBoards } = useGetBoards()

  useEffect(() => {
    getBoards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }

  if (!boards) return

  console.log(boards);

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="container boards-page">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Boards
      </motion.h1>

      <motion.div
        className="boards"
        {...config.boardsMenuAnimation}>
        {boards && <nav>
          <ul>
            {boards.map(({ _id, title }) => (
              <Item key={_id} path={_id} title={title} />
            ))}
          </ul>
        </nav>}
      </motion.div>
    </section>
  )
}

export default memo(Boards)