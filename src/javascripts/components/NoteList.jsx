import React from 'react'
import ReactDOM from 'react-dom'
import Reflux from 'reflux'
import NoteLine from './NoteLine'
import SelectedNoteStore from '../stores/SelectedNoteStore'
import $ from 'jquery'

export default React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState() {
        return {
            selectedNote: {},
            tags: this.props.tags || [],
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
    render() {
        return (<div>
                    <ul>
                        {this.props.notes.map(function (note) {
                            return (<NoteLine key={note.id} note={note} selected={note.id === this.state.selectedNote.id} onTagClick={this.handleTagClick} />);
                        }, this)}
                    </ul>,
                    <div ref="tagPopup" className="sidebar__list__tags" style={this.state.popupStyle}>
                        <select name="tags" id="note_tags" multiple="multiple" data-placeholder="Add some tags...">
                            {this.state.tags.map(function (tag) {
                                return (<option value={tag}>{tag}</option>)
                            }, this)}
                        </select>
                    </div>
                </div>);
    }
})
