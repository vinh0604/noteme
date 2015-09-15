import React from 'react'
import marked from 'marked'
import Actions from '../actions/index'

var formatContent = (content) => {
    return { __html: marked(content) }
}

export default class NoteView extends React.Component {
    render() {
        return (<div>
                    <h4 onClick={this.props.onEdit}>{this.props.note.title}</h4>
                    <div dangerouslySetInnerHTML={formatContent(this.props.note.content)}></div>
                </div>)
    }
}
