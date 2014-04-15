Ember.Fuel.Crud.Mixin.Copy = Ember.Mixin.create({
  crudClone: function(oldObject) {
    var newObject = oldObject.toJSON();
    for (var key in newObject) {
      if (newObject[key] !== oldObject.get(key)) {
        newObject[key] = oldObject.get(key);
      }
    }
    newObject.id = null;
    return newObject;
  },
  actions: {
    crudCopy: function(action, model) {
    	Ember.debug('CRUD: Copying record id "' + model.id + '" for model "' + this.get('crud.model') + '".');
      var callback = this.crudCopyCallback ? this.crudCopyCallback : this.crudSuccessCallback;
      action = action ? action : 'copy';
      this.store.createRecord(
        this.get('crud.model'),
        this.crudClone(model)
      ).save().then(
        this.crudSuccess.bind(this, action, callback),
        this.crudError.bind(this, action)
      );
    }
  },
  crudCopyCallback: function() {
  }
});