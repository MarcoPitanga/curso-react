import './styles.css'

import { useCallback, useEffect, useState } from 'react'

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(6)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = !!searchValue ? allPosts.filter(post => {
    return post.title.toUpperCase().includes(searchValue.toUpperCase())
  }) : posts
  
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts()
    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = (e) => {
    const {value} = e.target
    setSearchValue(value)
  }


  return (
    <section className='container'>

      <div className='search-container'>
        
        <TextInput searchValue={searchValue} handleChange = {handleChange}/>

        {!!searchValue && (
          <h1>search value: {searchValue}</h1>
        )}

      </div>

      {!!filteredPosts.length > 0 ? <Posts posts={filteredPosts}/> : <p>Não existem posts</p>}
      
      <div className='button-container'>
        {!searchValue && (
          <Button disabled={ noMorePosts } text='Ver Mais' onClick={loadMorePosts}/>
        )}
        
      </div>
      <div className='footer'>
        <p className='creator'>Created By: Marco Pitanga</p><p className='friends'>Gays: Lucas Garcia, Stéferson Augusto and Alvaro krawlão</p>
      </div>
    </section>
  )
}