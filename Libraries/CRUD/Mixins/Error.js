Ember.Fuel.Crud.Mixin.Error = Ember.Mixin.create({
  crudError: function(action, callback, result) {
  	Ember.debug('CRUD: Error performing action "' + action + '" with result "' + result + '".');
  	var errorCallback = this.get('crud.callbacks.error');
  	if(errorCallback && typeof(errorCallback) === 'function')
  		errorCallback.bind(this)(action, result);

    if(callback && typeof(callback) === 'function')
      callback.bind(this)(result);
  }
});