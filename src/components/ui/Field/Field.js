import './Field.css'
import iconX from '../../icons/x.svg'
import { useState } from 'react'
export const Field = ({
  value,
  setValue,
  label,
  placeholder = 0,
  disabled = false,
  error = null,
  required = false,
}) => {
  const [isInputError, setInputError] = useState(false)

  const isValueEmpty = value === placeholder
  const [displayValue, setDisplayValue] = useState(
    isValueEmpty ? '' : String(value)
  )

  const isButtonHidden = displayValue.length < 1
  const isBorderError = isInputError || (required && isValueEmpty)
  const isErrorMsgHidden = error == null

  const handleChange = (e) => {
    const val = e.target.value
    setDisplayValue(val)

    if (e.target.value === '') {
      setInputError(false)
      setValue(placeholder)
      return
    }

    const parsed = parseFloat(val)
    if (isNaN(parsed)) {
      setInputError(true)
      setValue(placeholder)
    } else {
      setInputError(false)
      setValue(parsed)
    }
  }

  const handleClear = () => {
    setDisplayValue('')
    setValue(placeholder)
  }

  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div className="field-input-group">
        <input
          className={`field-input ${isBorderError ? 'field-input_error' : ''}`}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          value={displayValue}
          onChange={handleChange}
        />
        <button
          className={`field-clear-button ${
            isButtonHidden ? ' field-clear-button_hidden' : ''
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
