import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Field } from './components/ui/Field/Field.js'
import { Select } from './components/ui/Select/Select.js'
import { Arrow } from './components/ui/Arrow/Arrow.js'

const unitMap = ['м', 'см', 'мм']
const unitExp = { м: 1000, см: 10, мм: 1 }

const defaultMeterPrice = 0
const defaultTotalPrice = 0
const defaultTileCount = 0
const defaultTotalArea = 0

const LEFT = false
const RIGHT = true

const useStateListen = (defaultValue, defaultSubs = []) => {
  const [value, setValue] = useState(defaultValue)
  const [subs, setSubs] = useState(defaultSubs)

  const setter = useCallback(
    (val) => {
      setValue(val)
      subs.forEach((fn) => fn(value, val))
    },
    [subs, value]
  )

  return [value, setter]
}

const App = () => {
  const defaultWidth = 0
  const defaultLength = 0

  const [width, setWidth] = useStateListen(defaultWidth)
  const [length, setLength] = useStateListen(defaultLength)

  const [units, setUnits] = useStateListen(unitMap[1])

  const updateUnits = (newUnits) => {
    const oldExp = unitExp[units]
    const newExp = unitExp[newUnits]
    setWidth((width * oldExp) / newExp)
    setLength((length * oldExp) / newExp)
    setUnits(newUnits)
  }

  const [tileArea, setTileArea] = useState(0)

  const round = (num, precision = 7) =>
    Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)

  useEffect(() => {
    const trueWidth = width * unitExp[units]
    const trueLength = length * unitExp[units]
    setTileArea(round(trueWidth * trueLength * 1e-6))
  }, [width, length, units])

  const [err, setErr] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      setErr('hi world')
      setTimeout(() => {
        setErr(null)
      }, 100000)
    }, 1000)
  }, [])

  const [tileCount, setTileCount] = useState(defaultTileCount)
  const [totalArea, setTotalArea] = useState(defaultTotalArea)
  const [meterPrice, setMeterPrice] = useState(defaultMeterPrice)
  const [totalPrice, setTotalPrice] = useState(defaultTotalPrice)

  const [priceDir, setPriceDir] = useState(RIGHT)
  const [areaDir, setAreaDir] = useState(RIGHT)
  const setPriceDirValue = (val) => () => setPriceDir(val)
  const setAreaDirValue = (val) => () => setAreaDir(val)

  // multiple reruns :(
  useEffect(() => {
    if (areaDir === RIGHT) {
      setTotalArea(round(tileCount * tileArea, 2))
    } else {
      if (tileArea !== 0) {
        setTileCount(round(totalArea / tileArea, 2))
      } else {
        setTileCount(defaultTileCount)
      }
    }
  }, [tileCount, totalArea, areaDir, tileArea])

  useEffect(() => {
    if (priceDir === RIGHT) {
      setTotalPrice(round(totalArea * meterPrice, 2))
    } else {
      if (totalArea === 0) {
        setMeterPrice(defaultMeterPrice)
      } else {
        setMeterPrice(round(totalPrice / totalArea, 2))
      }
    }
  }, [priceDir, meterPrice, totalArea, totalPrice])

  const defaultPackTileCount = 0
  const [packTileCount, setPackTileCount] = useState(defaultPackTileCount)

  const defaultPackCeil = 0
  const [packCeil, setPackCeil] = useState(defaultPackCeil)

  const defaultPackRemain = 0
  const [packRemain, setPackRemain] = useState(defaultPackRemain)

  useEffect(() => {
    if (packTileCount !== 0) {
      const ceil = Math.ceil(tileCount / packTileCount)
      const remain = ceil * packTileCount - tileCount
      setPackCeil(ceil)
      setPackRemain(remain)
    }
  }, [packTileCount, tileCount])

  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <Field
            label="Ширина"
            value={width}
            setValue={setWidth}
            placeholder={defaultWidth}
            required
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
          <Field
            disabled
            label="Площадь (кв. м)"
            value={tileArea}
            placeholder={0}
            setValue={null}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Field
            label="Цена за кв. м"
            value={meterPrice}
            placeholder={defaultMeterPrice}
            setValue={setMeterPrice}
            onFocus={setPriceDirValue(RIGHT)}
            required={priceDir === RIGHT}
          />
        </div>
        <div className="column column_fixed column_bottom">
          <Arrow isLeft={priceDir === LEFT} />
        </div>
        <div className="column">
          <Field
            label="Общая цена"
            value={totalPrice}
            placeholder={defaultTotalPrice}
            setValue={setTotalPrice}
            onFocus={setPriceDirValue(LEFT)}
            required={priceDir === LEFT}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Field
            label="Плитки (шт)"
            value={tileCount}
            placeholder={defaultTileCount}
            setValue={setTileCount}
            onFocus={setAreaDirValue(RIGHT)}
            required={areaDir === RIGHT}
          />
        </div>
        <div className="column column_fixed column_bottom">
          <Arrow isLeft={areaDir === LEFT} />
        </div>
        <div className="column">
          <Field
            label="Общая площадь (кв. м)"
            value={totalArea}
            placeholder={defaultTotalArea}
            setValue={setTotalArea}
            onFocus={setAreaDirValue(LEFT)}
            required={areaDir === LEFT}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="column">
          <Field
            label="Плиток в упаковке (шт)"
            value={packTileCount}
            placeholder={defaultPackTileCount}
            setValue={setPackTileCount}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Field
            label="Упаковки (шт)"
            value={packCeil}
            placeholder={defaultPackCeil}
            disabled
          />
        </div>
        <div className="column">
          <Field
            label="Лишние плитки (шт)"
            value={packRemain}
            placeholder={defaultPackRemain}
            disabled
          />
        </div>
      </div>
    </div>
  )
}

export default App
