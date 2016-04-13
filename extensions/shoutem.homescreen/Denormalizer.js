import _ from 'lodash';

/**
 * Returns provided data in denormalized form
 */
export default class Denormalizer {
  /**
   * Creates a Denormalizer for a given noralized data array such as
   * included or data array of a JSON-api response
   *
   * @param normalizedData - an array of normalized data in JSON-api format
   */
  constructor(normalizedData) {
    this.normalizedData = normalizedData;
    this.getDenormalizedItem = this.getDenormalizedItem.bind(this);
  }

  /**
   * finds an item by type and id in targetDescriptor and returns it in
   * denormalized form - containing all its attributes as first-level
   * object keys and having all it's relationships values populated with
   * actual objects which have been referenced
   *
   * @returns {} - a denormalized item
   */
  getDenormalizedItem(targetDescriptor) {
    const { type, id } = targetDescriptor;
    const normalizedItem = this.normalizedData.find(item => item.type === type && item.id === id);

    const { attributes, relationships } = normalizedItem;

    const extractedRelationshipData = _.reduce(relationships, (result, value, key) => ({
      ...result,
      [key]: value.data.map(this.getDenormalizedItem),
    }), {});

    return Object.assign({}, attributes, extractedRelationshipData);
  }
}