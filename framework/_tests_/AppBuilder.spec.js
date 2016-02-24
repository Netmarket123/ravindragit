import AppBuilder from '../AppBuilder.js';
import { assert } from 'chai';

describe('AppBuilder', function () {
  it('can be created', function () {
    assert.isOk(new AppBuilder(), 'AppBuilder cannot be created');
  });
});
