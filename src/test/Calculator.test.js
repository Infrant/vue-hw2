import MyCalculator from "../components/MyCalculator"
import {mount} from '@vue/test-utils'
import {expect} from "@jest/globals"

describe('Test Calculator', () => {
    it('Test first operand', () => {
        const wrapper = mount(MyCalculator)
        const first = wrapper.find('#firstInput')
        first.setValue('1')
        expect(wrapper.vm.first).toBe(1)
    })


    it('Test second operand', () => {
        const wrapper = mount(MyCalculator)
        const second = wrapper.find('#secondInput')
        second.setValue('2')
        expect(wrapper.vm.second).toBe(2)
    })

    it('Test method sum', () => {
        const wrapper = mount(MyCalculator)
        const first = wrapper.find('#firstInput')
        first.element.value = "1"
        first.trigger('input')

        const second = wrapper.find('#secondInput')
        second.setValue('4')

        const btn = wrapper.find('button[name="+"]')
        btn.trigger('click')

        expect(wrapper.vm.result).toBe(5)
    })

    it('Test method sub', () => {
        const wrapper = mount(MyCalculator)
        const first = wrapper.find('#firstInput')
        first.element.value = "1"
        first.trigger('input')

        const second = wrapper.find('#secondInput')
        second.setValue('4')

        const btn = wrapper.find('button[name="-"]')
        btn.trigger('click')

        expect(wrapper.vm.result).toBe(-3)
    })

    it('Test method multiple', () => {
        const wrapper = mount(MyCalculator)
        const first = wrapper.find('#firstInput')
        first.element.value = "1"
        first.trigger('input')

        const second = wrapper.find('#secondInput')
        second.setValue('4')

        const btn = wrapper.find('button[name="*"]')
        btn.trigger('click')

        expect(wrapper.vm.result).toBe(4)
    })

    it('Test method divide', async () => {
        const wrapper = mount(MyCalculator)
        await wrapper.find('#firstInput').setValue('4')

        await wrapper.find('#secondInput').setValue('2')

        await wrapper.find('button[name="/"]').trigger('click')

        expect(wrapper.vm.result).toBe(2)
    })

    it('Test click on input', async () => {
        const wrapper = mount(MyCalculator, {
            attachTo: document.body
        })
        await wrapper.find('#secondInput').trigger('click')
        expect(wrapper.vm.radio).toBe('second')
    })

    it('Test keyboard', async () => {
        const wrapper = mount(MyCalculator);

        // отображение клавиатуры
        const check = wrapper.find('#check');
        expect(check.element.checked).toBe(false);

        const keyboard = wrapper.find('#keyboard');
        expect(keyboard.isVisible()).toBe(false)

        await check.setChecked(true);
        expect(check.element.checked).toBe(true);

        expect(keyboard.isVisible()).toBe(true);

        // 1 радио кнопка
        const firstRadio = wrapper.find('#firstRadio');
        await firstRadio.trigger('focus')
        expect(wrapper.vm.radio).toBe('first');


        // цифры экранной клавиатуры с первой радио кнопки
        for (let i = 1; i <= 9; i++) {
            wrapper.find(`button[name="${i}"]`).trigger('click');
        }
        wrapper.find(`button[name="0"]`).trigger('click')
        expect(wrapper.vm.first).toBe(1234567890);

        const backspace = wrapper.find('button[name="backspace"]');
        backspace.trigger('click');
        expect(wrapper.vm.first).toBe(123456789);

        // 2 радио кнопка
        const secondRadio = wrapper.find('#secondRadio');
        await secondRadio.setChecked();
        expect(wrapper.vm.radio).toBe('second');

        // цифры экранной клавиатуры со второй радио кнопки
        for (let i = 1; i <= 9; i++) {
            wrapper.find(`button[name="${i}"]`).trigger('click');
        }
        wrapper.find(`button[name="0"]`).trigger('click')
        expect(wrapper.vm.second).toBe(1234567890);

        backspace.trigger('click');
        expect(wrapper.vm.second).toBe(123456789);
    });
})