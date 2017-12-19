import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import LocalStorage from './__mocks__/localStorage';

window.localStorage = LocalStorage;
global.$ = jest.fn(() => ({
  sideNav: jest.fn(),
  ready: jest.fn()
}));
global.event = {
  preventDefault: jest.fn()
};
global.toastr = { toastr: () => { } };
global.history = { push: () => { } };
global.history = { replace: () => { } };
global.match = { params: {} };
global.localStorage = new LocalStorage();
configure({ adapter: new Adapter() });
