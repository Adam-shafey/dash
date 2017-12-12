import React, { Component } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import { Card, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import CardTemplate from './cards/CardTemplate.js';
import TodoCard from './cards/Todo/TodoCard.js';
import 'bootstrap/less/bootstrap.less';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
class AddRemoveLayout extends Component {
    static defaultProps = {
        className: "layout",
        cols: { lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 },
        rowHeight: 300,
        // compactType: 'horizontal'    
    };

    constructor(props) {
        super(props);

        this.state = {
            layout: [],
            items: [0, 1, 2, 3, 4].map(function (i, key, list) {
                return { i: i.toString(), x: i * 2, y: 0, w: 1, h: 1, add: i === (list.length - 1).toString() };
            }),
            newCounter: 0
        };

        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this)
    }

    createElement(el, cardType) {
        const removeStyle = {
            position: 'absolute',
            right: '20px',
            top: 0,
            cursor: 'pointer',
        };
        const i = el.add ? '+' : el.i;
        const cards = [(<CardTemplate card={<TodoCard/>} />)];
        return (
            <div key={i} data-grid={el}>
                {el.add ?
                    <span className="add text" onClick={this.onAddItem} title="You can add an item by clicking here, too.">Add +</span>
                    : <span className="text">{i}</span>}
                {cards[cardType]}
                <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>x</span>
            </div>
        );
    }

    onAddItem() {
        /*eslint no-console: 0*/
        console.log('adding', 'n' + this.state.newCounter);
        this.setState({
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: 'n' + this.state.newCounter,
                x: this.state.items.length * 2 % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 1,
                h: 1
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange(layout) {
        this.setState({ layout: layout });
    }

    onRemoveItem(i) {
        console.log('removing', i);
        this.setState({ items: _.reject(this.state.items, { i: i }) });
    }

    render() {
        return (
            <div>
                <button onClick={this.onAddItem}>Add Item</button>
                <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange.bind(this)} onBreakpointChange={this.onBreakpointChange}
                    {...this.props}>
                    {_.map(this.state.items, (el) => this.createElement(el, 0))}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

export default AddRemoveLayout;

