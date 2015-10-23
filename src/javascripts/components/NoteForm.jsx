import React from 'react'
import marked from 'marked'
import _ from 'lodash'
import Actions from '../actions/index'

export default class NoteForm extends React.Component {
    saveNote() {
        Actions.saveNote(_.extend(this.props.note, {
            title: this.refs.title.value,
            content: this.refs.content.value
        }))
    }

    render() {
        return (<div>
                    <input defaultValue={this.props.note.title} name="title" ref="title" id="title" onBlur={this.saveNote.bind(this)} />
                    <textarea name="content" onBlur={this.saveNote.bind(this)} ref="content" id="content" defaultValue={this.props.note.content}></textarea>
                </div>)
    }
}
