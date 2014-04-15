Ember.Fuel.Crud.Mixin.Publish = Ember.Mixin.create({
  actions: {
    crudPublish: function(model) {
    	Ember.debug('CRUD: Publishing record id "' + model.id + '" for model "' + this.get('crud.model') + '".');
      if(!model)
        model = this.get('controller.model');

      model.set('publish', true);
      model.save().then(
        this.crudSuccess.bind(this, 'publish'),
        this.crudError.bind(this, 'publish')
      );
    }
  }
});