'use strict';

var chalk = require('chalk');
var Slack = require('node-slack');

module.exports = function(config) {
  Slack.prototype.greeting = function(callback) {
    slack.send({
      text: '_is now watching your baño_',
      channel: config.slack.channel,
      username: config.slack.username
    }, callback);
  };

  Slack.prototype.ocupado = function(callback) {
    slack.send({
      text: 'Ocupado :thumbsdown:',
      channel: config.slack.channel,
      username: config.slack.username
    }, callback);
  };

  Slack.prototype.desocupado = function(callback) {
    slack.send({
      text: 'Descupado :thumbsup:',
      channel: config.slack.channel,
      username: config.slack.username
    }, callback);
  };

  var slack = new Slack(config.slack.domain, config.slack.token);

  slack.greeting(function(err, body) {
    if (err) { throw new Error('Error communicating with Slack'); }
    console.log(chalk.green('Slack connected successfully'));
  });

  return slack;
};
