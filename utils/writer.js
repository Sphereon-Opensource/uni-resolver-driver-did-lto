const ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
};

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
};

exports.writeJson = function(response, input) {
  let payload = input.payload;
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  response.writeHead(input.code, {'Content-Type': 'application/json'});
  response.end(payload);
};
