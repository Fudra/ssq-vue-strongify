/*eslint-disable*/

import Strongify from '@/components/Strongify'
import {mount} from '@vue/test-utils'

describe('Strongify.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Strongify);
  })

  it('should be a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  })

  describe('default Options', () => {

    it('the min password length should be 6', () => {
      expect(wrapper.vm.minLength).toBe(6);
    })

    it('the default password strength should be 0', () => {
      expect(wrapper.vm.strength).toBe(0);
    })

    it('the default password cases should be false ', () => {
      expect(wrapper.vm.hasNumber).toBeFalsy();
    })
  })

  describe('password', () => {

    it('should match the given one', () => {

      wrapper.setProps({
        password: 'foo'
      })

      expect(wrapper.vm.password).toBe('foo')
    })

    it('should not match the given one', () => {

      wrapper.setProps({
        password: 'foo'
      })

      expect(wrapper.vm.password).not.toBe('abc')
    })

    it('should have a password strength of 1', () => {

      wrapper.setProps({
        password: 'aaaaaa'
      })

      expect(wrapper.vm.strength).toBe(1)
    })

    it('strength is below the min length', () => {
      wrapper.setProps({
        password: 'a#A3.'
      })

      expect(wrapper.vm.strength).toBe(0)
    })

    // it('should change the min length', () => {
    //
    //   wrapper.setProps({
    //     password: 'a#A3.#',
    //   })
    //
    //   expect(wrapper.vm.strength).toBe(4);
    //
    //   wrapper.setProps({
    //     minLength: 10,
    //     password: 'a#A3',
    //   })
    //
    //   // console.log('minLength',wrapper.vm.minLength);
    //   // expect(true).toBe(false);
    //   // console.log('strength',wrapper.vm.strength);
    //   // console.log('test',wrapper.vm.password.length < wrapper.vm.minLength);
    //   // expect(wrapper.vm.strength).toBe(0);
    //
    // })

    it('should contain a comment', () => {

      mocki18n();

      wrapper.setProps({
        withComments: true,
        password: 'aaaaaa',
      })

      expect(wrapper.contains('.comment')).toBe(true);

    })

    it('should contain a text with the password strength', () => {

      mocki18n();

      wrapper.setProps({
        withComments: true,
        password: 'aaa2aa',
      })

      expect(wrapper.find('.comment').text()).toContain('strongify.comment.2');
    })

    it('should contain a text with a mismatch password strength', () => {

      mocki18n();

      wrapper.setProps({
        withComments: true,
        password: 'aaa2aa',
      })

      expect(wrapper.find('.comment').text()).not.toContain('strongify.comment.1');
    })
  })

  describe('implementation details', () => {
    it('setStrength should set the given strength', () => {
      wrapper.vm.setStrength(2);

      expect(wrapper.vm.strength).toBe(2);
    })

    it('setStrength should not be greater than the max strength', () => {
      wrapper.vm.setStrength(10);

      expect(wrapper.vm.strength).toBe(4);
    })

    it('hasVariationRule should return true on given large  variant password', () => {
      expect(wrapper.vm.hasVariationRule('12345678')).toBe(true);
    })

    it('hasVariationRule should return false on given min length  password', () => {
      expect(wrapper.vm.hasVariationRule('123456')).toBe(false);
    })

    it('hasBigVariationRule should return true on given extra large variant password', () => {
      expect(wrapper.vm.hasBigVariationRule('1234567890ab')).toBe(true);
    })

    it('hasBigVariationRule should return false on given min length variant password', () => {
      expect(wrapper.vm.hasBigVariationRule('12345678')).toBe(false);
    })

  });


  function mocki18n() {
    wrapper.setMethods({ '$t': (a) => {return a}} );
    // wrapper.vm.$t = (a) => {return a} ;
  }
});
