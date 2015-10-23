import React from 'react'
import Actions from '../actions/index'

export default class Topbar extends React.Component {
    addNote() {
        Actions.addNote()
    }

    searchNote(event) {
        Actions.searchNote(event.target.value)
    }

    render() {
        return (
            <div className="sidebar__topbar">
                <div className="sidebar__topbar__search-widget">
                    <input type="text" name="keyword" id="keyword" placeholder="Search note..." onChange={this.searchNote.bind(this)}/>
                    <i className="fa fa-search"></i>
                </div>
                <ul className="sidebar__topbar__buttons">
                    <li>
                        <a href="#"><i className="fa fa-tags"></i></a>
                    </li>
                    <li>
                        <a href="#" onClick={this.addNote.bind(this)}><i className="fa fa-plus"></i></a>
                    </li>
                </ul>
            </div>);
    }
}
