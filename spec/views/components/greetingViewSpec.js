'use strict';

const GreetingView = require('../../../app/views/components/greetingView');

describe('Greeting View', () => {
  it('should mention it is a raw HTML component', () => {
    expect(GreetingView.render()).toContainString('raw component');
  });
});
