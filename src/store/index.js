import {applyMiddleware, compose, createStore} from 'redux'
import {persistReducer, persistStore} from "redux-persist";
import thunkMiddleware from 'redux-thunk'
import storage from './taroPersist'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'app',
  storage,
  blacklist: ['music.play']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

export default function configStore() {
  const store = createStore(persistedReducer, enhancer)
  const persistor = persistStore(store)
  return {store, persistor}
}
