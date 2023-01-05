import {Client} from 'appwrite';

const appwrite = new Client();
appwrite
  .setEndpoint("https://appwrite.le-app.dev/v1") // Your API Endpoint
  .setProject("63b6a0ca89fafa3f0baa"); // Your project IDs
export const appwriteClient = appwrite; 
