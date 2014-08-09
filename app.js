'use strict';

var config = require('config');
var spark = require('./lib/spark')(config);
var slack;
var hue;

if (config.slack.enabled) {
  slack = require('./lib/slack')(config);
}

if (config.hue.enabled) {
  require('./lib/hue')(config, function(err, result) {
    hue = result;
  });
}

spark.on('ocupado', function() {
  slack && slack.ocupado();
  hue && hue.ocupado();
});

spark.on('desocupado', function() {
  slack && slack.desocupado();
  hue && hue.desocupado();
});
