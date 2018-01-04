import React from 'react';
import { shallow, } from 'enzyme';
import TextFieldGroup from '../../../src/components/forms/TextFieldGroup';

describe('Given TextFieldGroup', () => {
  describe('When I clicked on it', () => {
    const props = {
      field: 'field',
      id: 'id',
      value: 'value',
      label: 'label',
      error: 'This field is required',
      type: 'text',
      icon: 'person',
      textArea: '',
      handleChange: jest.fn(),
    };
    const wrapper = shallow(<TextFieldGroup {...props}/>);
    it('Then it renders an input field', () => {
      expect(wrapper.find('input').length).toBe(1);
    });
    it('calls onChange prop function when input value changes', () => {
      const textFieldGroup = wrapper.find('input[type="text"]').at(0);
      textFieldGroup.simulate('change');
      expect(props.handleChange).toHaveBeenCalled();
    });
    it('Then it renders error message when required', () => {
      expect(wrapper.find('span').text()).toEqual('This field is required');
    });
    it('Then it renders text area if present', () => {
      const props2 = {
        field: 'field',
        id: 'id',
        value: 'value',
        label: 'label',
        error: 'This field is required',
        type: 'text',
        icon: 'person',
        textArea: 'I am here',
        handleChange: jest.fn(),
      };
      const shallowWrapper = shallow(<TextFieldGroup {...props2} />);
      expect(shallowWrapper.find('textarea').length).toBe(1);
    });
    it('calls onChange prop function when text area value changes', () => {
      const props2 = {
        field: 'field',
        id: 'id',
        value: 'value',
        label: 'label',
        error: 'This field is required',
        type: 'text',
        icon: 'person',
        textArea: 'I am here',
        handleChange: jest.fn()
      };
      const shallowWrapper = shallow(<TextFieldGroup {...props2} />);
      const textFieldGroup = shallowWrapper.find('textarea');
      textFieldGroup.simulate('change');
      expect(props.handleChange).toHaveBeenCalled();
    });
  });
});
