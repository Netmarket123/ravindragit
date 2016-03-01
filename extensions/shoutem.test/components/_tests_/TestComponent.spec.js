/**
 *
 * Test example in _test_ folder
 *
 */

import { TestAtComponentLoaded } from '../TestComponent.spec';
import { assert } from 'chai';

describe('test in _tests_ folder', () => {
  it('test at component should be true', () => {
    assert.isTrue(TestAtComponentLoaded);
  });
});
