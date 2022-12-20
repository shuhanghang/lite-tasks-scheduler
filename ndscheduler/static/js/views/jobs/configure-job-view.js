/**
 * configure-job view.
 *
 * @author wenbin@nextdoor.com
 */

require.config({
  paths: {
    'jquery': 'vendor/jquery',
    'underscore': 'vendor/underscore',
    'backbone': 'vendor/backbone',
    'bootstrap': 'vendor/bootstrap',

    'text': 'vendor/text',
    'configure-job-modal': 'templates/configure-job.html'
  },

  shim: {
    'bootstrap': {
      deps: ['jquery']
    },

    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

define(['text!configure-job-modal',
        'backbone',
        'bootstrap'], function(EditJobConfModalHtml) {
  'use strict';

  return Backbone.View.extend({
    initialize: function() {
      $('body').append(EditJobConfModalHtml);

      this.bindModalPopupEvent();
      this.bindEditJobConfConfirmClickEvent();
    },

    /**
     * Bind popup event for configure-job modal.
     */
    bindModalPopupEvent: function() {
      $('#configure-job-modal').on('show.bs.modal', _.bind(function(e) {
        var configButton = $(e.relatedTarget);
        var data_config_name = configButton.attr('data-config-name');
        this.collection.getConfig(data_config_name).then((data)=> {
          $('#job-config-content').text(data['msg']);
        })
        $('#job-name').text(configButton.attr('data-job-name'));
        $('#job-config-name').text(data_config_name);
        $('#configure-job-confirm-button').data('id', configButton.data('id'));
      }, this));
    },

    /**
     * Bind click event for configure-job-confirm button.
     */
     bindEditJobConfConfirmClickEvent: function() {
      var configureJobButton = $('#configure-job-confirm-button').off('click');
      configureJobButton.on('click', _.bind(function() {
        var jobConfigClassString = document.getElementById('job-config-name').innerText;
        var jobConfigContent = document.getElementById('job-config-content').value;
        this.collection.configureJob({'job_config_bind': jobConfigClassString, 'job_config_content':jobConfigContent});
        $('#configure-job-modal').modal('hide');
      }, this));
    }
  });
});
