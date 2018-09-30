import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import App from '../App';

test('Appointment component renders the text Appointments', () => {
  const wrapper = mount(<App />);
  const h1 = wrapper.find('h1');
  expect(h1.text()).toBe('Appointments');
});
