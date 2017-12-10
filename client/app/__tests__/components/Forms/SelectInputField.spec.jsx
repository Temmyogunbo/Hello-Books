import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectInputField from '../../../src/components/Forms/SelectInputField';

describe('Given TextFieldGroup', () => {
  describe('When I clicked on it', () => {
    const props = {
      field: 'field',
      value: 'value',
      label: 'category',
      error: '',
      items: [{ id: 1, category: 'English' }, { id: 2, category: 'mathematics' }],
      handleChange: jest.fn()
    };
    const wrapper = shallow(<SelectInputField {...props} />);
    it('Then it renders a select field', () => {
      expect(wrapper.find('select').length).toBe(1);
    });
    it('Then it onChange prop function when option is selected', () => {
      const setupMount = () => mount(<SelectInputField {...props} />);

      const mountWrapper = setupMount();
      mountWrapper.find('select').simulate('change');
      expect(props.handleChange).toHaveBeenCalled();
    });
  });
});
