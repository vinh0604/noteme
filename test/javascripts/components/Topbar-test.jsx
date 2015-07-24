import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import Topbar from '../../../src/javascripts/components/Topbar'

describe('topbar', () => {
    it('renders without problems', () => {
        let topbar = TestUtils.renderIntoDocument(<Topbar />)
        expect(topbar).toExist();
    })
})
