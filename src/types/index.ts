export type IContextType = {
  user: IUser;
  isLoading : boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
  };

  export type INewPost = {
    creater: string; // Must be a valid User Document ID
    caption: string;
    location?: string;
    tags?: string[]; // Use an array for tags
    imageId: string; 
    imageUrl: string; 
    file: File[]; // ✅ Add this to handle file uploads
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: string;
  file: File | File[];  // ✅ Accepts both a single file and an array
  location?: string;
  tags?: string;
};

  
  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
  };
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };