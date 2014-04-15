Ember.Fuel.Grid.Mixin.Paginated = Ember.Mixin.create({

  page: 0,
  limit: 20,

  paginableContentBinding: 'content',

  offset: Ember.computed(function () {
      return this.get('page') * this.get('limit');
  }).property('page', 'limit'),

  paginatedContent: Ember.computed(function () {
      if (this.get('page') >= this.get('pages')) {
          this.set('page', 0);
      }
      return this.get('paginableContent').slice(this.get('offset'), this.get('offset') + this.get('limit'));
  }).property('@each', 'page', 'limit', 'paginableContent'),

  pages: Ember.computed(function () {
      return Math.ceil(this.get('paginableContent.length') / this.get('limit'));
  }).property('paginableContent.length', 'limit'),

  firstPage: function () {
      this.set('page', 0);
  },

  previousPage: function () {
      this.set('page', Math.max( this.get('page') - 1, 0 ));
  },

  nextPage: function () {
      this.set('page', Math.min( this.get('page') + 1, this.get('pages') - 1 ));
  },

  lastPage: function () {
      this.set('page', this.get('pages') - 1);
  }

});