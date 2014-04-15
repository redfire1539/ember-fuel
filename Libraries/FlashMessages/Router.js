Ember.Route.reopen(Ember.Fuel.FlashMessages.Mixin.Route, {
  activate: function() {
    this._super.apply(this, arguments);

    var controller = this.controllerFor('flashMessage');
    var routeName  = this.get('routeName');

    if (routeName !== "loading") controller.now();
  }
});