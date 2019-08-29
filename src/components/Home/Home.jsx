import React, {Component} from 'react';
import {connect} from 'react-redux';

class Home extends Component {


    // componentDidMount() {
    //     console.log('HOME IS LOADED');
        
    //     //test route to api and get the giphiessss
    //     this.props.dispatch({
    //         type: 'TESTING'
    //     })
    // }


    //localstate
    state = {
        item: '',
    }

    handleChange = (event) => {
        //this sets the new state with what is typed and keep in local state
        console.log(event.target.value)
        this.setState({
            item: event.target.value
        })
    }

    handleClick = (event) => {
        console.log('handleClick operational')
        //dispatch to reducers
        this.props.dispatch({
            type: 'GET_GIFS',
            payload: this.state.item
        })
        console.log(this.state.item)
        //pushes us to Favorites page
        //this.props.history.push('/favorites')
    }

    render() {
        return(
            <div>
            <h2>Home Component</h2>
            <input onChange={this.handleChange} type='text' placeholder='Search For Your GIF'/>
            <button onClick={this.handleClick}>SUBMIT</button>
            {/* loop through the store (mapStateToProps) and render each item onto the DOM in a div */}
            {this.props.reduxStore.getGifReducer.map(gif => {
                return (
                    <div>
                        {gif}
                    </div>
                )
            })}
            </div>
        )
    }
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};

export default connect(mapStateToProps)(Home);