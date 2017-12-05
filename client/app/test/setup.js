import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import LocalStorage from './mocks/localStorage';

window.localStorage = LocalStorage;

configure({ adapter: new Adapter() });