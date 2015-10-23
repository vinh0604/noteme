import React from 'react'
import Reflux from 'reflux'
import Sidebar from './Sidebar'
import MainPanel from './MainPanel'
import NotesStore from '../stores/NotesStore'

export default React.createClass({
    mixins: [Reflux.listenTo(NotesStore, 'onNotesChange')],
    getInitialState() {
        return { notes: [] }
    },
    onNotesChange(notes) {
        this.setState({ notes: notes })
    },
    render() {
        return (<div>
                    <Sidebar notes={this.state.notes} />
                    <MainPanel note={this.state.notes[0]}/>
                </div>);
    }
})
