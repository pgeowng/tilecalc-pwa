import { useState, useEffect } from 'react'
import { Field } from '../../ui/Field/Field'
import { Arrow } from '../../ui/Arrow/Arrow'
import { TileArea } from '../../common/TileArea'
import { round, RIGHT, LEFT } from '../../../helpers'

const defaultPackArea = 0
const defaultPackCount = 0
export const AreaPage = () => {
  const [tileArea, setTileArea] = useState(0)
  const [packArea, setPackArea] = useState(defaultPackArea)
  const [packCount, setPackCount] = useState(defaultPackCount)
  const [packDir, setPackDir] = useState(RIGHT)
  const setPackDirValue = (val) => () => setPackDir(val)

  useEffect(() => {
    if (packDir === RIGHT) {
      let result = 0
      if (tileArea !== 0) {
        result = round(packArea / tileArea)
      }

      setPackCount(result)
    } else {
      setPackArea(round(tileArea * packCount))
    }
  }, [packArea, tileArea, packCount, packDir])

  return (
    <>
      <TileArea onUpdateArea={setTileArea} />
      <div className="row">
        <div className="column">
          <Field
            label="В упаковке (кв. м)"
            value={packArea}
            placeholder={defaultPackArea}
            setValue={setPackArea}
            onFocus={setPackDirValue(RIGHT)}
            required={packDir === RIGHT}
          />
        </div>
        <div className="column column_fixed column_bottom">
          <Arrow isLeft={packDir === LEFT} />
        </div>
        <div className="column">
          <Field
            label="В упаковке (шт)"
            value={packCount}
            placeholder={defaultPackCount}
            setValue={setPackCount}
            onFocus={setPackDirValue(LEFT)}
            required={packDir === LEFT}
          />
        </div>
      </div>
    </>
  )
}
