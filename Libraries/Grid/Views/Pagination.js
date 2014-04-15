Ember.Fuel.Grid.View.Pagination = Ember.Fuel.Grid.View.ContainerBase.extend({
    tagName: 'td',
    classNames: ['text-right'],
    childViews: ['pageList'],
    pageList: function () {
        return Ember.Fuel.Grid.View.PageList.create();
    }.property()
});