import { ID, Query } from "appwrite";
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatar, database, storage } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatar.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.error("❌ Error creating user account:", error);
    return null;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: string;
  username?: string;
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.error("❌ Error saving user to database:", error);
    return null;
  }
}


export async function signInAccount(user: { email: string; password: string }) {
  try {
    try {
      await account.deleteSession("current");
      console.log("🔄 Previous session cleared.");
    } catch (error) {
      console.warn("⚠️ No active session found or failed to clear session.");
    }

    // Create a new session
    const session = await account.createEmailPasswordSession(user.email, user.password);
    
    if (!session) throw new Error("❌ Login failed. Invalid credentials.");

    console.log("✅ User signed in successfully:", session);
    return session;
  } catch (error) {
    console.error("❌ Error signing in:", error);
    return null;
  }
}

export async function getAccount() {
  try {
    const sessions = await account.listSessions();
    if (sessions.sessions.length === 0) {
      console.warn("⚠️ No active session found.");
      return null;
    }

    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error("❌ Error getting account:", error);
    return null;
  }
}


export async function getCurrentUser() {
  try {
    console.log("Fetching current account...");
    const currentAccount = await getAccount();
    if (!currentAccount) {
      console.warn("⚠️ No authenticated user found.");
      return null;
    }

    console.log("Current account:", currentAccount);

    console.log("Querying database for user...");
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    console.log("Database query result:", currentUser);

    if (!currentUser.documents.length) {
      console.warn("⚠️ User not found in database.");
      return null;
    }

    console.log("Authenticated user data:", currentUser.documents[0]);
    return currentUser.documents[0];
  } catch (error) {
    console.error("❌ Error getting current user:", error);
    return null;
  }
}


export async function signOutAccount() {
  try {
    await account.deleteSession("current");
    console.log("✅ User signed out successfully.");
    return true;
  } catch (error) {
    console.error("❌ Error signing out:", error);
    return false;
  }
}

export async function createPost(post: INewPost) {
  try {
    if (!post.creater) throw new Error("Creator (user ID) is required!");

    // Upload file first
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw new Error("File upload failed!");

    // Get file preview URL
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw new Error("Failed to generate file preview!");
    }

    // Convert tags into an array
    const tags = post.tags?.map(tag => tag.trim()) || [];

    // ✅ Ensure `creater` is a valid User Document ID from Appwrite Users collection
    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creater: post.creater, // Must be a valid document ID from Users collection
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw new Error("Failed to create post!");
    }

    return newPost;
  } catch (error) {
    console.error("❌ Error creating post:", error);
    throw error;
  }
}

export async function getRecentPosts() {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId, // Your database ID
      appwriteConfig.postCollectionId, // Your collection ID for posts
      [
        Query.orderDesc("$createdAt"), // Order by creation time, descending
        Query.limit(20) // Limit the results to the 20 most recent posts
      ]
    );
    return posts;
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    throw error;
  }
}

export async function uploadFile(file: File) {
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      )
      return uploadedFile;
    } catch (error) {
      console.error("❌ Error uploading file:", error);
    throw error;
    }
}   

export async function getFilePreview(fileId : string) {
  try {
    const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000);
    return fileUrl;
  } catch (error) {
    console.error("❌ Error previewingFile post:", error);
    throw error;
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return {status : 'OK'}
    
  } catch (error) {
    console.error("❌ Error creating post:", error);
    throw error;
  }
}

export async function likePost(postId: string, likeArray: string[]) {
    try {
      const updatedPost = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId,
        {
          likes: likeArray
        }
      )
      if(!updatedPost) throw Error

      return updatedPost;
    } catch (error) {
      console.error("❌ Error creating post:", error);
      throw error;
    }
}

export async function savePost(postId: string, userId: string) {
  try {
    const updatedPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    if(!updatedPost) throw Error

    return updatedPost;
  } catch (error) {
    console.error("❌ Error creating post:", error);
    throw error;
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId,
    )
    if(!statusCode) throw Error

    return {status :'Ok'};
  } catch (error) {
    console.error("❌ Error creating post:", error);
    throw error;
  }
}

export async function getPostById(postId: string) {
  try{
    const post = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )

    return post;
  } catch (error){
    console.log(error)
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    };

    // If there is a new file to update, upload it and generate a preview
    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw new Error("File upload failed!");
    
      const fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error("Failed to generate file preview!");
      }
      
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Ensure `tags` is always an array of strings (trim each tag if necessary)
    const tags = Array.isArray(post.tags)
      ? post.tags.map(tag => tag.trim()) // If it's an array, trim each tag
      : post.tags?.replace(/ /g, '').split(',').map(tag => tag.trim()) || []; // If it's a string, split by commas

    // Update the post in the database
    const updatedPost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags, // Pass the processed tags as a simple array of strings
      }
    );

    if (!updatedPost) {
      await deleteFile(post.imageId); // Clean up the original file if update fails
      throw new Error("Failed to update post!");
    }

    return updatedPost;
  } catch (error) {
    console.error("❌ Error updating post:", error);
    throw error;
  }
}


export async function deletePost(postId: string, imageId: string) {
  if(!postId || !imageId) throw Error;

  try {
    await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )
  } catch (error) {
    console.log(error);
    
  }
}

export async function getInfinitePosts({pageParam} : {pageParam: number}) {
  const queries: any[] = [Query.orderDesc(`$updatedAt`), Query.limit(10)]

  if(pageParam){
    queries.push(Query.cursorAfter(pageParam.toString()))
  }

  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    )

    if(!posts) throw Error

    return posts;
  } catch (error) {
    console.log(error);
    
  }
}

export async function searchPosts(searchTerm : string) {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search('caption', searchTerm)]
    )

    if(!posts) throw Error

    return posts;
  } catch (error) {
    console.log(error);
    
  }
}