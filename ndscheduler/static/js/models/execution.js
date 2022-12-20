/**
 * Execution model
 */

require.config({
  paths: {
    'jquery': 'vendor/jquery',
    'underscore': 'vendor/underscore',
    'backbone': 'vendor/backbone',
    'moment': 'vendor/moment',

    'config': 'config'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

define(['config',
        'backbone',
        'vendor/moment-timezone-with-data'], function(config, backbone, moment) {
  'use strict';

  return Backbone.Model.extend({

    /**
     * Returns the html string for job name of this execution.
     *
     * @return {string} html string for job name of this execution.
     */
    getNameHTMLString: function() {
      var executionId = this.get('execution_id');

      var jobName = '';
      try {
        jobName = this.get('job')['name'];
      } catch (e) {
        jobName = '<span class="failed-color">Unknown Job</span>';
      }

      var jobLink = '';
      try {
        var jobId = this.get('job')['job_id'];
        jobLink = '<a href="/#jobs/' + jobId + '">' + jobName + '</a>';
      } catch (e) {
        jobLink = jobName;
      }

      return '<a href="/#executions/' + executionId +
          '"><i class="fa-solid fa-bars-progress"></i></a> ' + jobLink;
    },

    /**
     * Returns the html string for this execution's status.
     *
     * @return {string} html string for execution status.
     */
    getStatusHTMLString: function() {
      var state = this.get('state');
      var style = 'scheduled-color';
      if (state === 'scheduled error') {
        style = 'scheduled-error-color';
      } else if (state === 'running') {
        style = 'running-color';
      } else if (state === 'succeeded') {
        style = 'success-color';
      } else if (state === 'failed') {
        style = 'failed-color';
      }
      return '<span class="' + style + '">' + state + '</span>';
    },

    /**
     * Returns the scheduled time string.
     *
     * @return {string} scheduled time string.
     */
    getScheduledAtString: function() {
      return moment(this.get('scheduled_time')).local().format(
          'YYYY-MM-DD HH:mm:ss');
    },

    /**
     * Returns the finished time string.
     *
     * @return {string} finished time string.
     */
    getFinishedAtString: function() {
      return moment(this.get('updated_time')).local().format(
          'YYYY-MM-DD HH:mm:ss');
    },

    /**
     * Returns html string for execution description.
     *
     * @return {string} html string for taskworker information.
     */
    getDescription: function() {
        return this.get('description');
    },

    /**
     * Returns html string for execution result.
     * 
     * @return {string} html string for execution result.
     */
    getResult: function() {
      var result = this.get('result');
      try{
      var resultObj = JSON.parse(result)
      var resultStr = JSON.stringify(resultObj,null,2)
      }catch(e){
        var resultStr = result
      }
      if(result === 'null'){
        return '';
      }

      var style;
      var state = this.get('state');
      if(state === 'scheduled error'){
        style = 'red';
      }else if(state === 'failed'){
        style = 'red';
      }else if(state === 'succeeded'){
        style = '';
      }else{
        return '';
      }
      return ('<span><a href="#" data-content="' +
          encodeURI(resultStr) +
          '" data-action="show-result"><i class="fa-regular fa-file-lines lg"' + ' style="color: ' +
          style + 
          '"></i></a></span>');
    }
  });
});
