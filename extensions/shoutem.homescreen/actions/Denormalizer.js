import _ from 'lodash';

function extractValuesFromObject(object) {
  return _.reduce(object, (acc, val) => Object.assign({}, acc, val), {});
}

/**
 * Returns provided data in denormalized form
 */
export default class Denormalizer {
  constructor(normalizedData) {
    this.normalizedData = normalizedData;
    this.getDenormalizedItem = this.getDenormalizedItem.bind(this);
  }

  /**
   * finds an item by type and id from normalized data array and denormalizes it
   * @returns {} - a denormalized item
   */
  getDenormalizedItem(targetDescriptor) {
    const { type, id } = targetDescriptor;
    const normalizedItem = this.normalizedData.find(item => item.type === type && item.id === id);

    const { attributes, relationships } = normalizedItem;

    const extractedRelationshipData = _.map(relationships, (value, key) => ({
      [key]: value.data.map(this.getDenormalizedItem),
    }));

    return Object.assign({}, attributes, extractValuesFromObject(extractedRelationshipData));
  }
}
