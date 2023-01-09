import {Client} from 'appwrite';

const appwrite = new Client();
appwrite
  .setEndpoint("") // Your API Endpoint
  .setProject(""); // Your project IDs
export const appwriteClient = appwrite; 
