Ember.Fuel.Grid.View.Footer = Ember.Fuel.Grid.View.Base.extend({
		tagName: 'tr',
    classNames: ['fuel-grid-footer'],
    defaultTemplate: Ember.Handlebars.compile('{{view Ember.Fuel.Grid.View.Page}}{{view Ember.Fuel.Grid.View.Pagination}}'),
    templateName: 'fuel/grid/footer'
});