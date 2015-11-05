describe('clone object', function () {
  it('should clone an object', function () {
    var expected = {name: 'Ahmed', age: 27, skills: ['cycling', 'walking', 'eating']},
        obj = clone(expected);

    expect(obj).toEqual(expected);
    expect(obj).not.toBe(expected);
  });
});

/*
 * Crude cloning of an object, uses assign in ES6 compatible environments
 * Otherwise defaults to a simple Object enumerable properties copy
 * Does not support cyclic dependencies, use alternative such as
 * lodash/underscore deepClone
 */
function clone(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  // Check if ES6 compatible environment
  if (Object.assign) return Object.assign({}, obj);

  var cloned = Object(obj.constructor.prototype);

  for (var prop in obj) {
    var desc = Object.getOwnPropertyDescriptor(obj, prop);

    if (desc && desc.enumerable) cloned[prop] = obj[prop];
  }

  return cloned;

}
