import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

function* watcherSaga() {
    //takeevery goes here
}

const store = createStore(
    combineReducers({
        //reducers need to be called in here to work
    }),
    applyMiddleware(sagaMiddleware, logger)
)

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
