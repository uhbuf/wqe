import './App.css';
import Text from './main/Text';
import Search from './main/Search';
import Navigator from './main/Navigator';
import React from 'react';
class App extends React.Component{
    state={
        word:"I Like play"
    };
    changeState=(value)=>{
        this.setState({word:value});
        document.getElementById("search").value=value;
    }
    render(){
        return(
            <div>
                <Navigator smenaSlova={this.changeState}/>
                <Search smenaSlova={this.changeState}/>
                <Text word={this.state.word}/>
            </div>
        );
    }
}
export default App;