Ember.Fuel.Crud.Route.Tree = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  Ember.Fuel.Crud.Mixin.Success,
  Ember.Fuel.Crud.Mixin.Error,
  Ember.Fuel.Crud.Mixin.Delete,
  {
    model: function() {
      if(this.get('crud.model')) {
        return this.store.find(this.get('crud.model'));
      } else {
        return this._super();
      }
    }
  }
);