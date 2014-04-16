# Ember-Fuel CRUD

The Ember-Fuel CRUD (EFC) library is a set of base Routes to help you implement CRUD (Create, Read, Update, Delete) functionality in your Ember app.

## Getting Started

The [Ember-Fuel CRUD Guide](https://github.com/redfire1539/ember-fuel/wiki/Guide) has examples of how to use EFC.

## Dependencies

* [ember](https://github.com/emberjs/ember.js)
* [ember-data](https://github.com/emberjs/data)

## Configuration

* Add one of `dist/ember-fuel-crud*.js` files to your app
* Extend from base routes
* Configure `efcConfig` variable in your routes

### Example Route

    export default Ember.Crud.Route.List.extend({
      efcConfig: {
        model: 'post',
        returnRoute: 'index',
        callbacks: {
          success: function() {
            console.log('Callback onSuccess!');
          },
          error: function() {
            console.log('Callback onError!');
          },
          cancel: function() {
            console.log('Callback onCancel!');
          },
          confirmDelete: function() {
            console.log('Callback onConfirmDelete! (Returning TRUE)');
            return true;
          },
          confirmCancel: function() {
            console.log('Callback onConfirmCancel! (Returning TRUE)');
            return true;
          }
        }
      }
    });

## What's Included

### Base Routes

Base routes you can extend from. All routes are namespaced to `Ember.Crud.Route`.

Handles retrieval of model and includes default actions listed below:

* [List]()
* [View]()
* [New]()
* [Edit]()