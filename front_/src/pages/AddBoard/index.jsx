import { memo, useState, createElement } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useFetch from '../../hooks/useFetch'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'
import displayIcon, { icons } from '../../utils/displayIcon'

const AddBoard = () => {
  setDocumentTitle('Add board')

  const [title, setTitle] = useState('')
  const [favorite, setFavorite] = useState(false)
  const [icon, setIcon] = useState(icons[0])

  const { error, setError, fetchData } = useFetch({
    method: 'post',
    url: '/boards',
    type: 'ADD_BOARD'
  })

  const createBoard = e => {
    e.preventDefault()

    fetchData({ title, favorite, icon })
  }

  return (
    <section className="container">
      <Header>
        <h1 className="title">Add board</h1>

        <Button type="back" />
      </Header>

      <div className="content">
        <form onSubmit={createBoard}>
          <motion.div {...config.titleInputAnimation}>
            <Input
              placeholder="Title"
              value={title}
              onChange={e => {
                setError('')
                setTitle(e.target.value)
              }}
              maxLength="24"
              focus={true}
              error={error}
            />
          </motion.div>

          <motion.div {...config.favCheckboxAnimation}>
            <div className="item-container">
              <p>Favorite:</p>
              <div className="item-container-input">
                <Input
                  type="checkbox"
                  placeholder="Favorite"
                  checked={favorite}
                  onChange={() => setFavorite(!favorite)}
                />
              </div>
            </div>
          </motion.div>

          <motion.div {...config.favCheckboxAnimation}>
            <div className="list-container">
              <p>Icon:</p>
              <div className="list-container-input">
                {icons.map((iconName, i) => (
                  <Input
                    key={i}
                    type="radio"
                    placeholder={displayIcon(iconName, { width: '1.75em' })}
                    value={iconName}
                    checked={icon === iconName}
                    onChange={e => {
                      setIcon(e.target.value)
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...config.submitButtonAnimation}>
            <Button type="form-button">Add board</Button>
          </motion.div>
        </form>
      </div>
    </section>
  )
}

export default memo(AddBoard)