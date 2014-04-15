Ember.Fuel.Grid.Controller.Table = Ember.ArrayController.extend(
	Ember.ControllerMixin,
	Ember.SortableMixin,
	Ember.Fuel.Grid.Mixin.Query,
	Ember.Fuel.Grid.Mixin.Paginated, {

  columns: [],

  paginableContentBinding: 'filteredContent',

  rowsBinding: 'paginatedContent',

  queryProperties: function () {
      if (!this.get('visibleColumns')) return [];
      return this.get('visibleColumns').mapProperty('property');
  }.property('visibleColumns'),

  visibleColumns: function () {
      return this.get('columns').filterProperty('visible', true);
  }.property('columns.@each.visible'),

  toolbar: [],

  sortBy: function (property) {
      var props = this.get('sortProperties');
      if (!props) {
          this.set('sortProperties', [property]);
          this.set('sortAscending', true);
      } else if (props.get('firstObject') == property) {
          this.set('sortAscending', !this.get('sortAscending'));
      } else {
          props = props.without(property);
          props.insertAt(0, property);
          this.set('sortProperties', props);
          this.set('sortAscending', true);
      }
  }

});