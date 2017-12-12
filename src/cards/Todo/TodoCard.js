import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import 'bootstrap/less/bootstrap.less';

console.clear();

const Title = ({ todoCount }) => {
  return (
    <div>

    </div>
  );
}

const TodoForm = ({ addTodo }) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      addTodo(input.value);
      input.value = '';
    }}>
      <input className="form-control" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};

const Todo = ({ todo, remove }) => {
  // Each Todo
  return (<a href="#" className="list-group-item" onClick={() => { remove(todo.id) }}>{todo.text}</a>);
}

const TodoList = ({ todos, remove }) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  });
  return (<div className="list-group" style={{ marginTop: '30px' }}>{todoNode}</div>);
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoCard extends React.Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      expanded: false,
      open: false,
    }
    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  // Lifecycle method
  componentDidMount() {
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({ data: res.data });
      });
  }
  // Add todo handler
  addTodo(val) {
    // Assemble data
    const todo = { text: val }
    // Update data
    axios.post(this.apiUrl, todo)
      .then((res) => {
        this.state.data.push(res.data);
        this.setState({ data: this.state.data });
      });
  }
  // Handle remove
  handleRemove(id) {
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if (todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl + '/' + id)
      .then((res) => {
        this.setState({ data: remainder });
      })
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
        <Title todoCount={this.state.data.length} />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
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