import { createElement } from 'react'

import * as Heroicons from '@heroicons/react/24/outline'

export const icons = [
  'DocumentTextIcon',
  'AcademicCapIcon',
  'LockClosedIcon',
  'MusicalNoteIcon',
  'FilmIcon'
]

const displayIcon = (icon, attr = null) => (
  createElement(Heroicons[icon], attr)
)

export default displayIcon