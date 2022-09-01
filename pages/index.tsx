import { gql, useMutation, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { FormEvent, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      text
    }
  }
`

const CREATE_POST = gql`
  mutation createPost($type: String){
    createPost(text: $type){
      id,
      text
    }
  }
`

const DELETE_POST = gql`
  mutation deletePost($type: String){
  deletePost(id: $type){
    id
    text
  }
}
`


type Post = {
  id: string,
  text: string
}

type Data = {
  posts: Post[]
}

const Home: NextPage = () => {

  const [text, setText] = useState("")

  const [posts, setPosts] = useState<Post[]>([])

  const { loading, error, data } = useQuery<Data>(GET_POSTS)

  const [createPost] = useMutation(CREATE_POST)
  const [delPost] = useMutation(DELETE_POST)

  useEffect(() => {
    
  }, [])

  const handleSubmit = (event:FormEvent) => {
    event.stopPropagation()
    event.preventDefault()
    
    createPost({
      variables: {type: text}, 
      refetchQueries: [GET_POSTS]
    })

  }

  const deletePost = (id: string) => {
    delPost({
      variables: {type: id},
      refetchQueries: [GET_POSTS]
    })
  }

  if(loading) return <div>loading...</div>;

  console.log(error)

  if(error) return <div>error...</div>;

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
          data?.posts.map(post => (
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
