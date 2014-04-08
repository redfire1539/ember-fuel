Ember.Handlebars.registerHelper('flashMessage', function(options) {
  var template   = options.fn;
  var container  = options.data.keywords.controller.container;
  var controller = container.lookup('controller:flashMessage');

  var parent = Ember.ContainerView.extend({
        hideAndShowMessage: function() {
          var currentMessage = this.get('controller.currentMessage');
          var view;

          if(currentMessage) view = Ember.View.create({ template: template });

          this.set('currentView', view);
        }.observes('controller.currentMessage')
      });

  options.hash.controller = controller;
  options.hashTypes = options.hashTypes || {};

  Ember.Handlebars.helpers.view.call(this, parent, options);
});