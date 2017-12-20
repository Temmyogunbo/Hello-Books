import React from 'react';
import { shallow } from 'enzyme';

import { Welcome } from '../../../src/components/Welcome';

const props = {
  isAuthenticated: false
};

describe('Given a Welcome page', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<Welcome {...props} />);
    it('Then it renders a div element', () => {
      expect(wrapper.find('div')).toHaveLength(4);
    });
  });
});

describe('Given a Welcome page', () => {
  describe('When the browser opens', () => {
    const props = {
      isAuthenticated: true
    };
    const wrapper = shallow(<Welcome {...props} />);
    it('Then it should call the componentWillReceiveProps method', () => {
      const componentWillMountSpy = jest.spyOn(
        wrapper.instance(),
        'componentWillMount'
      );
      wrapper.instance().componentWillMount();
      expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    });
  });
});
