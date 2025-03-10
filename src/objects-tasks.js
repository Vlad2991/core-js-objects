/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  return { ...obj };
}

function mergeObjects(objects) {
  return objects.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => {
      acc[key] = (acc[key] || 0) + obj[key];
    });
    return acc;
  }, {});
}

function removeProperties(obj, keys) {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
}

function compareObjects(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  return keys1.every((key) => obj1[key] === obj2[key]);
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function makeImmutable(obj) {
  return Object.freeze({ ...obj });
}

function makeWord(lettersObject) {
  const word = [];
  Object.entries(lettersObject).forEach(([letter, positions]) => {
    positions.forEach((pos) => {
      word[pos] = letter;
    });
  });
  return word.join('');
}

function sellTickets(queue) {
  let cash25 = 0;
  let cash50 = 0;

  for (let i = 0; i < queue.length; i += 1) {
    const bill = queue[i];
    if (bill === 25) {
      cash25 += 1;
    } else if (bill === 50) {
      if (cash25 === 0) return false;
      cash25 -= 1;
      cash50 += 1;
    } else if (bill === 100) {
      if (cash50 > 0 && cash25 > 0) {
        cash50 -= 1;
        cash25 -= 1;
      } else if (cash25 >= 3) {
        cash25 -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = function getArea() {
    return this.width * this.height;
  };
}

function getJSON(obj) {
  return JSON.stringify(obj);
}

function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}

function sortCitiesArray(arr) {
  return arr.sort((a, b) => {
    if (a.country === b.country) {
      return a.city.localeCompare(b.city);
    }
    return a.country.localeCompare(b.country);
  });
}

function group(array, keySelector, valueSelector) {
  const map = new Map();
  array.forEach((item) => {
    const key = keySelector(item);
    const value = valueSelector(item);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(value);
  });
  return map;
}

class CssSelectorBuilder {
  constructor() {
    this.selectors = [];
    this.order = [];
  }

  element(value) {
    this.validateOrder('element');
    this.selectors.push(value);
    this.order.push('element');
    return this;
  }

  id(value) {
    this.validateOrder('id');
    this.selectors.push(`#${value}`);
    this.order.push('id');
    return this;
  }

  class(value) {
    this.validateOrder('class');
    this.selectors.push(`.${value}`);
    this.order.push('class');
    return this;
  }

  attr(value) {
    this.validateOrder('attr');
    this.selectors.push(`[${value}]`);
    this.order.push('attr');
    return this;
  }

  pseudoClass(value) {
    this.validateOrder('pseudoClass');
    this.selectors.push(`:${value}`);
    this.order.push('pseudoClass');
    return this;
  }

  pseudoElement(value) {
    this.validateOrder('pseudoElement');
    this.selectors.push(`::${value}`);
    this.order.push('pseudoElement');
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.selectors.push(
      `${selector1.stringify()} ${combinator} ${selector2.stringify()}`
    );
    return this;
  }

  stringify() {
    return this.selectors.join('');
  }

  validateOrder(type) {
    const order = [
      'element',
      'id',
      'class',
      'attr',
      'pseudoClass',
      'pseudoElement',
    ];
    const lastType = this.order[this.order.length - 1];
    if (lastType && order.indexOf(type) < order.indexOf(lastType)) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    if (this.order.filter((t) => t === type).length > 1) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than once inside the selector'
      );
    }
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelectorBuilder().element(value);
  },

  id(value) {
    return new CssSelectorBuilder().id(value);
  },

  class(value) {
    return new CssSelectorBuilder().class(value);
  },

  attr(value) {
    return new CssSelectorBuilder().attr(value);
  },

  pseudoClass(value) {
    return new CssSelectorBuilder().pseudoClass(value);
  },

  pseudoElement(value) {
    return new CssSelectorBuilder().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new CssSelectorBuilder().combine(selector1, combinator, selector2);
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
