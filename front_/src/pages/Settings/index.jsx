import { memo } from 'react'

import useThemeContext from '../../hooks/useThemeContext'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Settings = () => {
  const { font: currFont, setFont } = useThemeContext()

  return (
    <section className="container">
      <Header>
        <h1 className="title">Settings</h1>

        <Button type="back" />
      </Header>

      <div className="content">
        <p>test</p>

        <div className="font-family-input">
          {['Poppins', 'Source Code Pro'].map((font, i) => (
            <Input
              key={i}
              type="radio"
              name="status"
              placeholder={font}
              value={font}
              checked={font === currFont}
              onChange={e => {
                setFont(e.target.value)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(Settings)