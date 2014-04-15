Ember.Fuel.Grid.Mixin.Query = Ember.Mixin.create({
  query: '',

  queryProperties: [],

  filterableContentBinding: 'content',

  filteredContent: function () {
      var query = this.get('query');
      if (!query) return this;
      var qProps = this.get('queryProperties');
      return this.get('filterableContent').filter(function (row, index) {
          var props = row.getProperties(qProps);
          for (var prop in props) {
              if (props[prop] && props[prop].toString().indexOf(query) >= 0) {
                  return true;
              }
          }
          return false;
      });
  }.property('query', 'queryProperties', 'filterableContent')
});