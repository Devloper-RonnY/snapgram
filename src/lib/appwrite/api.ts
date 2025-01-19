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
  imageUrl?: string;
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
    const currentAccount = await getAccount();
    if (!currentAccount) {
      console.warn("⚠️ No authenticated user found.");
      return null;
    }

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) {
      console.warn("⚠️ User not found in database.");
      return null;
    }

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
