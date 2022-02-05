import './styles.css'

import { Component } from 'react'

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/Input'

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts()
  }
  
  loadPosts = async () => {
    const {page, postsPerPage} = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({ posts: postsAndPhotos.slice(page, postsPerPage), allPosts: postsAndPhotos })
  }

  loadMorePosts = () => {
    const {page, postsPerPage, allPosts, posts} = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }

  handleChange = (e) => {
    const {value} = e.target
    this.setState({searchValue: value})
  }

  render() {
    const { posts, postsPerPage, page, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    //Se existir valor na busca, é filtrado todos os post (allPosts) por esse valor na busca (searchValue)
    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toUpperCase().includes(searchValue.toUpperCase())
    }) : posts

    return (
      <section className='container'>

        <div className='search-container'>
          

          <TextInput searchValue={searchValue} handleChange = {this.handleChange}/>

          {!!searchValue && (
            <h1>search value: {searchValue}</h1>
          )}
        </div>

        {!!filteredPosts.length > 0 ? <Posts posts={filteredPosts}/> : <p>Não existem posts</p>}
        
        <div className='button-container'>
          {!searchValue && (
            <Button disabled={ noMorePosts } text='Ver Mais' onClick={this.loadMorePosts}/>
          )}
          
        </div>
      </section>
    );
  }
}