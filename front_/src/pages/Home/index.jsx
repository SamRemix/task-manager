import './styles.scss'

import { memo } from 'react'

import useAuthQueries from '../../hooks/useAuthQueries'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const Home = () => {
  const { user } = useAuthQueries()
  useDocumentTitle('Home')

  return (
    <section className="container home">
      <h1>Task Manager</h1>
      <p>Manage Your Tasks, Achieve Your Goals.</p>
      <p>Simplify Your Task Management.</p>
      {user && <p>Hello {user.name}</p>}
    </section>
  )
}

export default memo(Home)