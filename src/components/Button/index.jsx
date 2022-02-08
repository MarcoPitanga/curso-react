import './styles.css'

export const Button = ({ text, disabled, onClick }) => {
  return (
    <button disabled={disabled} className="button" onClick={onClick}>
      {text}
    </button>
  )
}
