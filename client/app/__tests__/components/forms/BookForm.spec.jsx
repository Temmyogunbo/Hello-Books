import React from 'react';
import { shallow } from 'enzyme';
import BookForm from '../../../src/components/forms/BookForm';

const props = {
  label: 'category',
  field: 'category',
  items: [{ id: 1, category: 'English' }, { id: 2, category: 'mathematics' }],
  handleChange: jest.fn(),
  value: 'category',
  book: {},
  editBook: jest.fn(),
  addBook: jest.fn(),
  categories: [{ id: 1, category: 'English' },
    { id: 2, category: 'mathematics' }],
  error: '',
};

describe('Given a BookForm', () => {
  const wrapper = shallow(<BookForm {...props} />);
  describe('When I clicked on it', () => {
    it('Then it should render without crashing', () => {
      expect(wrapper).toBeDefined();
      expect(wrapper.getElement().type).toBe('div');
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });
    it('Then it should have a TextFieldGroup', () => {
      expect(wrapper.find('TextFieldGroup').length).toBe(4);
    });
    it('Then it should have a SelectFieldGroup', () => {
      expect(wrapper.find('SelectFieldGroup').length).toBe(1);
    });

    it('Then it should call the onSubmit method', () => {
      const event = { ...global.event };
      const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
      wrapper.instance().onSubmit(event);
      expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });
    it('Then it should call the handleChange method', () => {
      const event = {
        ...global.event,
        target: {
          name: 'name',
          value: 'value'
        }
      };
      const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().handleChange(event);
      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    });
    it('Then it should call the componentWillReceiveProps method', () => {
      const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      const nextProps = {
        description: 'I got a voucher',
        id: 1,
        category: 'Programming',
        title: 'African child',
        quantity: 10,
        author: 'Emmanuel',
        imageUrl: 'http://andela.com',
        imagePublicId: '737363636',
        bookHead: "EDIT BOOK BY CATEGORY",
        buttonText: 'EDIT BOOK',
        isEdit: true,
        isButtonLoading: false
      };
      wrapper.instance().componentWillReceiveProps(nextProps);
      expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    });
    it('Then it should call the uploadTOCloudinary method', () => {
      const event = {
        ...global.event,
        target: {
          name: 'name',
          value: 'value'
        }
      };
      const uploadToCloudinarySpy = jest.spyOn(
        wrapper.instance(),
        'uploadToCloudinary'
      );
      wrapper.instance().uploadToCloudinary(event);
      expect(uploadToCloudinarySpy).toHaveBeenCalledTimes(1);
    });
    it(
      'Then it should call handleClose method when a button is clicked',
      () => {
        const handleCloseSpy = jest.spyOn(wrapper.instance(), 'handleClose');
        wrapper.instance().handleClose();
        expect(handleCloseSpy).toHaveBeenCalledTimes(1);
      }
    );
  });
});
