// code from https://github.com/MortalFlesh/jasmine-data-provider/blob/master/src/index.js
function using(values, func) {
  if (values instanceof Function) {
    values = values();
    return;
  }

  if (values instanceof Array) {
    values.forEach(function(value) {
      if (!(value instanceof Array)) {
        value = [value];
      }

      func.apply(this, value);
    });
    return;
  }

  var objectKeys = Object.keys(values);

  objectKeys.forEach(function(key) {
    if (!(values[key] instanceof Array)) {
      values[key] = [values[key]];
    }

    values[key].push(key);

    func.apply(this, values[key]);
  });
}
