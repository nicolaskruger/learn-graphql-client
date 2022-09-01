import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import styles from '../styles/Home.module.css'

type Post = {
  id: string,
  text: string
}

const Home: NextPage = () => {

  const [text, setText] = useState("")

  const [posts, setPosts] = useState<Post[]>([])

  const handleSubmit = (event:FormEvent) => {
    event.stopPropagation()
    event.preventDefault()
    const post: Post = {
      id: v4(),
      text
    }
    setPosts([
      post,
      ...posts
    ])
  }

  const deletePost = (id: string) => {
    
    const newPosts = posts.filter(post => post.id != id)

    setPosts(newPosts)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} >
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button>
          enviar
        </button>
      </form>
      <ul>
        {
          posts.map(post => (
            <li key={post.id}>
              {post.text}
              <button onClick={()=>deletePost(post.id)}>
                delete
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home
