import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import Topbar from '../../../src/javascripts/components/Topbar'
import Actions from '../../../src/javascripts/actions/index'

describe('topbar', () => {
    let topbar, renderedDOM;

    beforeEach(function () {
        topbar = TestUtils.renderIntoDocument(<Topbar />)
        renderedDOM = () => ReactDOM.findDOMNode(topbar)
    })

    it('renders search widget', () => {
        let rootElem = renderedDOM()
        expect(rootElem.querySelector('.sidebar__topbar__search-widget')).not.toBeNull()
        expect(rootElem.querySelector('input[name="keyword"]')).not.toBeNull()
    })

    it('renders add and tag button', function () {
        let rootElem = renderedDOM()
        expect(rootElem.querySelector('.sidebar__topbar__buttons .fa-plus')).not.toBeNull()
        expect(rootElem.querySelector('.sidebar__topbar__buttons .fa-tags')).not.toBeNull()
    })

    it('dispatches addNote action when add button is clicked', function () {
        spyOn(Actions, 'addNote')
        let rootElem = renderedDOM()
        let addElem = rootElem.querySelector('.sidebar__topbar__buttons .fa-plus')
        TestUtils.Simulate.click(addElem)
        expect(Actions.addNote).toHaveBeenCalled()
    })
})
