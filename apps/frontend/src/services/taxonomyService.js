import { taxonomyItemToOptionSelector } from 'selectors';

export const getTaxonomyField = (element, fields) => {
  if (fields) {
    const name = fields.find(f => element[f]);
    if (name)
      return element[name];
  }
  return undefined;
}

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
export const mapIDsToOptions = (ids, taxonomy, names = [ 'name', 'id' ]) => {
  return ids ? mapIDsToObjects(ids, taxonomy).map(i => taxonomyItemToOptionSelector(i, names)) : [];
}

/**
 * Convert taxonomy to options array
 */
export const taxonomyToOptions = (taxonomy, names = ['name', 'id']) => {
  return taxonomy ? taxonomy.map(i => taxonomyItemToOptionSelector(i, names)) : [];
}

export const taxonomyItemToOptionItem = (element, names = ['name', 'id']) => {
  return taxonomyItemToOptionSelector(element, names);
}
