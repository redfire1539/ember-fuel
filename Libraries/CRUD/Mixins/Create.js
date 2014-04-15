Ember.Fuel.Crud.Mixin.Create = Ember.Mixin.create({
  actions: {
    crudCreate: function() {
    	var model = this.get('controller.model');
    	Ember.debug('CRUD: Creating record id "' + model.id + '" for model "' + this.get('crud.model') + '".');
      model.save().then(
        this.crudSuccess.bind(this, 'create', this.crudSuccessCallback),
        this.crudError.bind(this, 'create')
      );
    }
  }
});