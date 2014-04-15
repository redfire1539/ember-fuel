Ember.Fuel.Crud.Mixin.Success = Ember.Mixin.create({
  crudSuccess: function(action, callback, result) {
  	Ember.debug('CRUD: Success!');
  	var successCallback = this.get('crud.callbacks.success');
  	if(successCallback && typeof(successCallback) === 'function')
  		successCallback.bind(this)(action, result);

    if (callback && typeof(callback) === 'function')
      callback.bind(this)(result);
  },
  crudSuccessCallback: function(result) {
    if(this.get('crud.routes.success')) {
      this.transitionTo(this.get('crud.routes.success'));
    }
  }
});