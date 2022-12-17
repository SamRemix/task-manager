import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSignup } from '../../hooks/useSignup'

const Signup = () => {
  const { signup, error } = useSignup()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    await signup(name, email, password)
  }

  return (
    // test
    <section className="container">
      <motion.h1
        className="container__title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        Sign Up
      </motion.h1>

      <form onSubmit={handleSubmit}>
        <motion.input
          type="text"
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder="Name"
          autoFocus
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .3 } }} />

        <motion.input
          type="text"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .1 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .2 } }} />

        <motion.input
          type="text"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .2 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .1 } }} />

        <motion.button
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .3 } }}
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

export default Signup