import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appSliceReducer  from './slices/app.jsx'
import authReducer from "./slices/auth.jsx";

//slices

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    // whiteList: [],
    // blackList: [],
}

const rootReducer = combineReducers({
    app: appSliceReducer,
    auth: authReducer
})

export { rootPersistConfig, rootReducer }