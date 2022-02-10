import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Home } from '.'

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1'
        },
        {
          userId: 1,
          id: 2,
          title: 'title 2',
          body: 'body 2'
        },
        {
          userId: 1,
          id: 3,
          title: 'title 3',
          body: 'body 3'
        },
        {
          userId: 1,
          id: 4,
          title: 'title 4',
          body: 'body 4'
        },
        {
          userId: 1,
          id: 5,
          title: 'title 5',
          body: 'body 5'
        },
        {
          userId: 1,
          id: 6,
          title: 'title 6',
          body: 'body 6'
        },
        {
          userId: 1,
          id: 7,
          title: 'title 7',
          body: 'body 7'
        }
      ])
    )
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'img1.png'
        },
        {
          url: 'img2.png'
        },
        {
          url: 'img3.png'
        },
        {
          url: 'img4.png'
        },
        {
          url: 'img5.png'
        },
        {
          url: 'img6.png'
        },
        {
          url: 'img7.png'
        }
      ])
    )
  })
]

const server = setupServer(...handlers)

describe('<Home />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => {
    server.close()
  })

  it('should render search, posts, and load more', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts')

    expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)
    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img')

    expect(images).toHaveLength(6)

    const button = screen.getByText('Ver Mais')

    expect(button).toBeInTheDocument()
  })

  it('should search for posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts')

    expect.assertions(11)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)

    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'title 7' })).not.toBeInTheDocument()

    userEvent.type(search, 'title 1')
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'title 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'title 7' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'search value: title 1' })).toBeInTheDocument()

    userEvent.clear(search)
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'title 7' })).not.toBeInTheDocument()

    userEvent.type(search, 'post does not exist')
    expect(screen.getByText('Não existem posts')).toBeInTheDocument()
  })

  it('should load more posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts')

    //expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const button = screen.getByText('Ver Mais')

    userEvent.click(button)
    expect(screen.getByRole('heading', { name: 'title 7' })).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})
