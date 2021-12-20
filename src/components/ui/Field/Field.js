import './Field.css'
import iconX from '../../icons/x.svg'
import { useEffect, useState } from 'react'
export const Field = ({
  value,
  setValue = null,
  label,
  placeholder = 0,
  disabled = false,
  error = null,
  required = false,
  type = 'number',
  onFocus = () => {},
}) => {
  const [isInputError, setInputError] = useState(false)

  const isValueEmpty = value === placeholder
  const [displayValue, setDisplayValue] = useState(
    isValueEmpty ? '' : String(value)
  )

  const isButtonHidden = displayValue.length < 1
  const isBorderError = isInputError || (required && isValueEmpty)
  const isErrorMsgHidden = error == null

  useEffect(() => {
    if (value !== placeholder) setDisplayValue(value)
    else setDisplayValue('')
  }, [value, placeholder])

  const handleChange = (e) => {
    const val = e.target.value
    setDisplayValue(val)

    if (e.target.value === '') {
      setInputError(false)
      setValue(placeholder)
      return
    }

    const parsed = parseFloat(val)
    if (parseFloat(val) === value) {
      return
    }
    if (isNaN(parsed)) {
      setInputError(true)
      setValue(placeholder)
    } else {
      setInputError(false)
      setValue(parsed)
      if (parsed !== 0 && val[0] === '0')
        setDisplayValue(val.replace(/^0+(?=(0\.|\d))/, '')) // remove leading zeros 0004 and 004.2
    }
  }

  const handleClear = () => {
    onFocus()
    setDisplayValue('')
    setValue(placeholder)
  }

  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div className="field-input-group">
        <input
          className={`field-input ${isBorderError ? 'field-input_error' : ''}`}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={displayValue}
          onChange={handleChange}
          onFocus={onFocus}
        />
        <button
          className={`field-clear-button ${
            isButtonHidden || disabled ? ' field-clear-button_hidden' : ''
          }`}
          type="button"
          onClick={handleClear}
        >
          <img className="field-clear-icon" src={iconX} alt="clear" />
        </button>
      </div>
      <label
        className={`field-error${
          isErrorMsgHidden ? ' field-error_hidden' : ''
        }`}
      >
        {error}
      </label>
    </div>
  )
}
