import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const app = firebase.initializeApp();

export const auth = app.auth();
export default app;
