import { useEffect, useState } from 'react'
import './App.css'
import { Field } from './components/ui/Field/Field.js'

const App = () => {
  const defaultWidth = 1
  const defaultLength = 1
  // const defaultHeight = 1
  const [width, setWidth] = useState(defaultWidth)
  const [length, setLength] = useState(defaultLength)
  // const [height, setHeight] = useState(defaultHeight)

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
      </div>
      <div className="row">
        <div className="column">
          {width} x {length}
        </div>
      </div>
    </div>
  )
}

export default App
