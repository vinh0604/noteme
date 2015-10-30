import React from 'react'
import ReactDOM from 'react-dom'
import Utils from '../utils'
import Actions from '../actions/index'
import _ from 'lodash'
import $ from 'jquery'

export default class NoteLine extends React.Component {
    selectNote() {
        Actions.selectNote(this.props.note)
    }

    deleteNote(event) {
        event.preventDefault()
        Actions.deleteNote(this.props.note)
    }

    archiveNote(event) {
        event.preventDefault()
        Actions.archiveNote(this.props.note)
    }

    handleTagClick(event) {
        event.preventDefault()

        let elem = ReactDOM.findDOMNode(this)
        _.isFunction(this.props.onTagClick) &&
            this.props.onTagClick(this.props.note, $(elem).position())
    }

    render() {
        return (<li onClick={this.selectNote.bind(this)} className={this.props.selected ? 'sidebar__item sidebar__item--selected' : 'sidebar__item'}>
                    <h4 className="sidebar__item__title">{this.props.note.title || 'New Note'}</h4>
                    <p>{Utils.truncate(this.props.note.content, 50)}</p>
                    <ul className="sidebar__item__buttons">
                        <li><a href="#" title="Tag" onClick={this.handleTagClick.bind(this)}><i className="fa fa-tag"></i></a></li>
                        <li><a href="#" title="Archive" onClick={this.archiveNote.bind(this)}><i className="fa fa-check"></i></a></li>
                        <li><a href="#" title="Delete" onClick={this.deleteNote.bind(this)}><i className="fa fa-trash"></i></a></li>
                    </ul>
                </li>);
    }
}
