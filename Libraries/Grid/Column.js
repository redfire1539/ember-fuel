Ember.Fuel.Grid.Column = Ember.Object.extend({
  property: null,

  header: function () {
    if (!this.get('property')) return '';
    return this.get('property').capitalize();
  }.property('property'),

  display: true,
  visible: function () {
    return this.get('display') !== false;
  }.property('display'),
  always: function () {
    return this.get('display') === 'always';
  }.property('display'),

  formatter: '{{view.content.%@}}',
  viewClass: function () {
    var formatter = this.get('formatter');
    if (Ember.Fuel.Grid.View.Cell.detect(formatter)) {
      return formatter;
    } else {
      Ember.assert('Formatter has to be extended CellView or Handlebar template', Ember.typeOf(formatter) === 'string');
      var property = this.get('property');
      if (!property) {
          property = 'constructor';
      }
      var template = this.get('formatter').fmt(property);
      return Ember.Fuel.Grid.View.Cell.extend({
          template: Ember.Handlebars.compile(template)
      });
    }
  }.property()
});

Ember.Fuel.Grid.column = function (property, options) {
    if (Ember.typeOf(property) === 'object') {
        options = property;
        property = null;
    }
    var column = Ember.Fuel.Grid.Column.create({
        property: property
    });
    if (options) {
        for (var key in options) {
            column.set(key, options[key]);
        }
    }
    return column;
};