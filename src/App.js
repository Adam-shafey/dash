import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Body from './Body.js';

// Your widget. Just another react component.
import ReactGridLayout from 'react-grid-layout';
// Default styles.
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

//grid from: https://github.com/strml/react-grid-layout
//cards from React Material UI

class App extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state

    this.state = {  
      cards: [{name: "lol"}, {name: "lolzy"}],      
    };
  }
  render() {
    var layout = [
      {i: 'a', x: 0, y: 0, w: 5, h: 7},
      {i: 'b', x: 0, y: 0, w: 5, h: 5, minW: 2, maxW: 4},
      {i: 'c', x: 0, y: 0, w: 5, h: 5}
    ];
    return (
      <MuiThemeProvider className="App">
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a"><Body cards={this.state.cards} /></div>
        <div key="b">b</div>
        <div key="c">c</div>
      </ReactGridLayout>
      </MuiThemeProvider>
    );
  }
}

export default App;
