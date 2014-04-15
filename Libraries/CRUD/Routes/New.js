Ember.Fuel.Crud.Route.New = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  Ember.Fuel.Crud.Mixin.Success,
  Ember.Fuel.Crud.Mixin.Error,
  Ember.Fuel.Crud.Mixin.Create,
  Ember.Fuel.Crud.Mixin.Cancel,
  {
    model: function(params) {
      if(this.get('crud.model')) {
        return this.store.createRecord(this.get('crud.model'));
      } else {
        return this._super();
      }
    },
    deactivate: function() {
      this.get('controller.model').rollback();
    }
  }
);