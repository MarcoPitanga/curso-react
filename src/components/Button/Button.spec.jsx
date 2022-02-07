import { fireEvent, render, screen } from "@testing-library/react"
import { Button } from "."

describe('<Button />', () => {
  it('should render the button with the text "Ver Mais"', () => {
    render(<Button text='Ver Mais' />)

    expect.assertions(1)

    const button = screen.getByRole('button', { name: /Ver Mais/i})
    expect(button).toBeInTheDocument()
  })

  it('should call function on button click', () => {
    const fn = jest.fn()
    render(<Button text='Ver Mais' onClick={fn}/>)
    
    fireEvent.click(screen.getByRole('button', { name: /Ver Mais/i}))

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled is true', () => {
    render(<Button text='Ver Mais' disabled={true}/>)
    
    expect(screen.getByRole('button', { name: /Ver Mais/i})).toBeDisabled()
  })

  it('should be enabled when disabled is false', () => {
    render(<Button text='Ver Mais' disabled={false}/>)
    
    expect(screen.getByRole('button', { name: /Ver Mais/i})).toBeEnabled()
  })
})