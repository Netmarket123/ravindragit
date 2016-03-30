import { assert } from 'chai';
import Denormalizer from '../Denormalizer';

describe('Denormalizer', () => {
  describe('getDenormalizedItem', () => {
    describe('data contains one level of references', () => {
      const testNormalizedData = [
        { type: 'type1', id: 1, attributes: { field1: 'value1' } },
        { type: 'type1', id: 2, attributes: { field1: 'value2' } },
        { type: 'type1', id: 3, attributes: { field1: 'value3' },
          relationships:
          {
            children: {
              data: [
                  { type: 'type1', id: 1 },
                  { type: 'type1', id: 2 },
              ],
            },
          },
        },
      ];

      const denormalizer = new Denormalizer(testNormalizedData);

      it('returns denormalized data', () => {
        const expectedDenormalizedData = {
          field1: 'value3',
          children: [
            { field1: 'value1' },
            { field1: 'value2' },
          ],
        };

        const denormalizedData = denormalizer.getDenormalizedItem({ type: 'type1', id: 3 });
        assert.deepEqual(denormalizedData, expectedDenormalizedData,
                         'denormalized data does not contain children');
      });
    });
    describe('data contains two levels of references', () => {
      const testNormalizedData = [
        { type: 'type1', id: 1, attributes: { field1: 'value1' } },
        { type: 'type1', id: 2, attributes: { field1: 'value2' },
          relationships:
          {
            children: {
              data: [
                  { type: 'type1', id: 1 },
              ],
            },
          },
        },
        { type: 'type1', id: 3, attributes: { field1: 'value3' },
          relationships:
          {
            children: {
              data: [
                  { type: 'type1', id: 2 },
              ],
            },
          },
        },
      ];

      const denormalizer = new Denormalizer(testNormalizedData);

      it('returns denormalized data with two levels of references', () => {
        const expectedDenormalizedData = {
          field1: 'value3',
          children: [
            {
              field1: 'value2',
              children: [
                { field1: 'value1' },
              ],
            },
          ],
        };

        const denormalizedData = denormalizer.getDenormalizedItem({ type: 'type1', id: 3 });
        assert.deepEqual(denormalizedData, expectedDenormalizedData,
                         'denormalized data is not correct');
      });
    });
  });
});
