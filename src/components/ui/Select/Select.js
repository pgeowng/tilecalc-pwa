import './Select.css'

export const Select = ({ value, setValue, options, label }) => {
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className="select">
      <label className="select-label">{label}</label>
      <select className="select-elem" value={value} onChange={handleChange}>
        {options.map((item, idx) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}
