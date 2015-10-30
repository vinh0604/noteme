import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import MainPanel from '../../../src/javascripts/components/MainPanel'
import SelectedNoteStore from '../../../src/javascripts/stores/SelectedNoteStore'
import $ from 'jquery'
window.jQuery = $
require('jasmine-jquery/lib/jasmine-jquery')

describe('mainPanel', () => {
    var note = { title: 'Note 1', content: 'Note **content** 1' }
    var mainPanel, renderedDOM, renderer;

    beforeEach(() => {
        mainPanel = TestUtils.renderIntoDocument(<MainPanel />)
        mainPanel.setState({ note: note })
        renderedDOM = () => ReactDOM.findDOMNode(mainPanel)
    })

    it('renders note view by default', () => {
        let rootElem = renderedDOM()
        expect(rootElem.querySelector('h4').innerText).toEqual('Note 1')
    })

    it('renders note form when user click on note view title', () => {
        let rootElem = renderedDOM()
        TestUtils.Simulate.click(rootElem.querySelector('h4'))

        let titleElem = rootElem.querySelector('input[name="title"]')
        let contentElem = rootElem.querySelector('textarea[name="content"]')
        expect(titleElem).toExist()
        expect(contentElem).toExist()
    })

    it('does not render the view if there is no note', function () {
        mainPanel.setState({ note: null })
        let rootElem = renderedDOM()
        expect(rootElem.innerHTML).toEqual('')
    })

    it('shows selected note in note view if title is not blank', () => {
        mainPanel.setState({ note: null })
        SelectedNoteStore.trigger(note)
        let rootElem = renderedDOM()
        expect(rootElem.querySelector('h4').innerText).toEqual('Note 1')
    })

    it('shows selected note in note form if title is blank', () => {
        mainPanel.setState({ note: null })
        SelectedNoteStore.trigger({ title: '' })
        let rootElem = renderedDOM()
        expect(rootElem.querySelector('input[name="title"]')).toExist()
    })
})
