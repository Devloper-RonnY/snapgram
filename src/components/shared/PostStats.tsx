import { useDeleteSavedPost, useGetcurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesandMutations"
import React, { useEffect, useState } from "react"
import { Models } from "appwrite"
import { checkIsLiked } from "@/lib/utils"
import Loader from "./Loader"

type PostStatsProps = {
    post: Models.Document,
    userId: string
}

const PostStats = ({post, userId}: PostStatsProps) => {
    const likeList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likeList)
    const [isSaved, setIsSaved] = useState(false)


    const {mutate: likePost} = useLikePost();
    const {mutate: savePost, isPending: isSavingPost} = useSavePost();
    const {mutate: deletSavedPost, isPending: isdeletingSaved} = useDeleteSavedPost();

    const {data: currentUser} = useGetcurrentUser();

    const savedPostRecord = currentUser?.save.find
    ((record: Models.Document) => record.post.$id === post.$id)

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    },[currentUser])

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let newLikes = [...likes];
        const hasLiked = newLikes.includes(userId)

        if(hasLiked){
            newLikes = newLikes.filter((id) => id !== userId)
        } else {
            newLikes.push(userId)
        }

        setLikes(newLikes);
        likePost({ PostId: post.$id, likeArray: newLikes});
    } 

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();
       

        if(savedPostRecord) {
            setIsSaved(false)
            deletSavedPost(savedPostRecord.$id)
        } else {
        savePost({postId : post.$id, userId});
        setIsSaved(true);
        }
    } 


  return (
    <div className="flex justify-between items-center z-20 ">
        <div className="flex gap-2 mr-5">
         <img
            src={checkIsLiked(likes, userId)
             ? "/assets/icons/liked.svg" : 
             "/assets/icons/like.svg"}
            alt="like"
            height={20}
            width={20}
            className="cursor-pointer"
            onClick={handleLikePost} 
            />
            <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>

        <div className="flex gap-2 ">
        {isSavingPost || isdeletingSaved ? <Loader /> : <img
            src={isSaved 
                ? "/assets/icons/saved.svg" 
                : "/assets/icons/save.svg"}
            alt="like"
            height={20}
            width={20}
            className="cursor-pointer"
            onClick={handleSavePost}
            />} 
        </div>
    </div>
  )
}

export default PostStats