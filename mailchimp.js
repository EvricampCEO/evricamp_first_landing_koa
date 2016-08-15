
var request = require('request');

module.exports = Api;

function tryParseJSON(data) {
  if (typeof data === "object") return data;
  var res = data;
  try { res = JSON.parse('' + data); } catch (err) {}
  finally { return res; }
}

//--------------------------------------------------------------------------------
function Api(apikey) {
  if (!(this instanceof Api)) return new Api(apikey);
  var usnum = apikey.match(/-(.*)$/)[1];
  this.baseUrl = `https://${usnum}.api.mailchimp.com/3.0`;
  this.apikey = apikey;
  this.auth = { 'user': '', 'pass': apikey };
  this.r = request.defaults({
    baseUrl: this.baseUrl, auth: this.auth
  });
}

Api.prototype.get = function(url) {
  return new Promise((resolve, reject) => {
    this.r.get(url, function(error, response, body) {
      if (error) return reject(error);
      resolve({ res: response, body: tryParseJSON(body) });
    });
  });
}

Api.prototype.post = function(url, data) {
  return new Promise((resolve, reject) => {
    this.r({
      url: url,
      method: "POST",
      headers: { "content-type": "application/json" },
      json: data
    }, function(error, response, body) {
      if (error) return reject(error);
      resolve({ res: response, body: tryParseJSON(body) });
    });
  });
};

Api.prototype.subscribe = function(list_id, obj) {
  var data = {
    email_address: obj.email,
    status: 'subscribed',
    merge_fields: {
      FNAME: obj.first_name
    }
  };
  return this.post(`/lists/${list_id}/members/`, data);
};
