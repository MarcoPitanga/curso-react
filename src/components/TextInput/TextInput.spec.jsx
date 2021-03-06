import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextInput } from '.'

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn()
    render(<TextInput handleChange={fn} searchValue={'test'} />)

    const input = screen.getByPlaceholderText(/Type your search/i)

    expect(input.value).toBe('test')
  })

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn()
    render(<TextInput handleChange={fn} />)

    const input = screen.getByPlaceholderText(/Type your search/i)
    const value = 'test value'

    userEvent.type(input, value)

    expect(input.value).toBe(value)
    expect(fn).toHaveBeenCalledTimes(value.length)
  })
})
