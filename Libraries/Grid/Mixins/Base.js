Ember.Fuel.Grid.Mixin.Base = Ember.Mixin.create({
	classNames: ['ember-fuel', 'fuel-grid'],

  template: Ember.computed('templateName', function(key, value) {
    if (value !== undefined) { return value; }

    var templateName = Ember.get(this, 'templateName');
    var template = this.templateForName(templateName, 'template');

    return template || Ember.get(this, 'defaultTemplate');
  })
});