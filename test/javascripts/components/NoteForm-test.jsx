import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import Actions from '../../../src/javascripts/actions/index'
import NoteForm from '../../../src/javascripts/components/NoteForm'

describe('noteForm', function () {
    let note, noteForm, renderedDOM;

    beforeEach(function () {
        note = { title: 'Note 1', content: 'Note **content** 1' }

        noteForm = TestUtils.renderIntoDocument(<NoteForm note={note} />)
        renderedDOM = () => ReactDOM.findDOMNode(noteForm)
    })

    it('renders title into text input', function () {
        let rootElem = renderedDOM()
        let titleElem = rootElem.querySelector('input[name="title"]')
        expect(titleElem.value).toEqual('Note 1')
    })

    it('renders content into textarea', function () {
        let rootElem = renderedDOM()
        let contentElem = rootElem.querySelector('textarea[name="content"]')
        expect(contentElem.value).toEqual('Note **content** 1')
    })

    it('dispatches saveNote action when title is blur', function () {
        spyOn(Actions, 'saveNote')
        let rootElem = renderedDOM()
        let titleElem = rootElem.querySelector('input[name="title"]')
        TestUtils.Simulate.change(titleElem, { target: { value: "Note 123" } })
        TestUtils.Simulate.blur(titleElem)
        expect(Actions.saveNote).toHaveBeenCalledWith({
            title: 'Note 123',
            content: 'Note **content** 1'
        })
    })

    it('dispatches saveNote action when content is blur', function () {
        spyOn(Actions, 'saveNote')
        let rootElem = renderedDOM()
        let contentElem = rootElem.querySelector('textarea[name="content"]')
        TestUtils.Simulate.change(contentElem, { target: { value: "Note **content** 123" } })
        TestUtils.Simulate.blur(contentElem)
        expect(Actions.saveNote).toHaveBeenCalledWith({
            title: 'Note 1',
            content: 'Note **content** 123'
        })
    })
})
