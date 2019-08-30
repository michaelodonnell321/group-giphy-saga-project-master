import React, { Component } from 'react';
import { connect } from 'react-redux';

class Favorites extends Component {

    // LOADS ALL THE FAVORITES FROM THE DATABASE
    componentDidMount(){
        //load favorites on mount
        this.getFavorites();
    }

    //TODO - NEED TO GET THE FAVORITES FROM INDEX AND DB
    getFavorites= () => {
        this.props.dispatch({
            type: 'GET_FAVORITES'
        })
        console.log('get favorites baby');
    }

    //DELETE BUTTON
    deleteClick = (event) => {
        console.log('deleteClick operational')
        //dispatch to reducers
        // this.props.dispatch({
            // type: // delete reducer
            // payload: //item ID to delete
        // })
        //pushes us to Collection page
        // this.props.history.push('/home')
    }

    render() {
        return (
            <div>
                <h2>Favorite Component</h2>
                {/* MAP SOMETHING HERE */}
                {/* {JSON.stringify(this.props.reduxStore.getFavoritesReducer)} */}
                {this.props.reduxStore.getFavoritesReducer.map(fav => {
                    return (
                        <div>
                            <img src={fav.url} />
                        </div>
                    )
                })}
            
                <button onClick={this.deleteClick}>SUBMIT</button>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default connect(mapStateToProps)(Favorites);