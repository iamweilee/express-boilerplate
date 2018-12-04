exports.raw = function() {
  let args = process.argv.slice(2);
  return args;
};

exports.parsedWithEqual = function() {
  let seperator = '=';
  let args = exports.raw();
  let data = {};
  args.forEach(function(arg) {
    let arr = arg.split(seperator);
    if (arr && arr.length) {
      let argName = arr[0], argValue = arr[1];
      argName = argName.replace(/-/g, '');
      argValue = tryNumberic(argValue);
      data[argName] = argValue;
    }
  });
  return data;
};

exports.parsedWithBlank = function() {
  let args = exports.raw(), argLen = args.length;
  let data = {};
  for (let i = 0; i < argLen; i += 2) {
    let argName = args[i], argValue = args[i + 1];
    argName = argName.replace(/-/g, '');
    argValue = tryNumberic(argValue);
    data[argName] = argValue;
  }
  return data;
};

function tryNumberic(s) {
  let v = Number(s);
  return isNaN(v) ? s : v;
}