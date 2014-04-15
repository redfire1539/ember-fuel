Ember.Fuel.Grid.Filter = Ember.Fuel.Grid.View.Base.extend({
  tagName: 'form',
  classNames: ['form-search', 'btn-group', 'table-filter'],
  defaultTemplate: Ember.Handlebars.compile('{{view Ember.TextField class="search-query input-medium" placeholder="Type to filter" valueBinding="query"}}'),
  templateName: 'fuel/grid/filter'
});