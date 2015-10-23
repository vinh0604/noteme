import React from 'react'
import Reflux from 'reflux'
import Topbar from './Topbar'
import NoteList from './NoteList'

export default class Sidebar extends React.Component {
    render() {
        return (<div>
                    <Topbar notes={this.props.notes}/>
                    <NoteList notes={this.props.notes}/>
                </div>);
    }
}
