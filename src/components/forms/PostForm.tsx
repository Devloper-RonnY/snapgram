import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,   
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { ID, Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesandMutations";
import { INewPost } from "@/types";
import { appwriteConfig, storage } from "@/lib/appwrite/config";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();


  const { user } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 🛠️ Handle Form Submission
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === "Update") {
      try {
        const updatedPost = await updatePost({
          ...values,
          postId: post.$id,
          imageId: post.imageId,  // Retaining the current imageId
          imageUrl: post.imageUrl,  // Retaining the current imageUrl
          caption: values.caption || "",
          file: values.file || []  // Passing the file only if there’s one
        });
  
        if (!updatedPost) {
          toast.error("Please try again..!");
          console.log(updatedPost);
          
        }
        toast.success("Post updated successfully!");
        navigate(`/posts/${post.$id}`); 
  
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Failed to update post. Please try again.");
      }
    }
    else {
      // Handle the case for creating a new post (file upload and new post creation)
      let imageId = "";
      let imageUrl = "";
  
      // ✅ Upload image to Appwrite Storage if a file exists
      if (values.file && values.file.length > 0) {
        const file = values.file[0];
      
        // Upload file to Appwrite Storage
        const uploadedFile = await storage.createFile(
          appwriteConfig.storageId,
          ID.unique(),
          file
        );
      
        if (!uploadedFile || !uploadedFile.$id) {
          toast.error("File upload failed. Please try again.");
          return;
        }
      
        imageId = uploadedFile.$id;
        imageUrl = storage.getFilePreview(appwriteConfig.storageId, uploadedFile.$id);
      
        // Check if the generated imageUrl is valid
        if (!imageUrl.startsWith("http")) {
          toast.error("Invalid image URL generated.");
          return;
        }
      }
  
      // ✅ Store necessary fields in the database (without the file)
      const newPostData: INewPost = {
        creater: user?.id || "",
        caption: values.caption || "",
        location: values.location || "",
        tags: values.tags ? values.tags.split(",").map(tag => tag.trim()) : [],
        imageId,  // ✅ Required now
        imageUrl, // ✅ Required now
        file: Array.isArray(values.file) ? values.file : []
      };
  
      console.log("Generated imageUrl:", imageUrl);
      console.log("Length of imageUrl:", imageUrl.length);
  
      // ✅ Create Post in DB
      const newPost = await createPost(newPostData);
  
      if (!newPost) {
        toast.error("Please try again..!");
      } else {
        toast.success("Post created successfully!");
        navigate("/"); // Redirect after successful creation
      }
    }
  }
    

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        
        {/* Caption Field */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload Field */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags Field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="Art, Expression, Learn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">Cancel</Button>
          <Button type="submit" className="shad-button_primary whitespace-nowrap" 
          disabled={isLoadingCreate || isLoadingUpdate}>

            {isLoadingCreate || isLoadingUpdate && "Submitting..." }
            {action} 
            
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
