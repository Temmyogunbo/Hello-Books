import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import LocalStorage from './__mocks__/localStorage';

window.localStorage = LocalStorage;
global.$=jest.fn(()=>({
    sideNav: jest.fn(),
    ready: jest.fn()
}))
configure({ adapter: new Adapter() });
