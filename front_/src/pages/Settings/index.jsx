import './styles.scss'

import { memo } from 'react'

import useThemeContext from '../../hooks/useThemeContext'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  MoonIcon, // dark theme icon
  SunIcon, // light theme icon
} from '@heroicons/react/24/outline'

const Settings = () => {
  const { theme, font: currFont, switchTheme, setFont } = useThemeContext()

  return (
    <section className="container settings">
      <Header>
        <h1 className="title">Settings</h1>

        <Button type="back" />
      </Header>

      <div className="content">
        <div className="theme-switcher" onClick={switchTheme}>
          <p>Current theme:</p>
          <Button>
            {theme === 'light' ? (
              <SunIcon width="1.75em" />
            ) : (
              <MoonIcon width="1.75em" />
            )}
            {theme}
          </Button>
        </div>

        <div className="font-family-switcher">
          <p>Font family</p>

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
      </div>
    </section>
  )
}

export default memo(Settings)