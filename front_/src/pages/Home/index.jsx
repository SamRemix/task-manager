import './styles.scss'

import { memo } from 'react'

import setDocumentTitle from '../../utils/setDocumentTitle'

const Home = () => {
  setDocumentTitle('Home')

  return (
    <section className="container home">
      {/* <h1>Task Manager</h1> */}
      {/* <p>Manage Your Tasks, Achieve Your Goals.</p> */}
      <p>Simplify Your Task Management.</p>
    </section>
  )
}

export default memo(Home)