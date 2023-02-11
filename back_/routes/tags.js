const { Router } = require('express')
const {
  getTags,
  createTag,
  // updateTag,
  deleteTag
} = require('../controllers/tagController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.use(requireAuth)

router.get('/', getTags)

router.post('/', createTag)

// router.patch('/:id', updateTag)

router.delete('/:id', deleteTag)

module.exports = router