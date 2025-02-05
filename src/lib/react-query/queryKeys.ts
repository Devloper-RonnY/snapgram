// export const QUERY_KEYS = {
//     GET_RECENT_POSTS: "getRecentPosts",
//     CREATE_POST: "createPost",
//     USER_ACCOUNT: "userAccount",
//     SIGN_IN: "signIn",
//     SIGN_OUT: "signOut",
    
//   };

  export enum QUERY_KEYS { 
    CREATE_POST= "createPost",
    USER_ACCOUNT= "userAccount",
    SIGN_I= "signIn",
    SIGN_OUT= "signOut",
    // AUTH KEYS
    CREATE_USER_ACCOUNT = "createUserAccount",
  
    // USER KEYS
    GET_CURRENT_USER = "getCurrentUser",
    GET_USERS = "getUsers",
    GET_USER_BY_ID = "getUserById",
  
    // POST KEYS
    GET_POSTS = "getPosts",
    GET_INFINITE_POSTS = "getInfinitePosts",
    GET_RECENT_POSTS = "getRecentPosts",
    GET_POST_BY_ID = "getPostById",
    GET_USER_POSTS = "getUserPosts",
    GET_FILE_PREVIEW = "getFilePreview",
  
    //  SEARCH KEYS
    SEARCH_POSTS = "getSearchPosts",
  }