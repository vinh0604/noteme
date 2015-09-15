import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import MainPanel from '../../../src/javascripts/components/MainPanel'
import NoteView from '../../../src/javascripts/components/NoteView'
import NoteForm from '../../../src/javascripts/components/NoteForm'
import $ from 'jquery'
window.jQuery = $
require('jasmine-jquery/lib/jasmine-jquery')

describe('mainPanel', () => {
    var note = { title: 'Note 1', content: 'Note **content** 1' }
    var mainPanel, renderedDOM, renderer;

    beforeEach(() => {
        renderedDOM = () => React.findDOMNode(mainPanel)
    })

    it('renders note view by default', () => {
        renderer = TestUtils.createRenderer()
        renderer.render(<MainPanel note={note} />)
        let result = renderer.getRenderOutput()

        expect(result.props.children.type).toEqual(NoteView)
    })

    it('renders note form when user click on note view title', () => {
        mainPanel = TestUtils.renderIntoDocument(<MainPanel note={note} />)
        let rootElem = renderedDOM()
        TestUtils.Simulate.click(rootElem.querySelector('h4'))

        let titleElem = rootElem.querySelector('input[name="title"]')
        let contentElem = rootElem.querySelector('textarea[name="content"]')
        expect(titleElem).toExist()
        expect(contentElem).toExist()
    })
})
