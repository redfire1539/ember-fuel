Ember.Fuel.Crud.Mixin.Save = Ember.Mixin.create({
	setupController: function(controller, model) {
		this._super(controller, model);
		controller.set('isEditing', true);
	},
  actions: {
    crudSave: function() {
    	Ember.debug('CRUD: Saving Record.');
      this.get('controller.model').save().then(
        this.crudSuccess.bind(this, 'save', this.crudSuccessCallback),
        this.crudError.bind(this, 'save')
      );
    }
  }
});