exports.writeJson = (response, input) => {
  let payload = input.payload;
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  response.writeHead(input.code, {'Content-Type': 'application/json'});
  response.end(payload);
};
