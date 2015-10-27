import Reflux from "reflux"
import _ from 'lodash'
import Fuse from 'fuse.js'
import Actions from "../actions"

function findIndex (notes, note) {
    return _.findIndex(notes, function (n) {
        return n.id === note.id
    })
}

function nextId (notes) {
    let maxId = _.max(notes, 'id')
    if (maxId < 0) maxId = 0
    return maxId + 1
}

function filterNote (notes, keyword, tags) {
    notes = notes.filter(function (note) {
        return !note.archived
    })

    if (tags.length) {
        notes = notes.filter(function (note) {
            return _.intersection(note.tags, tags).length > 0;
        })
    }
    if (keyword) {
        let fuse = new Fuse(notes, { keys: ['title', 'content'] })
        notes = fuse.search(keyword)
    }

    return notes
}

export default Reflux.createStore({
    init() {
        this.notes = []
        this.keyword = ''
        this.filteredTags = []

        this.listenTo(Actions.addNote, this.addNote)
        this.listenTo(Actions.deleteNote, this.deleteNote)
        this.listenTo(Actions.archiveNote, this.archiveNote)
        this.listenTo(Actions.saveNote, this.saveNote)
        this.listenTo(Actions.searchNote, this.searchNote)
    },
    addNote() {
        let newNote = {
            id: nextId(this.notes),
            title: '',
            content: '',
            tags: []
        }
        this.notes.push(newNote)
        this.publish()
    },
    deleteNote(note) {
        let index = findIndex(this.notes, note);
        if (index >= 0) {
            this.notes.splice(index, 1)
            this.publish()
        }
    },
    archiveNote(note) {
        let index = findIndex(this.notes, note);
        if (index >= 0) {
            this.notes[index].archived = true
            this.publish()
        }
    },
    saveNote(note) {
        let index = findIndex(this.notes, note)
        if (index >= 0) {
            this.notes.splice(index, 1, note)
            this.publish()
        }
    },
    searchNote(keyword, filteredTags) {
        this.keyword = keyword
        this.filteredTags = (filteredTags || [])
        this.publish()
    },
    publish() {
        this.trigger(filterNote(this.notes, this.keyword, this.filteredTags))
    }
})
