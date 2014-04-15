Ember.Fuel.Grid.ColumnSelector = Ember.Fuel.Grid.View.Base.extend({
    classNames: ['btn-group'],
    defaultTemplate: Ember.Handlebars.compile(
        '<button class="btn dropdown-toggle" data-toggle="dropdown"><i class="icon-th-list"></i> <span class="caret"></span></button>' +
        '<ul class="dropdown-menu dropdown-column-selector">' +
            '{{#each columns}}' +
                '<li><label class="checkbox">{{view Ember.Checkbox checkedBinding="display" disabledBinding="always"}} {{header}}</label></li>' +
            '{{/each}}' +
        '</ul>'),

    templateName: 'fuel/grid/column-selector'
});