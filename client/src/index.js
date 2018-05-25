import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import authReducer from "./store/reducers/authReducer";
import uploadReducer from "./store/reducers/uploadReducer";
import errorReducer from "./store/reducers/errorReducer";
import loadingReducer from "./store/reducers/loadingReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	upload: uploadReducer,
	errors: errorReducer,
	loading: loadingReducer
});

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);
const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
