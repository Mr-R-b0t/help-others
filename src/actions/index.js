import {Appwrite} from 'appwrite';
import {Databases, Account} from 'appwrite';
import {Client} from 'appwrite';

const appwrite = new Client();

appwrite
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('639cd795da4ad37458f2') // Your project IDs
;
export const appwriteClient = appwrite;;

