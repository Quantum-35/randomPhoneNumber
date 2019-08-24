import React from 'react';
import { mount, shallow } from "enzyme";

import { InputForm }  from '../index';


describe('Test InputForm Component', () => {
    localStorage.setItem('numbers', ['07123', '28383']);
    const mockData = {
        max: "123",
        min: "12"
    };
    localStorage.setItem('maxMini', JSON.stringify(mockData));

    it('renders without crushing',() => {
        const wrapper = mount(<InputForm />);
        expect(wrapper.find('.form-parent__container').exists()).toBe(true)
        expect(wrapper).toMatchSnapshot();
    });
    it('can handleInputChange', async() => {
        const wrapper = mount(<InputForm />);
        const inst = wrapper.instance();
        const e = { target: { value: '20', name: 'test' } };
        
        await inst.handleInputChange(e);
        expect(inst.state.phoneBook).toEqual({test: '20'});
        const e1 = { target: { value: 'notNumber', name: 'test' } };
        await inst.handleInputChange(e1);
        const e2 = { target: { value: '120000', name: 'test' } };
        await inst.handleInputChange(e2);
        const e3 = { target: { value: '0', name: 'test' } };
        await inst.handleInputChange(e3);
       
    });
    it('can generate random numbers', async() => {
        const wrapper = mount(<InputForm />);
        const inst = wrapper.instance();
        const e = {
            preventDefault: jest.fn()
        }
        inst.state.phoneBook.amount = 5;
        await inst.handleGeneratePhoneNumber(e);
        expect(inst.state.numbers).toBeInstanceOf(Array);
    })

    it('can execute handleOnMouseEnter', async() => {
        const wrapper = mount(<InputForm />);
        const inst = wrapper.instance();
        await inst.handleOnMouseEnter();
        expect(inst.state.showDropdown).toBe('block');
    })

    it('can execute handleMouseOnDropdown', async() => {
        const wrapper = mount(<InputForm />);
        const inst = wrapper.instance();
        await inst.handleMouseOnDropdown();
        expect(inst.state.showDropdown).toBe('block');
    })

    it('can execute onMouseLeave', async() => {
        const wrapper = mount(<InputForm />);
        const inst = wrapper.instance();
        await inst.onMouseLeave();
        expect(inst.state.showDropdown).toBe('none');

        inst.state.mouseOnDropdown = true;
        await inst.onMouseLeave();
        expect(inst.state.showDropdown).toBe('block');
    })

    it('can execute getPhoneNumbers', async() => {
        const wrapper = mount(<InputForm />);
        const inst = wrapper.instance();
        inst.state.sortAsc = true;
        await inst.getPhoneNumbers();
    })
    it('can execute handleSortAscending', async() => {
        const wrapper = mount(<InputForm />);
        const inst = wrapper.instance();
        await inst.handleSortAscending();
        expect(inst.state.sortAsc).toBe(true);
    })
    it('can execute handleSortDescending', async() => {
        const wrapper = mount(<InputForm />);
        const inst = wrapper.instance();
        await inst.handleSortDescending();
        expect(inst.state.sortAsc).toBe(false);
    })
});