Ember.Fuel.Grid.View.Toolbar = Ember.Fuel.Grid.View.ContainerBase.extend({
  classNames: ['table-toolbar'],
  classNameBindings: ['childViews.length::hide'],
  childViewsBinding: 'controller.toolbar'
});