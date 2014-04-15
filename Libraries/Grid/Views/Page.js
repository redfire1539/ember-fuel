Ember.Fuel.Grid.View.Page = Ember.Fuel.Grid.View.Base.extend({
    tagName: 'td',
    classNames: ['text-left'],
    defaultTemplate: Ember.Handlebars.compile('Showing {{view.first}} - {{view.last}} from {{filteredContent.length}}'),
    templateName: 'fuel/grid/page',

    didPageChanged: function () {
        var page = this.get('controller.page');
        var limit = this.get('controller.limit');
        var length = this.get('controller.filteredContent.length');
        this.set('first', page * limit + 1);
        this.set('last', Math.min( length, page * limit + limit ));
    }.observes('controller.page', 'controller.filteredContent.length')
});
