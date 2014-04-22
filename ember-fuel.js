(function() {

var FuelVersion = "0.5.5-beta1";

window.Fuel = Ember.Fuel = Ember.Namespace.create({
	VERSION: FuelVersion,
});

Ember.libraries.registerCoreLibrary('Ember Fuel', Ember.Fuel.VERSION);


})();

(function() {

/* License Goes Here */

Ember.Crud = Ember.Fuel.Crud = Ember.Namespace.create({ Route: {} });

Ember.Fuel.Crud.DefaultConfig = Ember.Mixin.create({
	efcConfig: {
		model: null,
		returnRoute: 'index',
		callbacks: {
			success: function(calledAction) {
				console.log('Callback onSuccess!');
			},
			/* Return TRUE to transition to returnRoute */
			error: function(calledAction, errorType, errorResponse) {
				console.log('Callback onError!');
			},
			cancel: function(calledAction) {
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

Ember.Fuel.Crud.Mixin = Ember.Mixin.create({
	setupController: function(Controller, Model) {
		Controller.set('model', Model);
		Controller.set('efcConfig', this.get('efcConfig'));
		Controller.set('isEditingRecord', false);
	},

	efcGetModel: function(calledAction) {
		var Model = this.modelFor(this.routeName);

		if(Model) {
			return Model;
		} else {
				this.efcError.bind(this, calledAction, 'Could not get model for "' + this.routeName + '"');
			}
	},

	efcGetConfig: function(params) {
		return this.get('efcConfig.' + params);
	},

	efcCallCallback: function(callbackName, calledAction) {
		var Args = Array.prototype.slice.call(arguments);
		Args.shift();

		var CallBack = this.efcGetConfig('callbacks.' + callbackName);
		if(CallBack && typeof(CallBack) === 'function')
			return CallBack.apply(this, Args);
		else return true;
	},

	efcRouteReturn: function() {
		var CallBack = this.efcGetConfig('returnRoute');
		if(CallBack) this.transitionTo(CallBack);
			else this.transitionTo('index');
	},

	efcError: function(calledAction, errorMsg) {
		console.log('Error calling CRUD action "' + calledAction + '" with message: ' + errorMsg);

		var Result = this.efcCallCallback('error', calledAction, responseObj.status, JSON.parse(responseObj.responseText));
		if(Result) this.efcRouteReturn();
	},

	efcSuccess: function(calledAction) {
		console.log('Successfully called CRUD action ' + calledAction);

		this.efcCallCallback('success');
		if(calledAction !== 'delete')
			this.efcRouteReturn();
	},

	actions: {
		willTransition: function(Transition) {
      var Model = this.efcGetModel();

      if(Model.get('isDirty'))
        this.send('efcCancel');
    },

		efcCancel: function() {
			var Model = this.efcGetModel('cancel');

			var Result = this.efcCallCallback('confirmCancel');
			if(Result) {
				Model.rollback();
				this.efcCallCallback('cancel');
				this.efcRouteReturn();
			}
		},

		efcCopy: function() {
			throw "CRUD 'Copy' not implemented yet!";
		},

		efcDelete: function(Model) {
			var Result = this.efcCallCallback('confirmDelete');
			if(Result) {
				Model.destroyRecord().then(
					this.efcSuccess.bind(this, 'delete'),
					this.efcError.bind(this, 'delete')
				);
			}
		},

		efcPublish: function() {
			throw "CRUD 'Publish' not implemented yet!";
		},

		efcSave: function() {
			var Model = this.efcGetModel('save');

			Model.save().then(
				this.efcSuccess.bind(this, 'save'),
				this.efcError.bind(this, 'save')
			);
		},

		efcSoftDelete: function() {
			throw "CRUD 'Soft Delete' not implemented yet!";
		},

		efcUnpublish: function() {
			throw "CRUD 'Unpublish' not implemented yet!";
		}
	}
});


Ember.Fuel.Crud.Route.List = Ember.Route.extend(
	Ember.Fuel.Crud.Mixin,
	Ember.Fuel.Crud.DefaultConfig,
	{
		model: function() {
			var Model = this.efcGetConfig('model');
			if(Model) return this.store.find(Model);
				else return this._super();
		}
	}
);

Ember.Fuel.Crud.Route.New = Ember.Route.extend(
	Ember.Fuel.Crud.Mixin,
	Ember.Fuel.Crud.DefaultConfig,
	{
		model: function() {
			var Model = this.efcGetConfig('model');
			if(Model) return this.store.createRecord(Model);
				else return this._super();
		}
	}
);

Ember.Fuel.Crud.Route.Edit = Ember.Route.extend(
	Ember.Fuel.Crud.Mixin,
	Ember.Fuel.Crud.DefaultConfig,
	{
    setupController: function(Controller, Model) {
      this._super(Controller, Model);
      Controller.set('isEditingRecord', true);
    },
		model: function(params) {
			var Model = this.efcGetConfig('model');
			if(Model) return this.store.find(Model, params.id);
				else return this._super();
		}
	}
);

Ember.Fuel.Crud.Route.View = Ember.Route.extend(
	Ember.Fuel.Crud.Mixin,
	Ember.Fuel.Crud.DefaultConfig,
	{
		model: function(params) {
			var Model = this.efcGetConfig('model');
			if(Model) return this.store.find(Model, params.id);
				else return this._super();
		}
	}
);


})();

(function() {

window.FlashMessages = Ember.Fuel.FlashMessages = Ember.Namespace.create({
	VERSION: Ember.Fuel.VERSION,
	Mixin: {},
	Controller: {}
});

Ember.libraries.registerCoreLibrary(' - FlashMessages', Ember.Fuel.FlashMessages.VERSION);


})();

(function() {

Ember.Fuel.FlashMessages.Mixin.Route = Ember.Mixin.create({
  flashMessage: function(message) {
    var controller = this.controllerFor('flashMessage');

    controller.set('queuedMessage', message);

    return controller;
  }
});

})();

(function() {

Ember.Application.initializer({
  name: 'flashMessage',
  initialize: function(container, application) {
    container.register('controller:flashMessage', Ember.Fuel.FlashMessages.Controller);
  }
});

})();

(function() {

Ember.Fuel.FlashMessages.Controller = Ember.Controller.extend({
  queuedMessage: null,
  currentMessage: null,

  message: Ember.computed.alias('currentMessage'),

  now: function() {
    this.setProperties({
      queuedMessage: null,
      currentMessage: this.get('queuedMessage')
    });
  }
});

})();

(function() {

Ember.Handlebars.registerHelper('flashMessage', function(options) {
  var template   = options.fn;
  var container  = options.data.keywords.controller.container;
  var controller = container.lookup('controller:flashMessage');

  var parent = Ember.ContainerView.extend({
        hideAndShowMessage: function() {
          var currentMessage = this.get('controller.currentMessage');
          var view;

          if(currentMessage) view = Ember.View.create({ template: template });

          this.set('currentView', view);
        }.observes('controller.currentMessage')
      });

  options.hash.controller = controller;
  options.hashTypes = options.hashTypes || {};

  Ember.Handlebars.helpers.view.call(this, parent, options);
});

})();

(function() {

Ember.Route.reopen(Ember.Fuel.FlashMessages.Mixin.Route, {
  activate: function() {
    this._super.apply(this, arguments);

    var controller = this.controllerFor('flashMessage');
    var routeName  = this.get('routeName');

    if (routeName !== "loading") controller.now();
  }
});

})();

(function() {

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



})();