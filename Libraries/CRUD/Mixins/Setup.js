Ember.Fuel.Crud.Mixin.Setup = Ember.Mixin.create({
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('crud', this.get('crud'));
    controller.set('isEditing', false);
  }
});