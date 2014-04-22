window.Bootstrap = Ember.Bootstrap = Ember.Fuel.Bootstrap = Ember.Namespace.create({});

Ember.Fuel.Bootstrap.AlertMessage = Ember.View.extend({
  classNames: ['alert', 'alert-message'],
  template: Ember.Handlebars.compile('<a class="close" rel="close" href="#">&times;</a>{{{view.message}}}'),
  message: null,
  removeAfter: null,

  didInsertElement: function() {
    var removeAfter = get(this, 'removeAfter');
    if (removeAfter > 0) {
      Ember.run.later(this, 'destroy', removeAfter);
    }
  },

  click: function(event) {
    var target = event.target,
        targetRel = target.getAttribute('rel');

    if (targetRel === 'close') {
      this.destroy();
      return false;
    }
  }
});

