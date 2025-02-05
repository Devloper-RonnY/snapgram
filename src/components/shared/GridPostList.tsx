import { useUserContext } from "@/context/AuthContext"
import { Models } from "appwrite/types"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"

type GridPostListProps = {
  posts: Models.Document[],
  showUser?: boolean,
  showStats?: boolean
}

const GridPostList = ({posts, showUser = true , showStats = true }: GridPostListProps) => {
  const {user} = useUserContext();

  return (
    <div className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}}`} className="grid-post_link">
          <img src={post.imageUrl} 
          alt="post"
          className="w-full h-full object-cover"
          />
          </Link>

          <div className="grid-post_user">
          {showUser && (
            <div className="flex items-center justify-start gap-2 flex-1">
              <img
              src={post.creater?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="creator"
              className="rounded-full w-8 h-8"
            />
            </div>
          )}
          {showStats && <PostStats  post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </div>
  )
}

export default GridPostList