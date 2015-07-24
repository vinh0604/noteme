import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import MainPanel from '../../../src/javascripts/components/MainPanel'

describe('mainPanel', () => {
    var mainPanel;

    beforeEach(() => {
        mainPanel = TestUtils.renderIntoDocument(<MainPanel />)
    });

    it('renders without problems', () => {
        expect(mainPanel).toExist();
    });
})
