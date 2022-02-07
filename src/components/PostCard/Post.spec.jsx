import { render, screen } from "@testing-library/react"
import { PostCard } from "."
import { postCardPropsMock } from "./mock"

const props = postCardPropsMock

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props}/>)

    expect(screen.getByRole('img', { name: props.title})).toHaveAttribute('src', props.url)
    expect(screen.getByRole('heading', {name: props.title}))
    expect(screen.getByText(props.body)).toBeInTheDocument()
  })
})