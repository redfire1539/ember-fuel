Original Code from https://github.com/ryandjurovich/ember-crud

Original License: MIT

# Ember CRUD

The Ember CRUD library includes base Routes and various mixins to help you implement CRUD (Create, Read, Update, Delete) functionality in your Ember app.

## Getting Started

The [Ember CRUD Guide](http://www.ryandjurovich.com/ember-crud/guide/) is a great way to get started using Ember CRUD.

## Dependencies

* [ember](https://github.com/emberjs/ember.js)
* [ember-data](https://github.com/emberjs/data)
* [ember-i18n](https://github.com/jamesarosen/ember-i18n)
* [bootbox](http://bootboxjs.com/)
* [noty](http://ned.im/noty/)

## Configuration

* Add one of `dist/ember-crud*.js` to your app
* Add [ember-i18n](https://github.com/jamesarosen/ember-i18n) translations file
* Extend from base routes and/or include mixins
* Configure `crud` variable in your routes

### Example Translations

    Ember.I18n.translations = {
      'crud': {
        'titles': {
          'new': 'New {{model}}',
          'edit': 'Edit {{model}}',
        },
        'create': {
          'button': 'Add',
          'success': '{{model}} created successfully.',
          'error': 'Error creating {{model}}.',
        },
        'save': {
          'button': 'Save Changes',
          'success': '{{model}} saved successfully.',
          'error': 'Error saving {{model}}.',
        },
        'delete': {
          'button': 'Delete',
          'confirm': 'Are you sure you want to delete {{model}} \'{{record}}\'?',
          'success': '{{model}} deleted successfully.',
          'error': 'Error deleting {{model}}.',
        },
        'draft': {
          'button': 'Create Draft & Save',
          'success': 'Draft created for {{model}} successfully.',
          'error': 'Error creating draft for {{model}}.',
        },
        'publish': {
          'button': 'Save & Publish',
          'success': '{{model}} published successfully.',
          'error': 'Error publishing {{model}}.',
        },
        'restore': {
          'button': 'Restore',
          'success': '{{model}} restored successfully.',
          'error': 'Error restoring {{model}}.',
        },
        'cancel': {
          'button': 'Cancel',
        },
      }
    }

### Example Route

    import BaseRoute from "ember-crud/routes/edit";

    export default BaseRoute.extend({
        crud: {
          model:      'post',
          name: {
            singular: 'Post',
            plural:   'Posts',
          },
          routes: {
            index:    'posts.index',
            new:      'posts.new',
          },
        }
    });

## What's Included

### Action Mixins

Actions you can include in your routes:

* [setup](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/setup.js)
* [create](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/create.js)
* [save](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/save.js)
* [copy](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/copy.js)
* [publish](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/publish.js)
* [unpublish](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/unpublish.js)
* [delete](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/delete.js)
* [cancel](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/cancel.js)
* [success](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/success.js)
* [error](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/error.js)

### Base Routes

Base routes you can extend from.

Handles retrieval of model and includes default actions listed below:

* [list](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/list.js)
    * setup
    * delete
    * success
    * error
* [tree](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/tree.js)
    * setup
    * delete
    * success
    * error
* [view](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/view.js)
    * setup
* [new](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/new.js)
    * setup
    * create
    * cancel
    * success
    * error
* [edit](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/edit.js)
    * setup
    * save
    * cancel
    * delete
    * success
    * error
* [related](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/related.js)
    * setup
    * success
    * error

### Controller Mixins

Mixins for your controllers:

* [pagination](https://github.com/ryandjurovich/ember-crud/blob/master/lib/controllers/mixins/pagination.js)
* [form](https://github.com/ryandjurovich/ember-crud/blob/master/lib/controllers/mixins/form.js)