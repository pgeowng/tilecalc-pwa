import { useEffect, useState } from 'react'
import './App.css'
import { Field } from './components/ui/Field/Field.js'
import { Select } from './components/ui/Select/Select.js'

const App = () => {
  const defaultWidth = 0
  const defaultLength = 0
  // const defaultHeight = 1
  const [width, setWidth] = useState(defaultWidth)
  const [length, setLength] = useState(defaultLength)
  // const [height, setHeight] = useState(defaultHeight)

  const unitMap = ['м', 'см', 'мм']
  const unitExp = { м: 1000, см: 10, мм: 1 }
  const [units, setUnits] = useState(unitMap[1])

  const updateUnits = (newUnits) => {
    console.log('update units')
    const oldExp = unitExp[units]
    const newExp = unitExp[newUnits]
    setWidth((width * oldExp) / newExp)
    setLength((length * oldExp) / newExp)
    setUnits(newUnits)
  }
  console.log('rerender')

  const trueWidth = width * unitExp[units]
  const trueLength = length * unitExp[units]

  const [err, setErr] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setErr('hi world')
      setTimeout(() => {
        setErr(null)
      }, 100000)
    }, 1000)
  }, [])

  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <Field
            label="Ширина"
            value={width}
            setValue={setWidth}
            placeholder={defaultWidth}
          />
        </div>
        <div className="column">
          <Field
            label="Длина"
            value={length}
            setValue={setLength}
            required
            placeholder={defaultLength}
            error={err}
          />
        </div>
        <div className="column column_fixed">
          <Select
            value={units}
            setValue={updateUnits}
            options={unitMap}
            label="Единицы"
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          {width} x {length} ({units}) = {trueWidth} x {trueLength} (мм)
        </div>
      </div>
    </div>
  )
}

export default App
