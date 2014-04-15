window.FlashMessages = Ember.Fuel.FlashMessages = Ember.Namespace.create({
	VERSION: Ember.Fuel.VERSION,
	Mixin: {},
	Controller: {}
});

Ember.libraries.registerCoreLibrary(' - FlashMessages', Ember.Fuel.FlashMessages.VERSION);

require('FlashMessages/Mixins/Route');

require('FlashMessages/Initializer');
require('FlashMessages/Controller');
require('FlashMessages/Helper');
require('FlashMessages/Router');