import React from 'react'
import marked from 'marked'
import _ from 'lodash'
import Actions from '../actions/index'

export default class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.note.title,
            content: props.note.content
        }
    }
    saveNote() {
        Actions.saveNote(_.extend(this.props.note, {
            title: this.state.title,
            content: this.state.content
        }))
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value })
    }

    handleContentChange(event) {
        this.setState({ content: event.target.value })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.note.title,
            content: nextProps.note.content
        })
    }

    render() {
        return (<div className="main__form">
                    <input value={this.state.title} name="title" ref="title" id="title" onBlur={this.saveNote.bind(this)} className="main__form__input-title" onChange={this.handleTitleChange.bind(this)} />
                    <textarea name="content" onBlur={this.saveNote.bind(this)} ref="content" id="content" value={this.state.content} onChange={this.handleContentChange.bind(this)} className="main__form__input-content"></textarea>
                </div>)
    }
}
