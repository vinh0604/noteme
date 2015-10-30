import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import NoteLine from '../../../src/javascripts/components/NoteLine'
import Actions from '../../../src/javascripts/actions/index'
import $ from 'jquery'
window.jQuery = $
require('jasmine-jquery/lib/jasmine-jquery')

describe('noteLine', () => {
    var note = { title: 'Note 1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint perspiciatis dolorum quia eveniet, sunt fugit? Optio sit officiis aliquid. Totam nulla adipisci, hic quis consectetur cumque in doloribus, officia quod.' };
    var noteLine, renderedDOM, spy;

    beforeEach(() => {
        spy = jasmine.createSpy('spy');
        noteLine = TestUtils.renderIntoDocument(<NoteLine note={note} onTagClick={spy} />);
        renderedDOM = () => ReactDOM.findDOMNode(noteLine);
    })

    it('renders with a li element', () => {
        let rootElem = renderedDOM();
        expect(rootElem.tagName).toEqual('LI');
    })

    it('renders correct note title', () => {
        let rootElem = renderedDOM();
        expect(rootElem.querySelector('h4').textContent).toEqual("Note 1")
    })

    it('renders with content summary', () => {
        let rootElem = renderedDOM();
        let contentElem = rootElem.querySelector('p')
        expect(contentElem.textContent).toEqual('Lorem ipsum dolor sit amet, consectetur...')
    })

    it('renders with buttons group', () => {
        let rootElem = renderedDOM()
        let buttonsElems = rootElem.querySelectorAll('li > a')
        expect(buttonsElems[0].getAttribute('title')).toEqual('Tag')
        expect(buttonsElems[1].getAttribute('title')).toEqual('Archive')
        expect(buttonsElems[2].getAttribute('title')).toEqual('Delete')
    })

    it('dispact selectNote action when being clicked', () => {
        spyOn(Actions, 'selectNote')
        let rootElem = renderedDOM()
        TestUtils.Simulate.click(rootElem)
        expect(Actions.selectNote).toHaveBeenCalledWith(note)
    })

    it('renders with class sidebar__item--selected if selected', () => {
        noteLine = TestUtils.renderIntoDocument(<NoteLine note={note} selected={true} />)
        let rootElem = renderedDOM()
        expect(rootElem).toHaveClass('sidebar__item--selected')
    })

    it('dispact deleteNote action when delete button is clicked', () => {
        spyOn(Actions, 'deleteNote')
        let rootElem = renderedDOM()
        let deleteBtn = rootElem.querySelector('a[title="Delete"]')
        TestUtils.Simulate.click(deleteBtn)
        expect(Actions.deleteNote).toHaveBeenCalledWith(note)
    })

    it('dispact archiveNote action when archive button is clicked', () => {
        spyOn(Actions, 'archiveNote')
        let rootElem = renderedDOM()
        let archiveBtn = rootElem.querySelector('a[title="Archive"]')
        TestUtils.Simulate.click(archiveBtn)
        expect(Actions.archiveNote).toHaveBeenCalledWith(note)
    })

    it('trigger onTagClick handler when tag button is clicked', () => {
        let rootElem = renderedDOM()
        let tagBtn = rootElem.querySelector('a[title="Tag"]')
        TestUtils.Simulate.click(tagBtn)
        expect(spy).toHaveBeenCalledWith(note, $(rootElem).position())
    })

    it('render New Note if note title is blank', () => {
        noteLine = TestUtils.renderIntoDocument(<NoteLine note={{title: '', content: ''}} onTagClick={spy} />)
        let rootElem = renderedDOM()
        expect(rootElem.querySelector('h4').textContent).toEqual("New Note")
    })
})
