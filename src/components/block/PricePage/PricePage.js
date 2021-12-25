import { useState, useEffect } from 'react'
import { Field } from '../../ui/Field/Field'
import { Arrow } from '../../ui/Arrow/Arrow'

import { TileArea } from '../../common/TileArea'

import { round, RIGHT, LEFT } from '../../../helpers'

const defaultMeterPrice = 0
const defaultTotalPrice = 0
const defaultTileCount = 0
const defaultTotalArea = 0

export const PricePage = () => {
  const [tileArea, setTileArea] = useState(0)

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
  return (
    <>
      <TileArea onUpdateArea={setTileArea} />
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
    </>
  )
}
