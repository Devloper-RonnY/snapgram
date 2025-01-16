import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
}

console.log(appwriteConfig.projectId);
console.log(appwriteConfig.url);


export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);