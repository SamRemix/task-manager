import './styles.scss'

import { memo } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useThemeContext from '../../hooks/useThemeContext'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  MoonIcon, // dark theme icon
  SunIcon, // light theme icon
} from '@heroicons/react/24/outline'

const Settings = () => {
  const { theme: currTheme, font: currFont, switchTheme, setFont } = useThemeContext()

  return (
    <section className="container settings">
      <Header>
        <h1 className="title">Settings</h1>

        <Button type="back" />
      </Header>

      <div className="content">
        <motion.div
          className="theme-switcher"
          {...config.themeInputAnimation}>
          <p>Theme</p>

          <div className="themes-container">
            {['light', 'dark'].map((theme, i) => (
              <div key={i} className="theme-input">
                <Input
                  type="radio"
                  name="theme"
                  placeholder={theme}
                  value={theme}
                  checked={theme === currTheme}
                  onChange={e => {
                    switchTheme(e.target.value)
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="font-family-switcher"
          {...config.fontInputAnimation}>
          <p>Font family</p>

          <div className="fonts-container">
            {['Poppins', 'Source Code Pro', 'Comfortaa'].map((font, i) => (
              <div key={i} className="font-input" style={{ fontFamily: font }}>
                <Input
                  type="radio"
                  name="font"
                  placeholder={font}
                  value={font}
                  checked={font === currFont}
                  onChange={e => {
                    setFont(e.target.value)
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Settings)