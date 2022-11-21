import { configureStore, combineReducers } from 'redux';
import { setUser } from './actions';

const rootReducer = combineReducers({
    setUser: setUser,
});

const configuredStore = () => {
    return configureStore(rootReducer);
};

export default configuredStore;
