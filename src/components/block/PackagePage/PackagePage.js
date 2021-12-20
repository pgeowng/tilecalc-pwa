import { useState, useEffect } from 'react'
import { Field } from '../../ui/Field/Field'

const formDecl = (forms) => (num) => {
  const n = num % 10
  if (num < 5 || num > 20) {
    if (n === 1) return forms[0]
    else if (2 <= n && n <= 4) return forms[1]
  }
  return forms[2]
}

const remainDecl = formDecl([
  'лишняя плитка', // singular, nom
  'лишниe плитки', // plural, nom
  'лишних плиток', // plural, gen
])

const packageDecl = formDecl(['упаковка', 'упаковки', 'упаковок'])

export const PackagePage = () => {
  const defaultTileCount = 0
  const [tileCount, setTileCount] = useState(defaultTileCount)

  const defaultPackTileCount = 0
  const [packTileCount, setPackTileCount] = useState(defaultPackTileCount)

  const defaultPackCeil = 0
  const [packCeil, setPackCeil] = useState(defaultPackCeil)

  const defaultPackRemain = 0
  const [packRemain, setPackRemain] = useState(defaultPackRemain)

  const [displayResult, setDisplayResult] = useState('')

  useEffect(() => {
    if (packTileCount !== 0) {
      const ceil = Math.ceil(tileCount / packTileCount)
      const remain = ceil * packTileCount - tileCount
      setPackCeil(ceil)
      setPackRemain(remain)
      const result = `${ceil} ${packageDecl(ceil)}, ${remain} ${remainDecl(
        remain
      )}`
      setDisplayResult(result)
    }
  }, [packTileCount, tileCount])

  return (
    <>
      <div className="row">
        <div className="column">
          <Field
            label="Плитки (шт)"
            value={tileCount}
            placeholder={defaultTileCount}
            setValue={setTileCount}
            required
          />
        </div>
        <div className="column">
          <Field
            label="Плиток в упаковке (шт)"
            value={packTileCount}
            placeholder={defaultPackTileCount}
            setValue={setPackTileCount}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Field
            label="Результат"
            type="text"
            value={displayResult}
            placeholder=""
            disabled
          />
        </div>
      </div>
    </>
  )
}
