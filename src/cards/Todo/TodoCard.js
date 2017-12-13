import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import 'bootstrap/less/bootstrap.less';


class TodoCard extends React.Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      expanded: false,
      open: false,
      value: '',      
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }



  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleKeyPress = (event) =>{
    if(event.key == 'Enter'){
      this.setState({
        data: this.state.data.concat(this.state.value)
      })
      this.state.value = "";
    }
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];
    // Render JSX
    return (
      <div>
        <CardHeader title="Without Avatar" subtitle="Subtitle" />
        <TextField
          hintText="Hint Text"
          id="text-field-controlled"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        /><br />
        <CardActions>
          <RaisedButton label="Modal Dialog" onClick={this.handleOpen} />
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            Only actions can close this dialog.
        </Dialog>
        </CardActions>
      </div>
    );
  }
}

export default TodoCard;