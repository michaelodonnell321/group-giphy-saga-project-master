import React, { Component } from 'react';
import { connect } from 'react-redux';

class Favorites extends Component {

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