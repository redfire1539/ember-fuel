Ember.Fuel.Grid.View.Cell = Ember.Fuel.Grid.View.Base.extend({
  tagName: 'td', //td
  classNames: ['fuel-grid-cell'],
  defaultTemplate: Ember.Handlebars.compile('{{output}}::Cell'),
  templateName: 'fuel/grid/cell',
});