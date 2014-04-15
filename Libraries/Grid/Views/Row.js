Ember.Fuel.Grid.View.Row = Ember.Fuel.Grid.View.ContainerBase.extend({
    tagName: 'tr', //tr
    classNames: ['fuel-grid-row'],
    rowBinding: 'content',
    columnsBinding: 'controller.visibleColumns',

    columnsDidChange: function () {
        if (this.get('columns')) {
            this.clear();
            this.get('columns').forEach(function (column) {
                var cell = column.get('viewClass').create({
                    column: column,
                    content: this.get('row')
                });
                this.pushObject(cell);
            }, this);
        }
    }.observes('columns.@each'),

    init: function () {
        this._super();
        this.columnsDidChange();
    }
});