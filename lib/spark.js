'use strict';

var chalk = require('chalk');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var EventSource = require('eventsource');

module.exports = function(config) {
  function Spark(config) {
    var self = this;

    this.apiEventsUrl = config.spark.apiBaseUrl + '/v1/devices/' + config.spark.deviceId + '/events?access_token=' + config.spark.apiToken;
    this.apiStateUrl = config.spark.apiBaseUrl + '/v1/devices/' + config.spark.deviceId + '/state?access_token=' + config.spark.apiToken;

    this.es = new EventSource(this.apiEventsUrl);

    this.es.onopen = function() {
      console.log(chalk.green('Spark connected successfully'));
    };

    this.es.onerror = function() {
      console.log(chalk.red('Error communicating with Spark'));
    };

    this.es.addEventListener('state', function(event) {
      var data = JSON.parse(event.data);
      var state = data.data;

      if (event.type === 'state') {
        console.log(state);
        self.emit(state);
      }
    }, false);
  };

  util.inherits(Spark, EventEmitter);

  return new Spark(config);
};
