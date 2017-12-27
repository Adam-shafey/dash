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
    this.getTodoItems = this.getTodoItems.bind(this)
  }

  componentDidMount(){
    if(this.props.cardContent){
      this.setState({
        data:this.props.cardContent.data,
        value:this.props.cardContent.value        
      })
    }
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
      this.props.saveContent({data: this.state.data.concat(this.state.value), value: ""}, this.props.cardNumber)      
      this.setState({
        data: this.state.data.concat(this.state.value),
        value: ""
      })
    }
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  getTodoItems(){
    var i = 0;
    return this.state.data.map((el) => {
      i++;
      return(
        <li key={i}> {el} </li>
      )
    })
  }
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
    const getTodoItems = this.getTodoItems();
    return (
      <div>
        <CardHeader title="Todo Card" subtitle="Subtitle" />
        <TextField
          hintText="Hint Text"
          id="text-field-controlled"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        /><br />
        {getTodoItems}
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