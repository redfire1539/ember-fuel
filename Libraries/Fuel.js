var FuelVersion = "0.5.5-beta1";

window.Fuel = Ember.Fuel = Ember.Namespace.create({
	VERSION: FuelVersion,
});

Ember.libraries.registerCoreLibrary('Ember Fuel', Ember.Fuel.VERSION);

require('CRUD/Main');
require('FlashMessages/Main');
require('BootStrap/Main');