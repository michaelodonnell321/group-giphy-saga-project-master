import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

function* getSaga(action) {
    try {
        // GRABS GIFS FROM GIPHY
        let search = action.payload
        let response = yield axios.get(`/api/giphy/${search}`)
        console.log('in get saga:', search);
        console.log('in get saga:', response.data)
        // ANYTHING WITH THE TYPE 'SET_GIFS' COMES HERE AND SENDS TO THE REDUCER
        yield put ({
            type: 'SET_GIFS',
            payload: response.data.data.images.original.url
        })
    } catch (err) {
        console.log('error in get saga:', err)
    }
}


// function* test(action) {
//     try{
//         let response = yield axios.get('/api/giphy')
//         console.log('in test:', response.data)
//     } catch (err) {
//         console.log('in testing error:', err);
        
//     }
// }

function* watcherSaga() {
    //takeevery goes here
    yield takeEvery('GET_GIFS', getSaga)
    //testing yield:
    // yield takeEvery('TESTING', test)
}

const getGifReducer = (state = [], action) => {
    console.log('im a gif reducer');
    switch (action.type) {
        // ANYTHING WITH ACTION TYPE 'SET_GIFS' COME HERE AND RETURNS THE INFO IN AN ARRAY
        case 'SET_GIFS':
            return action.payload
        default:
            return state
    }

}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
        //reducers need to be called in here to work
        getGifReducer,
    }),
    applyMiddleware(sagaMiddleware, logger)
)



sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
