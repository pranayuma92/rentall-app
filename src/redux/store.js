import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2Immutable from '../utils/automergeLevel2-immutable'
import thunk from 'redux-thunk'
import immutableTransform from 'redux-persist-transform-immutable'
import rentReducer from './reducers'

const reducers = {
    rent: rentReducer
}

const persistConfig = {
    transforms: [immutableTransform()],
    key: 'rentall',
    storage,
    stateReconciler: autoMergeLevel2Immutable
    
}

const rootReducer = combineReducers(reducers)
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => 
    createStore(
        persistedReducer,
        applyMiddleware(thunk)
    )