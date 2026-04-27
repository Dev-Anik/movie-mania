import { Client, Databases } from 'appwrite';

const client = new Client();
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

client
     .setEndpoint('https://sgp.cloud.appwrite.io/v1')
     .setProject(PROJECT_ID);

export const databases = new Databases(client);
export { DATABASE_ID };
export { COLLECTION_ID };       