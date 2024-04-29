import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appSliceReducer  from './slices/app.jsx'

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
})

export { rootPersistConfig, rootReducer }