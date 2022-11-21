import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import { name as appName } from './app.json';
import configuredStore from './redux/configureStore';

//const store = configuredStore();

//const ReduxApp = () => (
   // <Provider store={store}>
      //  <App />
    //</Provider>
//);


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

//AppRegistry.registerComponent(appName, () => ReduxApp);