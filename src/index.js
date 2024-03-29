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
            payload: response.data.data
        })
    } catch (err) {
        console.log('error in get saga:', err)
    }
}

function* postFavorites(action) {
    try{
        yield axios.post(`/api/favorite`, action.payload)
       
    }catch (err) {
        console.log('error in post saga', err)
    }
}

// TO DO - GET FAVORITES SAGA
function* getFavorites(action) {
    try {
        let response = yield axios.get('/api/favorite')
        console.log('in get favorites saga', response.data)
        yield put ({
            type: 'SET_FAVORITES',
            payload: response.data
        })
    } catch (error) {
        console.log('error in get favorites saga', error);
    }
}

function* getCategorySaga(action) {
    //SAGA FOR GETTING CATEGORIES OF GIFS ON FAVORITES PAGE
    try {
        let response = yield axios.get('/api/category')
        console.log('in get categories saga', response.data)
        yield put ({
            type: 'SET_CATEGORIES',
            payload: response.data
        })
    } catch (error) {
        console.log('error in get categories saga', error);
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
    yield takeEvery('FAVORITE_GIF', postFavorites)
    yield takeEvery('GET_FAVORITES', getFavorites)
    yield takeEvery('GET_CATEGORY', getCategorySaga)
    // yield takeEvery('GET_FAVORITES', getFavorites)
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

const getFavoritesReducer = (state = [], action) => {
    console.log('start gif favorite reducer');
    switch (action.type) {
        case 'SET_FAVORITES':
            return action.payload
        default: 
            return state
    }
}

const getCategoriesReducer = (state = [], action) => {
    console.log('start categories reducer');
    switch (action.type) {
        case 'SET_CATEGORIES':
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
        getFavoritesReducer,
        getCategoriesReducer

    }),
    applyMiddleware(sagaMiddleware, logger)
)



sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
