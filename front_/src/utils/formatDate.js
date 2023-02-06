// import { formatDistanceToNowStrict } from 'date-fns'

const formatDate = date => (
  // formatDistanceToNowStrict(new Date(date), { addSuffix: true })
  new Date(date).toLocaleDateString('en-US', { dateStyle: 'medium' })
)

export default formatDate