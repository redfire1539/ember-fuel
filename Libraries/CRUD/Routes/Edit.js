Ember.Fuel.Crud.Route.Edit = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  Ember.Fuel.Crud.Mixin.Success,
  Ember.Fuel.Crud.Mixin.Error,
  Ember.Fuel.Crud.Mixin.Save,
  Ember.Fuel.Crud.Mixin.Cancel,
  Ember.Fuel.Crud.Mixin.Delete,
  {
    model: function(params) {
      if(this.get('crud.model')) {
        return this.store.find(this.get('crud.model'), params.id);
      } else {
        return this._super();
      }
    }
  }
);