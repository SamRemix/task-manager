import './styles.scss'

import React from 'react'

import useDocumentTitle from '../../hooks/useDocumentTitle'

const About = () => {
  useDocumentTitle('About')

  return (
    <section className="container about">
      <h1>About</h1>
      <div>
        <p>I started thinking about this project in April 2022 and started it in a first version with Svelte to learn this framework.</p>
        <p>In September 2022, I start learning React as an autodidact before integrating a specialized training 3 months later.</p>
        <p>And to learn this new framework I decided to start the project from scratch with a backend made with Express and a MongoDB database.</p>
      </div>
      <div className="about-technos">
        <div className="about-technos-front">
          <p>Frontend</p>
          <ul>
            <li>react 18.2</li>
            <li>react router 6.3</li>
            <li>framer motion 8.2</li>
            <li>sass 1.54.4</li>
            <li>axios 1.2.1</li>
          </ul>
        </div>
        <div className="about-technos-back">
          <p>Backend</p>
          <ul>
            <li>node js</li>
            <li>express 4.18.2</li>
            <li>mongodb</li>
            <li>mongoose 6.8.1</li>
            <li>jwt 9</li>
            <li>bcrypt 5.1</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About