import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
  const { login, error } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    // test
    <section className="container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6 } }}
        exit={{ opacity: 0, transition: { duration: .4 } }}>
        Log In
      </motion.h1>
      <div style={{ position: 'absolute', inset: 0 }}>
        <p>s_capron@hotmail.fr</p>
        <p>Gg-967026</p>
      </div>


      <form onSubmit={handleSubmit}>
        <motion.input
          type="text"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          autoFocus
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .2 } }} />

        <motion.input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .1 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .1 } }} />

        <motion.button
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .2 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2 } }}>
          Submit
        </motion.button>

        {error && <motion.p
          className="error-message"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .2 } }}
          exit={{ opacity: 0 }}>
          {error}
        </motion.p>}
      </form>
    </section>
  )
}

export default Login