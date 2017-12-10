import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AddRemoveLayout from './AddRemoveLayout.js';


// Your widget. Just another react component.
// Default styles.

//grid from: https://github.com/strml/react-grid-layout
//cards from React Material UI

class App extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state

    this.state = {

    }
  }

  render() {
    return (
      <MuiThemeProvider className="App">
      <AddRemoveLayout/>
      </MuiThemeProvider>
    );
  }
}

export default App;
