import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/lib/react-query/queriesandMutations'
import { multiFormatDateString } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom'

const PostDetails = () => {
  const {id} = useParams();
  const {data : post, isPending} = useGetPostById(id || '')
  const {user} = useUserContext()

  const handleDeletePost = () => {

  }

  return (
    <div className='post_details-container w-full'>
      {isPending ? <Loader /> : (
        <div className='post_details-info w-full'>
          <img 
          src={post?.imageUrl}
          alt='post'
          className='post_details-img'
          />

          <div className='flex-between w-full flex-col gap-3'>
         <div className="flex items-center gap-3 w-full">
          <Link to={`/profile/${post.creater?.id || "#"}`} className='flex items-center gap-3'>
            <img
              src={post.creater?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creater?.name }
            </p>
            <div className="flex-center gap-2 text-light-3">
            <p className="subtle-semibold lg:small-reguglar">{multiFormatDateString(post.$createdAt)}</p> - 
            <p className="subtle-semibold lg:small-regular">{post.location}</p>
            </div>
          </div>
          </Link>

          <div className='flex-center'>
            <Link to={`/update-post/${post.$id}`} >
            <img 
            src='/assets/icons/edit.svg'
            width={24}
            height={24}
            alt='edit'
            />
            </Link>

            <Button
            onClick={handleDeletePost}
            variant='ghost'
            className='ghost_details-delete_btn'
            >
            <img 
            src='/assets/icons/delete.svg'
            alt='delete'
            width={24}
            height={24}
            />
            </Button>
          </div>
         </div>

         <hr className='border w-full border-dark-4/80'/>

         <div className="flex flex-col flex-1 w-full sm:font-medium ig:base-regular">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">#{tag}</li>
            ))}
          </ul>
        </div>

        <div className='w-full'>
          <PostStats post={post} userId={user.id}/>
        </div>

        </div>
        </div>
         )}
     </div>
  )
}

export default PostDetails