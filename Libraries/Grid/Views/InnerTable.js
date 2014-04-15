Ember.Fuel.Grid.View.InnerTable = Ember.Fuel.Grid.View.Base.extend({
  tagName: 'table', //table
  classNames: ['table', 'fuel-grid-data'],
  defaultTemplate: Ember.Handlebars.compile('<thead>{{view Ember.Fuel.Grid.View.Header}}</thead><tfoot>{{view Ember.Fuel.Grid.View.Footer}}</tfoot>{{view Ember.Fuel.Grid.View.Body}}'), //<thead>{{view Ember.Fuel.Grid.View.Header}}</thead>
  templateName: 'fuel/grid/inner-table'
});