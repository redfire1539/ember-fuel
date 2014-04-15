var FuelVersion = "1.0-beta1";

window.Fuel = Ember.Fuel = Ember.Namespace.create({
	VERSION: FuelVersion,
});

Ember.libraries.registerCoreLibrary('Ember Fuel', Ember.Fuel.VERSION);

require('CRUD/Main');
require('FlashMessages/Main');
require('Grid/Main');