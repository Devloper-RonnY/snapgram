import { ID, Query } from "appwrite";
import { INewUser } from "@/types";
import { account, appwriteConfig, avatar, database } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl = avatar.getInitials(user.name);

    // Save user to database
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user account:", error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: string;
  username: string;
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
    console.error("Error saving user to DB:", error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    console.log("User signed in successfully:", session);
    return session;
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

export async function getCurrentAccount() {
  try {
    // ✅ Check if an active session exists before calling `account.get()`
    const session = await account.getSession('current');
    console.log("Appwrite Session:", session);

    const currentAccount = await account.get();
    console.log("Current Account:", currentAccount);

    if (!currentAccount) throw new Error("No active session found");

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) {
      throw new Error("User not found in database");
    }

    return currentUser.documents[0];
  } catch (error: any) {
    console.error("Error getting current account:", error);

    if (error.code === 401) {
      console.log("User is not authenticated. Redirecting to sign-in.");
      return null;
    }

    return null;
  }
}

