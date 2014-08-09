'use strict';

var chalk = require('chalk');
var async = require('async');
var nodeHueApi = require('node-hue-api');
var HueApi = nodeHueApi.HueApi;
var lightState = nodeHueApi.lightState;

module.exports = function(config, callback) {
  var bridge;
  var hueApi;
  var hue = {
    ocupado: function() {
      var state = lightState.create().rgb(255,0,0).brightness(100).on();
      hueApi.setGroupLightState(0, state);
    },

    desocupado: function() {
      var state = lightState.create().rgb(0,255,0).brightness(100).on();
      hueApi.setGroupLightState(0, state);
    }
  };

  async.series([
    function(callback) {
      nodeHueApi.locateBridges(function(err, bridges) {
        bridge = bridges[0];
        hueApi = new HueApi(bridge.ipaddress, config.hue.username);
        callback(err);
      });
    },
    function(callback) {
      // Attempt an API call using config username and register a user if needed
      hueApi.pressLinkButton(function(err) {
        if (err) {
          hueApi.registerUser(bridge.ipaddress, config.hue.username, config.hue.deviceType, function(err, user) {
            if (err && err.message.match(/link button not pressed/)) {
              console.log(chalk.yellow('You must press the link button on your Hue bridge prior to starting the app for the first time.'));
              process.exit();
            }
            // NOTE: The following line stores the username in config/runtime.json
            // This avoids the need to have the user manually update the
            // configuration.
            //
            // This functionality relies on a specific version (^0.4.x) of the
            // node config module which allows runtime modification of properties.
            // This funcionality has been removed in later versions.
            config.hue.username = hueApi.username = user;
            callback(err);
          });
        } else {
          callback(null);
        }
      });
    }
  ], function(err, results) {
    if (err) { throw new Error('Error communicating with Hue'); }
    console.log(chalk.green('Hue connected successfully'));
    callback && callback(null, hue);
  });
};
