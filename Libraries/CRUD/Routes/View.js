Ember.Fuel.Crud.Route.View = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  {
    model: function(params) {
      if(this.get('crud.model')) {
        return this.store.find(this.get('crud.model'), params.id);
      } else {
        return this._super(params);
      }
    }
  }
);