Ember.Fuel.Grid.View.Body = Ember.Fuel.Grid.View.CollectionBase.extend({
  tagName: 'tbody', //tbody
  contentBinding: 'controller.rows',
  classNames: ['fuel-grid-body'],
  itemViewClass: 'Ember.Fuel.Grid.View.Row',
  emptyView: Ember.Fuel.Grid.View.Base.extend({
    tagName: 'tr', //tr
    defaultTemplate: Ember.Handlebars.compile(
    	'<td {{bindAttr colspan="controller.columns.length"}} class="muted">Nothing to display.</td>' //td
    ),
    templateName: 'fuel/grid/empty-list'
  })
});