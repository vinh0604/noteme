import React from 'react'
import Reflux from 'reflux'
import Sidebar from './Sidebar'
import MainPanel from './MainPanel'
import NotesStore from '../stores/NotesStore'
import Actions from '../actions'

export default React.createClass({
    mixins: [Reflux.listenTo(NotesStore, 'onNotesChange')],
    getInitialState() {
        return { notes: [], tags: [] }
    },
    onNotesChange(notes) {
        this.setState({ notes: notes }, function () {
            Actions.selectNote(notes[0])
        })
    },
    render() {
        return (<div>
                    <Sidebar notes={this.state.notes} tags={this.state.tags} />
                    <MainPanel />
                </div>);
    }
})
