import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appSliceReducer  from './slices/app.jsx'
import authReducer from "./slices/auth.jsx";
import conversationReducer from "./slices/conversation.jsx";

//slices

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['app'],
}

const rootReducer = combineReducers({
    app: appSliceReducer,
    auth: authReducer,
    conversation: conversationReducer,
})

export { rootPersistConfig, rootReducer }