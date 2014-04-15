Ember.Fuel.Grid.View.Header = Ember.Fuel.Grid.View.CollectionBase.extend({
  tagName: 'tr', //tr
  contentBinding: 'controller.visibleColumns',
  classNames: ['fuel-grid-header'],
  itemViewClass: Ember.View.extend({
    tagName: 'th', //th
    template: Ember.Handlebars.compile('{{view.content.header}}<span></span>'),
    templateName: 'fuel/grid/header-item',
    classNames: ['fuel-grid-header-item'],

    classNameBindings: ['sort'],
    sort: function () {
      if (this.get('controller.sortProperties.firstObject') == this.get('content.property')) {
        return this.get('controller.sortAscending') ? 'sort-asc' : 'sort-desc';
      }
    }.property('controller.sortProperties', 'controller.sortAscending'),

    click: function () {
      this.get('controller').sortBy(this.get('content.property'));
    }
  })
});