const { ObjectId }= require('mongoose').Types;
module.exports = {
  constructFilter
};

const filterConditions = {
  '!=': value => ({$ne: value}),
  '==': value => ({$eq: value})
};

function constructFilter(filter = []) {

  const constructedFilter =  filter.reduce((accumulator, currentValue) => {
    const [condition, valueGetter] = Object.entries(filterConditions)
      .find(([condition]) => currentValue.includes(condition)) || [];
    const [propertyToFilter, value] = condition ? currentValue.split(condition) : [];
    if (propertyToFilter !== undefined && value !== undefined) {
      accumulator[propertyToFilter] = valueGetter((value === 'null' || value === 'undefined') ? null : value)
    }
    return accumulator;
  }, {});

  convertIds(constructedFilter);

  return constructedFilter;
}

function convertIds(target) {
  for(let key of Object.keys(target)) {
      let child = target[key];
      if (typeof child === 'object' && child !== null && !Array.isArray(child)) {
        convertIds(child);
      } else {
        if (ObjectId.isValid(child)) {
          target[key] = ObjectId(child);
        }
      }
  }
}