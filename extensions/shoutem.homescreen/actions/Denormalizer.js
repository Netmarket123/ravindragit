import _ from 'lodash';

function extractValuesFromObject(object) {
  return _.reduce(object, (acc, val) => Object.assign({}, acc, val), {});
}

export default class Denormalizer {
  constructor(normalizedData) {
    this.normalizedData = normalizedData;
  }

  getDenormalizedItem(targetDescriptor) {
    const { type, id } = targetDescriptor;
    const normalizedItem = this.normalizedData.find(item => item.type === type && item.id === id);

    const { attributes, relationships } = normalizedItem;

    const extractedRelationshipData = _.map(relationships, (value, key) => ({
      [key]: value.data.map(this.getDenormalizedItem.bind(this)),
    }));

    return Object.assign({}, attributes, extractValuesFromObject(extractedRelationshipData));
  }
}
