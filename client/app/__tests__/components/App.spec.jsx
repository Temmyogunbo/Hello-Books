
import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { MemoryRouter, } from 'react-router';

import App from '../../src/components/App';

jest.mock('react-router');


describe('Given App component', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<App />);
    it('Then should render application routes', () => {
      expect(wrapper).toBeDefined();
    });
  });
});

