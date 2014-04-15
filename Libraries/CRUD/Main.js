window.Crud = Ember.Fuel.Crud = Ember.Namespace.create({
	VERSION: Ember.Fuel.VERSION,
	Mixin: {},
	Route: {}
});

Ember.libraries.registerCoreLibrary(' - Crud', Ember.Fuel.Crud.VERSION);

require('CRUD/Mixins/Cancel');
require('CRUD/Mixins/Copy');
require('CRUD/Mixins/Create');
require('CRUD/Mixins/Delete');
require('CRUD/Mixins/Error');
require('CRUD/Mixins/Publish');
require('CRUD/Mixins/Save');
require('CRUD/Mixins/Setup');
require('CRUD/Mixins/Success');
require('CRUD/Mixins/Unpublish');

require('CRUD/Routes/Edit');
require('CRUD/Routes/List');
require('CRUD/Routes/New');
require('CRUD/Routes/Related');
require('CRUD/Routes/Tree');
require('CRUD/Routes/View');