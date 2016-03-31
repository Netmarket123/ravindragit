import _ from 'lodash';

const DENORMALIZE = Symbol('denormalize');
const DENORMALIZE_DATA = Symbol('denormalizedData');

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
    this[DENORMALIZE_DATA] = null;
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
    const normalizedItem =
      this.normalizedData.included.find(item => item.type === type && item.id === id);

    if (!normalizedItem) {
      console.warn(`Couldn't find item: ${id} of type ${type}`);
      return {};
    }

    const { attributes, relationships } = normalizedItem;
    const extractedRelationshipData = _.reduce(relationships, (result, value, key) => ({
      ...result,
      [key]: value.children.data.map(this.getDenormalizedItem),
    }), {});

    return Object.assign({}, attributes, extractedRelationshipData);
  }

  /**
   * Returns cached denormalized data or
   * creates new cache copy of normalized data and returns it.
   * @returns {{} - denormalized cached data
   */
  getDenormalizedData() {
    if (this[DENORMALIZE_DATA]) {
      // cached denormalized data
      return this[DENORMALIZE_DATA];
    }
    return this[DENORMALIZE]();
  }

  /**
   * Denormalizes saved normalizedData and saves it to cache.
   * @returns {{}} - denormalized cached data
   */
  [DENORMALIZE]() {
    const relations = this.normalizedData.data.relationships;

    const { type, id, attributes } = this.normalizedData.data;
    this[DENORMALIZE_DATA] = {
      id,
      type,
      ...attributes,
    };

    _.forEach(relations, (item, name) => {
      if (item.data.length > 0) {
        const relationsData = item.data;
        this[DENORMALIZE_DATA][name] = [];
        for (const itemInfo of relationsData) {
          this[DENORMALIZE_DATA][name].push(this.getDenormalizedItem(itemInfo));
        }
      }
    });

    return this[DENORMALIZE_DATA];
  }
}
