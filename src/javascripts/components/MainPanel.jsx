import React from 'react'
import Reflux from 'reflux'
import NoteView from './NoteView'
import NoteForm from './NoteForm'
import SelectedNoteStore from '../stores/SelectedNoteStore'

export default React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState() {
        return {
            editMode: false,
            note: null
        }
    },
    onSelectedNoteChange(note) {
        let editMode = note && !note.title
        this.setState({ note: note, editMode: editMode })
    },
    componentDidMount() {
        this.listenTo(SelectedNoteStore, this.onSelectedNoteChange)
    },
    toggleEditMode() {
        this.setState({ editMode: true })
    },
    render() {
        var element;
        if (!this.state.note) {
            element = '';
        } else if (this.state.editMode) {
            element = (<NoteForm note={this.state.note} />)
        } else {
            element = (<NoteView note={this.state.note} onEdit={this.toggleEditMode}/>)
        }

        return (<div>{element}</div>);
    }
})
