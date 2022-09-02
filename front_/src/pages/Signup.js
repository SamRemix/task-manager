import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSignup } from '../hooks/useSignup'

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
    <section className="container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        Sign Up
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ y: 80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        <input
          type="text"
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder="Name"
          autoFocus />
        <input
          type="text"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Email" />
        <input
          type="text"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Password" />
        <button>Submit</button>
        {error && <motion.p
          className="error-message"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .2 } }}>
          {error}
        </motion.p>}
      </motion.form>
    </section>
  )
}

export default Signup