import React from 'react'
import NoteView from './NoteView'
import NoteForm from './NoteForm'

export default class MainPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editMode: false }
    }
    toggleEditMode() {
        this.setState({ editMode: true })
    }
    render() {
        var element;
        if (this.state.editMode) {
            element = (<NoteForm note={this.props.note} />)
        } else {
            element = (<NoteView note={this.props.note} onEdit={this.toggleEditMode.bind(this)}/>)
        }

        return (<div>{element}</div>);
    }
}
