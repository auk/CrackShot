import { taxonomyItemToOptionSelector } from 'selectors';

/**
 *  Find element by ID
 * @param {*} id - id of element
 * @param {*} taxonomy - full collection of elements. Example of collection: [ { id: '1', name: 'a' }, { id: '2', name: 'b' }]
 */
export const findObjectByID = (id, taxonomy) => {
  return taxonomy ? taxonomy.find(e => e.id === id) : undefined;
}

/**
 * Map list of IDs to objects
 * @param {*} ids - collection of IDs
 * @param {*} taxonomy - full collection of elements
 */
export const mapIDsToObjects = (ids, taxonomy) => {
  return ids ? ids.map(id => findObjectByID(id, taxonomy)).filter(e => e) : [];
}

/**
 * Map list of IDs to select options
 * @param {*} ids
 * @param {*} taxonomy
 */
export const mapIDsToOptions = (ids, taxonomy) => {
  return ids ? mapIDsToObjects(ids, taxonomy).map(i => taxonomyItemToOptionSelector(i)) : [];
}