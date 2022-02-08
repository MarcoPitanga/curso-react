import './styles.css'

export const PostCard = ({ title, body, url }) => {
  return (
    <div className="post">
      <img src={url} alt={title}></img>
      <div className="post-content">
        <h1> {title} </h1>
        <p> {body} </p>
      </div>
    </div>
  )
}
