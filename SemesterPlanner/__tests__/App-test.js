/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {expect, jest, test} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

//example test
it('2 plus 2 is 4', () => {
  expect(2+2).toBe(4);
})
