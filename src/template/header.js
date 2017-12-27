import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';



const styles = {
    title: {
        cursor: 'pointer',
    },
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */

class Header extends Component {
    constructor(props) {
        // Pass props to parent class
        super(props);
        // Set initial state

        this.state = {

        }
    }

    render() {
        return (
            <AppBar
                title={<span style={styles.title}>Title</span>}
                onTitleClick={this.props.onTitleClick}
                onRightIconButtonClick={this.props.onRightIconButtonClick}
                iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                iconElementRight={this.props.iconElementRight}
            />
        );
    }
}

export default Header;