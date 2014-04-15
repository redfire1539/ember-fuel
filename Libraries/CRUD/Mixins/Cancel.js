Ember.Fuel.Crud.Mixin.Cancel = Ember.Mixin.create({
  actions: {
    crudCancel: function() {
    	Ember.debug('CRUD: Cancelling record modification.');
      this.get('controller.model').rollback();
      if(this.crudCancelCallback && typeof(this.crudCancelCallback) === 'function') {
        this.crudCancelCallback();
      } else if(this.crudSuccessCallback && typeof(this.crudSuccessCallback) === 'function') {
        this.crudSuccessCallback();
      }
    }
  }
});