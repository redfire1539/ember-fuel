Ember.Fuel.Crud.Mixin.Delete = Ember.Mixin.create({
  actions: {
    crudDelete: function(entity, name) {
    	function activateDelete(entity, status) {
    		if(status) {
    			this.send('crudDestroy', entity);
    		}
    	}

  	 var confirmCallback = this.get('crud.callbacks.confirm');
  	 if(confirmCallback && typeof(confirmCallback) === 'function')
  	   confirmCallback.bind(this)(entity, name, activateDelete);
    },

    crudDestroy: function(record) {
      if(record) {
      	Ember.debug('CRUD: Deleting record id "' + record.id + '" for model "' + this.get('crud.model') + '".');
        record.deleteRecord();
        record.save().then(
          this.crudSuccess.bind(this, 'delete', this.crudSuccessCallback),
          this.crudError.bind(this, 'delete')
        );
      }
    }
  }
});