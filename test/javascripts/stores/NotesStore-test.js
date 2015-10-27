import NotesStore from '../../../src/javascripts/stores/NotesStore'

describe('NotesStore', function () {
    var notes;

    beforeEach(function () {
        notes = [
            { id: 1, title: 'Note 1', content: 'Note 1' },
            { id: 2, title: 'Note 2', content: 'Note 2' }
        ]

        NotesStore.keyword = ''
        NotesStore.filteredTags = []
        spyOn(NotesStore, 'trigger')
    })

    describe('addNote', function () {
        it('creates new note with ascending id', function () {
            expect(NotesStore.notes.length).toEqual(0)
            NotesStore.addNote()
            expect(NotesStore.notes.length).toEqual(1)
            expect(NotesStore.notes[0].id).toEqual(1)
        })

        it('publish new note', function () {
            NotesStore.addNote()
            expect(NotesStore.trigger).toHaveBeenCalledWith(NotesStore.notes)
        })
    })

    describe('deleteNote', function () {
        it('removes note', function () {
            NotesStore.notes = notes
            NotesStore.deleteNote(notes[0])
            expect(NotesStore.notes).toEqual([{ id: 2, title: 'Note 2', content: 'Note 2' }])
        })

        it('does not publish deleted note', function () {
            NotesStore.notes = notes
            NotesStore.deleteNote(notes[0])
            expect(NotesStore.trigger).toHaveBeenCalledWith([{ id: 2, title: 'Note 2', content: 'Note 2' }])
        })
    })

    describe('archiveNote', function () {
        it('sets note archived to true', function () {
            NotesStore.notes = notes
            NotesStore.archiveNote(notes[0])
            expect(NotesStore.notes[0].archived).toEqual(true)
        })

        it('does not publish archived note', function () {
            NotesStore.notes = notes
            NotesStore.archiveNote(notes[0])
            expect(NotesStore.trigger).toHaveBeenCalledWith([{ id: 2, title: 'Note 2', content: 'Note 2' }])
        })
    })

    describe('saveNote', function () {
        it('saves note', function () {
            NotesStore.notes = notes
            let note = { id: 2, title: 'Note 2 updated', content: 'Note 2 content updated' }
            NotesStore.saveNote(note)
            expect(NotesStore.notes[1]).toEqual(note)
        })

        it('publish updated note', function () {
            NotesStore.notes = [notes[1]]
            let note = { id: 2, title: 'Note 2 updated', content: 'Note 2 content updated' }
            NotesStore.saveNote(note)
            expect(NotesStore.trigger).toHaveBeenCalledWith([note])
        })
    })

    describe('searchNote', function () {
        it('sets keyword and filter tags', function () {
            expect(NotesStore.keyword).toEqual('')
            expect(NotesStore.filteredTags).toEqual([])
            NotesStore.searchNote('note', ['hello', 'world'])
            expect(NotesStore.keyword).toEqual('note')
            expect(NotesStore.filteredTags).toEqual(['hello', 'world'])
        })

        it('publishes only notes have one of filtered tags when filtered tags not empty', function () {
            NotesStore.notes = notes
            NotesStore.notes[0].tags = ['hello']
            NotesStore.searchNote('', ['hello', 'world'])
            expect(NotesStore.trigger).toHaveBeenCalledWith([NotesStore.notes[0]])
        })

        it('publishes all notes when filtered tags empty', function () {
            NotesStore.notes = notes
            NotesStore.searchNote('', [])
            expect(NotesStore.trigger).toHaveBeenCalledWith(NotesStore.notes)
        })

        it('publishes only matching notes when keyword not blank', function () {
            NotesStore.notes = notes
            NotesStore.notes[0].title = 'Lorem ipsum'
            NotesStore.searchNote('lorem ipsum', [])
            expect(NotesStore.trigger).toHaveBeenCalledWith([NotesStore.notes[0]])
        })

        it('publishes all notes when keyword blank', function () {
            NotesStore.notes = notes
            NotesStore.searchNote('', [])
            expect(NotesStore.trigger).toHaveBeenCalledWith(NotesStore.notes)
        })
    })

    describe('publish', function () {
        it('does not publish archived note', function () {
            NotesStore.notes = notes
            NotesStore.notes[0].archived = true
            NotesStore.publish()
            expect(NotesStore.trigger).toHaveBeenCalledWith([{ id: 2, title: 'Note 2', content: 'Note 2' }])
        })

        it('publishes only matching & filtered notes', function () {
            NotesStore.notes = notes
            NotesStore.notes[0].title = 'Lorem ipsum'
            NotesStore.notes[0].tags = ['hello']
            NotesStore.keyword = 'lorem'
            NotesStore.filteredTags = ['hello', 'world']
            NotesStore.publish()
            expect(NotesStore.trigger).toHaveBeenCalledWith([NotesStore.notes[0]])
        })
    })
});
