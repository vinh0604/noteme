import React from 'react'
import Topbar from './Topbar'
import NoteList from './NoteList'

export default class Sidebar extends React.Component {
    render() {
        return (<div>
                    <Topbar />
                    <NoteList />
                </div>);
    }
}
