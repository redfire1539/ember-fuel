window.Bootstrap = Ember.Bootstrap = Ember.Fuel.Bootstrap = Ember.Namespace.create({ View: {} });

Ember.Fuel.Bootstrap.Icon = Ember.Component.extend({
	tagName: 'span',
	classNames: ['glyphicon'],
	classNameBindings: ['iconName'],

	icon: null,

	iconName: function() {
		return 'glyphicon-' + this.get('icon');
	}.property('icon')

});

Ember.Handlebars.helper('bs-icon', Ember.Fuel.Bootstrap.Icon);
