describe('flatten array', function () {
  it('should flatten an array', function () {
    var arr = [1, 2, [1, 2, [3, 4, 5, [1]]], 2, [2]],
        expected = [1, 1, 1, 2, 2, 2, 2, 3, 4, 5];

    arr = flatten(arr, 4);

    expect(arr).toEqual(expected);
  });
});

/*
 * Recursion in node is dangerous as it blocks the process for an unknown
 * amount of time, therefore maxDepth ensures too much nesting doesn't hang
 * the process. Switch to a defered async version if required.
 */
function flatten(elements, maxDepth) {
  var flattened = [];
  var depth = 0;

  function iterate(array) {
    // Change to for(var i = 0...) loop if bottleneck
    array.forEach(function (element) {
      if (Array.isArray(element) && depth !== maxDepth) return iterate(element);

      flattened.push(element);
    });

    depth++;
  }

  iterate(elements);

  return flattened.sort();
}
