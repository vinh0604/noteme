import React from 'react'
import ReactDOM from 'react-dom'
import Reflux from 'reflux'
import NoteLine from './NoteLine'
import SelectedNoteStore from '../stores/SelectedNoteStore'
import $ from 'jquery'
import Actions from '../actions'

export default React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState() {
        return {
            selectedNote: {},
            popupStyle: { display: 'none' }
        }
    },
    onSelectedNoteChange(note) {
        this.setState({ selectedNote: note })
    },
    componentDidMount() {
        this.listenTo(SelectedNoteStore, this.onSelectedNoteChange)
    },
    handleTagClick(note, position) {
        let $elem = $(ReactDOM.findDOMNode(this.refs.tagPopup))
        if (this.state.popupStyle.display === 'block' && note.id === this.state.selectedNote.id) {
            this.setState({
                popupStyle: { display: 'none' }
            })
        } else {
            this.setState({
                selectedNote: note,
                popupStyle: {
                    top: position.top + 35 + 'px',
                    display: 'block'
                }
            })
        }
    },
    onTagsChanged(event) {
        this.state.selectedNote.tags = event.target.value
        Actions.updateNote(this.state.selectedNote)
    },
    render() {
        return (<div>
                    <ul>
                        {this.props.notes.map(function (note) {
                            return (<NoteLine key={note.id} note={note} selected={note.id === this.state.selectedNote.id} onTagClick={this.handleTagClick} />);
                        }, this)}
                    </ul>,
                    <div ref="tagPopup" className="sidebar__list__tags" style={this.state.popupStyle}>
                        <select name="tags" id="note_tags" multiple="multiple" data-placeholder="Add some tags..." value={this.state.selectedNote.tags || []} onChange={this.onTagsChanged}>
                            {this.props.tags.map(function (tag) {
                                return (<option key={tag} value={tag}>{tag}</option>)
                            }, this)}
                        </select>
                    </div>
                </div>);
    }
})
