/**
 *
 * Test example in _test_ folder
 *
 */

import { TestAtComponentLoaded } from '../test-component.spec.js';
import { expect } from 'chai';

describe('test in _tests_ folder', () => {
  it('test at component should be true', () => {
    expect(TestAtComponentLoaded).to.equal(true);
  });
});
