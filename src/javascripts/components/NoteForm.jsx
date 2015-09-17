import React from 'react'
import marked from 'marked'

export default class NoteForm extends React.Component {
    render() {
        return (<div>
                    <input value={this.props.note.title} name="title" id="title" />
                    <textarea name="content" id="content" value={this.props.note.content}></textarea>
                </div>)
    }
}
