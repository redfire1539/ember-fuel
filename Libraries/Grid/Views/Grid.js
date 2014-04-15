Ember.Fuel.Grid.View.Grid = Ember.Fuel.Grid.View.Base.extend({
  tagName: 'div',
  classNames: [],
  template: Ember.Handlebars.compile('{{view Ember.Fuel.Grid.View.Toolbar}}{{view Ember.Fuel.Grid.View.InnerTable}}'),
  templateName: 'fuel/grid/grid'
});