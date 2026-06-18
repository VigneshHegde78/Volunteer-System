// Appwrite client to manage connections across application components
import { Client, Databases, Account } from "appwrite";

const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT! || "")
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID! || "");

export const account = new Account(client);
export const databases = new Databases(client);

export const CONF = {
	databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID! || "",
	collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID! || "",
};
