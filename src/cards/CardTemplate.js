import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './CardTemplate.css';
import 'bootstrap/less/bootstrap.less';

class CardTemplate extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    var card = null;

    if (this.props.card) {
      card = this.props.card;
    } else card = (
      <div>
        <CardHeader title="Without Avatar" subtitle="Subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </div>)
    this.state = {
      card: card,
    }
  }


  render() {
    return (
      <Card className="card">
        {this.state.card}
      </Card>
    );
  }
}

export default CardTemplate;
