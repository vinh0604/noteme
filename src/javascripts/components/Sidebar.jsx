import React from 'react'
import Reflux from 'reflux'
import Topbar from './Topbar'
import NoteList from './NoteList'

export default class Sidebar extends React.Component {
    render() {
        return (<div className="sidebar">
                    <Topbar tags={this.props.tags}/>
                    <NoteList notes={this.props.notes} tags={this.props.tags}/>
                </div>);
    }
}
