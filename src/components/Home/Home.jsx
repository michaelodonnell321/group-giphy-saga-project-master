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
        console.log('handleClick operational:', this.state.item)
        //dispatch to reducers
        this.props.dispatch({
            type: 'GET_GIFS',
            payload: this.state.item
        })
        console.log(this.state.item)
        //pushes us to Favorites page
        //this.props.history.push('/favorites')
    }
    //dispatching url of favorites to reducer
    handleFavorite = (url) => {
        console.log('in handleFavorite:', url);
        this.props.dispatch({
            type: 'FAVORITE_GIF',
            payload: url
        })
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
                        <img src={gif.images.downsized.url} />
                        <button onClick={() => this.handleFavorite(gif.images.downsized.url)}>Favorite</button>
                    </div>
                )
            })}

                {/* {JSON.stringify(this.props.reduxStore.getGifReducer)} */}
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