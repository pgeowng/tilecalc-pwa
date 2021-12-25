import { useCallback, useState, useEffect } from 'react'
import { Field } from '../ui/Field/Field'
import { Select } from '../ui/Select/Select'
import { round } from '../../helpers'

const unitMap = ['м', 'см', 'мм']
const unitExp = { м: 1000, см: 10, мм: 1 }

export const TileArea = ({
  defaultWidth = 0,
  defaultLength = 0,
  onUpdateArea = () => {},
}) => {
  const [width, setWidth] = useState(defaultWidth)
  const [length, setLength] = useState(defaultLength)
  const [units, setUnits] = useState(unitMap[1])

  const updateUnits = useCallback(
    (newUnits) => {
      const oldExp = unitExp[units]
      const newExp = unitExp[newUnits]
      setWidth((width * oldExp) / newExp)
      setLength((length * oldExp) / newExp)
      setUnits(newUnits)
    },
    [width, length, units]
  )

  const [tileArea, setTileArea] = useState(0)

  useEffect(() => {
    const trueWidth = width * unitExp[units]
    const trueLength = length * unitExp[units]
    const result = round(trueWidth * trueLength * 1e-6)
    setTileArea(result)
    onUpdateArea(result)
  }, [width, length, units, onUpdateArea])

  return (
    <>
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
    </>
  )
}
