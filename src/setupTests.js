import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

var global;

class LocalStorageMock {
    constructor() {
        this.store = {}
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value
    }

    removeItem(key) {
        delete this.store[key]
    }
}

global.localStorage = new LocalStorageMock();
global.sessionStorage = new LocalStorageMock();