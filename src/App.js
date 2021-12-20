import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { NavMenu } from './components/block/NavMenu/NavMenu.js'
import { Field } from './components/ui/Field/Field.js'
import { Select } from './components/ui/Select/Select.js'
import { Arrow } from './components/ui/Arrow/Arrow.js'

import { PricePage } from './components/block/PricePage/PricePage'
import { PackagePage } from './components/block/PackagePage/PackagePage'

import iconDollarSign from './components/icons/dollar-sign.svg'
import iconPackage from './components/icons/package.svg'
import iconPlusSquare from './components/icons/plus-square.svg'

const pages = [
  {
    id: 'price',
    icon: iconDollarSign,
    imgAlt: 'цена',
    title: 'Цена плитки',
  },
  {
    id: 'package',
    icon: iconPackage,
    imgAlt: 'упаковки',
    title: 'Кол-во упаковок',
  },
  {
    id: 'area',
    icon: iconPlusSquare,
    imgAlt: 'площадь',
    title: 'Кв.м. упаковки',
  },
]

const App = () => {

  const [currentPage, setCurrentPage] = useState('price')

  return (
    <div className="App">
      <div className="App-NavMenu">
        <NavMenu
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <hr />
      <PricePage />
      <PackagePage />
    </div>
  )
}

export default App
