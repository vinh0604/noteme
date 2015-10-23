import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import App from '../../../src/javascripts/components/App'
import NotesStore from '../../../src/javascripts/stores/NotesStore'

describe('app', () => {
    var app, renderedDOM;

    beforeEach(function () {
        app = TestUtils.renderIntoDocument(<App />)
        renderedDOM = () => ReactDOM.findDOMNode(app)
    })

    it('render list of notes', function () {
        let rootElem = renderedDOM()
        expect(rootElem.querySelectorAll('li.sidebar__item').length).toEqual(0)

        var notes = [{ id: 1, title: 'Note 1', content: 'Note **content** 1' }]
        NotesStore.trigger(notes)
        expect(rootElem.querySelectorAll('li.sidebar__item').length).toEqual(1)
    })

    it('render the first note content into main panel', function () {
        let rootElem = renderedDOM()
        var notes = [
            { id: 1, title: 'Note 1', content: 'Note **content** 1' },

            { id: 2, title: 'Note 2', content: 'Note **content** 2' },
        ]
        NotesStore.trigger(notes)
        expect(rootElem.innerHTML).toContain('Note <strong>content</strong> 1')
    })
})
