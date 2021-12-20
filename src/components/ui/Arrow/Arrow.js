import './Arrow.css'
import iconArrowRight from '../../icons/arrow-right.svg'

export const Arrow = ({ isLeft }) => {
  return (
    <img
      className={`arrow ${isLeft ? 'arrow_left' : ''}`}
      src={iconArrowRight}
      alt={isLeft ? 'to left' : 'to right'}
    />
  )
}
