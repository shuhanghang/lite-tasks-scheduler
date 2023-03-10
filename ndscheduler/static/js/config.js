/**
 * Configurations / constants
 *
 */

define([], function() {

  'use strict';

  var urlPrefix = '/api/v1';

  return {
    'jobs_url': urlPrefix + '/jobs',
    'config_url': urlPrefix + '/config',
    'executions_url': urlPrefix + '/executions',
    'logs_url': urlPrefix + '/logs',
    'scheduler_url': urlPrefix + '/scheduler'
  };
});
