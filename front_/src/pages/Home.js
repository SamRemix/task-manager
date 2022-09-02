import { motion } from 'framer-motion'

const Home = () => {
  return (
    <section className="container home-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        Home
      </motion.h1>

      <motion.div
        className="content"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ y: 80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        <div className="git">
          <div className="commands">
            <h2>git init</h2>
            <p>Initialize an existing directory as a Git repository</p>
          </div>
          {/* <div className="commands">
            <h2>git remote add <i>origin github-repo-link</i></h2>
            <p><span>alias: origin, URL: github-repo-link</span></p>
            <p>Add a git URL as an alias</p>
          </div> */}
          <div className="commands important">
            <h2>git add .</h2>
            <p><span>git add folder/file: single file</span></p>
            <p>Add a file as it looks now to your next commit (stage)</p>
          </div>
          <div className="commands important">
            <h2>git status</h2>
            <p>Show modified files in working directory, staged for your next commit</p>
          </div>
          <div className="commands important">
            <h2>git commit <i>-m "comment"</i></h2>
            <p><span>add comment: -m "comment"</span></p>
            <p>commit your staged content as a new commit snapshot</p>
          </div>
          <div className="commands important">
            <h2>git push</h2>
            {/* <h2>git push -u <i>origin branch</i></h2> */}
            <p><span>origin: alias (git remote add), branch: master</span></p>
            <p>Transmit local branch commits to the remote repository branch</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Home