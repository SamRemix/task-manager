import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import useTagsContext from '../../hooks/useTagsContext'

import Input from '../../components/Input'
import Button from '../../components/Button'

import formatDate from '../../utils/formatDate'

const TagSettings = ({ tag, toggle }) => {
  const { error, setError, updateTag, deleteTag } = useTagsContext()

  const [title, setTitle] = useState(tag.title)

  const handleUpdateTag = e => {
    e.preventDefault()

    updateTag(tag._id, { title })

    toggle()
  }

  const handleDeleteTag = () => {
    deleteTag(tag._id)

    toggle()
  }

  return (
    <>
      <h1 className="modal-content-title">Tag settings</h1>
      <form onSubmit={handleUpdateTag}>
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

        <Button type="form-button">Update tag</Button>
      </form>

      <Button type="delete" event={handleDeleteTag}>Delete tag</Button>

      <div className="tips">
        <p>Created on {formatDate(tag.createdAt)}</p>

        {tag.createdAt !== tag.updatedAt && (
          <p>Last update on {formatDate(tag.updatedAt)}</p>
        )}
      </div>
    </>
  )
}

TagSettings.propTypes = {
  tag: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
}

export default memo(TagSettings)