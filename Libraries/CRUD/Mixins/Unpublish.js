Ember.Fuel.Crud.Mixin.Unpublish = Ember.Mixin.create({
  actions: {
    crudUnpublish: function(model) {
    	Ember.debug('CRUD: Unpublishing record id "' + model.id + '" for model "' + this.get('crud.model') + '".');
      if (!model)
        model = this.get('controller.model');

      model.set('publish', false);
      model.save().then(
        this.crudSuccess.bind(this, 'crudUnpublish'),
        this.crudError.bind(this, 'crudUnpublish')
      );
    }
  }
});