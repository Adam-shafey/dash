import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import 'bootstrap/less/bootstrap.less';


class NotesCard extends React.Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      expanded: false,
      open: false,
      openNoteEditor: false,
      value: '',
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getNotesItems = this.getNotesItems.bind(this)
  }

  componentDidMount() {
    if (this.props.cardContent) {
      this.setState({
        data: this.props.cardContent.data,
        value: this.props.cardContent.value
      })
    }
  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpenNoteEditor = () => {
    this.setState({ openNoteEditor: true });
  };
  handleCloseNoteEditor = () => {
    this.setState({ openNoteEditor: false });
  };
  handleSaveNoteEditor = () => { //NOT COMPLETE YET
    this.setState({ openNoteEditor: false });
  };

  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      this.props.saveContent({ data: this.state.data.concat(this.state.value), value: "" }, this.props.cardNumber)
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
  getNotesItems() {
    var i = 0;
    return this.state.data.map((el) => {
      i++;
      return (
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
    const noteEditorActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseNoteEditor}
      />,
      <FlatButton
        label="Save"
        primary={true}
        disabled={true}
        onClick={this.handleSaveNoteEditor}
      />,
    ];
    // Render JSX
    const getNotesItems = this.getNotesItems();
    return (
      <div>
        <CardHeader title="Notes Card" subtitle="Subtitle" />
        <CardActions>
          <FloatingActionButton mini={true} label="Modal Dialog" onClick={this.handleOpenNoteEditor}>
            <ContentAdd />
          </FloatingActionButton>
          <Dialog
            title="Dialog With Actions"
            actions={noteEditorActions}
            modal={true}
            open={this.state.openNoteEditor}
          >
            Only actions can close this dialog.
        </Dialog>
        </CardActions>
        {getNotesItems}
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

export default NotesCard;