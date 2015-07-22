import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import App from '../../../src/javascripts/components/App'

describe('app', () => {
  it('renders without problems', () => {
    let app = TestUtils.renderIntoDocument(<App/>);

    expect(app).toExist();
  })
})
