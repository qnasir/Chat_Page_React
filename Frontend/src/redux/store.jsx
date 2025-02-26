import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { rootPersistConfig, rootReducer, restoreState } from './rootReducer'



const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
})

const persistor = persistStore(store);

persistor.subscribe(() => {
    const state = store.getState(); // Get the current state
    if (state._persist && state._persist.rehydrated) {
        store.dispatch(restoreState());
    }
});

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch }
