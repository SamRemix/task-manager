const { Types } = require('mongoose')

const checkObjectId = (id, res, errorMessage) => {
  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: errorMessage })
  }
}

module.exports = checkObjectId

// export default checkObjectId