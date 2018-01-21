import React, { Component } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import { Card, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CardTemplate from './cards/CardTemplate.js';
import TodoCard from './cards/Todo/TodoCard.js';
import NotesCard from './cards/Notes/NotesCard.js';
import 'bootstrap/less/bootstrap.less';
import ReactGridLayout from 'react-grid-layout';
import Header from './template/header.js'


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
                return { i: i.toString(), x: i * 2, y: 0, w: 1, h: 1, static: true, add: i === (list.length - 1).toString(), cardType: 0, cardContent: { data: [], value: "" } };
            }),
            newCounter: 5,
            editing: false
        };
        this.getCardContent = this.getCardContent.bind(this);
        this.saveCardContent = this.saveCardContent.bind(this);
        this.onTitleClick = this.onTitleClick.bind(this);
        this.getModifiedLayouts = this.getModifiedLayouts.bind(this);
        this.createElements = this.createElements.bind(this);
        this.handleEditing = this.handleEditing.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this)
    }

    getCardContent(cardId) {
        console.log(this.state.items[cardId].cardContent)
        return this.state.items[cardId].cardContent
    }
    saveCardContent(cardContent, cardId) {
        console.log(cardContent)
        var tempItems = this.state.items;
        tempItems[cardId].cardContent = cardContent;
        this.setState({
            items: tempItems
        })
    }
    createElements() {
        const removeStyle = {
            position: 'absolute',
            right: '20px',
            top: 0,
            cursor: 'pointer',
        };
        return this.state.items.map((el) => {
            el.static = !this.state.editing;
            const i = el.add ? '+' : el.i;
            const cards = [(<CardTemplate card={<NotesCard cardNumber={el.i} saveContent={this.saveCardContent} cardContent={this.getCardContent(el.i)} />} />)];
            return (
                <div key={i}>
                    {el.add ?
                        <span className="add text" onClick={this.onAddItem} title="You can add an item by clicking here, too.">Add +</span>
                        : <span className="text">{i}</span>}
                    {cards[el.cardType]}
                    <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>x</span>
                </div>
            )
        })

    }

    onAddItem(/*cardType*/) {
        var cardType = 0;
        /*eslint no-console: 0*/
        if (this.state.editing) {
            console.log('adding', this.state.newCounter);
            this.setState({
                // Add a new item. It must have a unique key!
                items: this.state.items.concat({
                    i: this.state.newCounter,
                    x: this.state.items.length * 2 % (this.state.cols || 12),
                    y: Infinity, // puts it at the bottom
                    w: 1,
                    h: 1,
                    static: false,
                    cardType: cardType
                }),
                // Increment the counter to ensure key is always unique.
                newCounter: this.state.newCounter + 1
            });
        }
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange(layout) {
        for (var key in layout) {
            if (layout.hasOwnProperty(key)) {
                layout[key].cardType = this.state.items[key].cardType
                layout[key].cardContent = this.state.items[key].cardContent
                
            }
        }
        this.setState({ items: layout });
    }

    onRemoveItem(i) {
        console.log('removing', i);
        this.setState({ items: _.reject(this.state.items, { i: i }) });
    }

    handleEditing() {
        var tempArr = this.state.items.slice();
        console.log(tempArr)
        for (var key in tempArr) {
            if (tempArr.hasOwnProperty(key)) {
                tempArr[key].static = !tempArr[key].static;
            }
        }
        this.setState({
            editing: !this.state.editing,
            items: tempArr
        }, console.log(this.state.items)
        )
    }
    getModifiedLayouts() {
        const { items } = this.state;

        const newLayouts = items.map(item => {
            const newLayout = { ...item };
            return newLayout;
        });

        return newLayouts;
    }
    onTitleClick() {

    }
    render() {
        const modifiedLayouts = this.getModifiedLayouts();
        const children = this.createElements();
        return (
            <div>
                <Header onTitleClick={this.onTitleClick} iconElementRight={<div><FlatButton onClick={this.onAddItem} label="ADD" /><FlatButton onClick={this.handleEditing} label={this.state.editing ? "Save" : "Edit"} /></div>} />
                <ReactGridLayout onLayoutChange={this.onLayoutChange} layout={modifiedLayouts}
                    {...this.props}
                    cols={4} rowHeight={300} width={1440}>
                    {children}
                </ReactGridLayout>
            </div>
        );
    }
}

export default AddRemoveLayout;

