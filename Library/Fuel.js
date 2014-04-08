var FuelVersion = "1.0-beta1";

Ember.Fuel = { VERSION: FuelVersion };
Ember.libraries.registerCoreLibrary('Ember Fuel', Ember.Fuel.VERSION);

Ember.Fuel.Crud = { VERSION: FuelVersion };
Ember.libraries.registerCoreLibrary('Ember Fuel: CRUD', Ember.Fuel.Crud.VERSION);

Ember.Fuel.Flash = { VERSION: FuelVersion };
Ember.libraries.registerCoreLibrary('Ember Fuel: Flash', Ember.Fuel.Flash.VERSION);