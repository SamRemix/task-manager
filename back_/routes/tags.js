const { Router } = require('express')
const {
  getTags,
  getTag,
  createTag,
  updateTag,
  deleteTag
} = require('../controllers/tagController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.use(requireAuth)

router.get('/', getTags)

router.get('/:id', getTag)

router.post('/', createTag)

router.patch('/:id', updateTag)

router.delete('/:id', deleteTag)

module.exports = router