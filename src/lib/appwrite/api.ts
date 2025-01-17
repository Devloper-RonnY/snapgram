import { Databases, ID } from "appwrite"
import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, database } from "./config";


export async function createUserAccount(user: INewUser) {
    try {
       const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name,
     );
      
     if(!newAccount) throw Error;

     const avatarUrl = avatar.getInitials(user.name)

     // user save to database
     const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl,
     })
     return newUser;

    } catch (error) {
        console.log(error)
        return error
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageUrl: string,
    username: string
}) {
    try {
      const newUser = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user,
      )
      return newUser
    } catch (error) {
       console.log(error);
        
    }
}