import { motion } from 'framer-motion'

const Home = () => {
  return (
    <section className="container home-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6 } }}
        exit={{ opacity: 0, transition: { duration: .4 } }}>
        Home
      </motion.h1>

      <motion.div
        className="content"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6 } }}
        exit={{ y: 80, opacity: 0, transition: { duration: .4 } }}>
        <div className="git">
          <div className="commands">
            <p className="command-name">git init</p>
            <p>Initialize an existing directory as a Git repository</p>
          </div>
          <div className="commands">
            <p className="command-name">git remote add origin https://github.com/SamRemix/task-manager-MERN.git</p>
            <p>connect the project to a repository with an alias</p>
          </div>
          <div className="commands">
            <p className="command-name">git add .</p>
            <p>Add all modified files to the next commit</p>
            <p>if error "(fetch first)" =&gt; git fetch</p>
            <p>if error "(non-fast-forward)" =&gt; git pull</p>
          </div>
          <div className="commands">
            <p className="command-name">git status</p>
            <p>Show current branch & modified files</p>
          </div>
          <div className="commands">
            <p className="command-name">git commit -m "comment"</p>
            <p>after git add</p>
            <p>commit files and add a comment about it</p>
          </div>
          <div className="commands">
            <p className="command-name">git push</p>
            {/* <h2>git push origin main</h2> */}
            <p>Transmit local branch commits to the remote repository branch</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Home