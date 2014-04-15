(function() {

var FuelVersion = "1.0-beta1";

window.Fuel = Ember.Fuel = Ember.Namespace.create({
	VERSION: FuelVersion,
});

Ember.libraries.registerCoreLibrary('Ember Fuel', Ember.Fuel.VERSION);


})();

(function() {

window.Crud = Ember.Fuel.Crud = Ember.Namespace.create({
	VERSION: Ember.Fuel.VERSION,
	Mixin: {},
	Route: {}
});

Ember.libraries.registerCoreLibrary(' - Crud', Ember.Fuel.Crud.VERSION);


})();

(function() {

Ember.Fuel.Crud.Mixin.Cancel = Ember.Mixin.create({
  actions: {
    crudCancel: function() {
    	Ember.debug('CRUD: Cancelling record modification.');
      this.get('controller.model').rollback();
      if(this.crudCancelCallback && typeof(this.crudCancelCallback) === 'function') {
        this.crudCancelCallback();
      } else if(this.crudSuccessCallback && typeof(this.crudSuccessCallback) === 'function') {
        this.crudSuccessCallback();
      }
    }
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Copy = Ember.Mixin.create({
  crudClone: function(oldObject) {
    var newObject = oldObject.toJSON();
    for (var key in newObject) {
      if (newObject[key] !== oldObject.get(key)) {
        newObject[key] = oldObject.get(key);
      }
    }
    newObject.id = null;
    return newObject;
  },
  actions: {
    crudCopy: function(action, model) {
    	Ember.debug('CRUD: Copying record id "' + model.id + '" for model "' + this.get('crud.model') + '".');
      var callback = this.crudCopyCallback ? this.crudCopyCallback : this.crudSuccessCallback;
      action = action ? action : 'copy';
      this.store.createRecord(
        this.get('crud.model'),
        this.crudClone(model)
      ).save().then(
        this.crudSuccess.bind(this, action, callback),
        this.crudError.bind(this, action)
      );
    }
  },
  crudCopyCallback: function() {
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Create = Ember.Mixin.create({
  actions: {
    crudCreate: function() {
    	var model = this.get('controller.model');
    	Ember.debug('CRUD: Creating record id "' + model.id + '" for model "' + this.get('crud.model') + '".');
      model.save().then(
        this.crudSuccess.bind(this, 'create', this.crudSuccessCallback),
        this.crudError.bind(this, 'create')
      );
    }
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Delete = Ember.Mixin.create({
  actions: {
    crudDelete: function(entity, name) {
    	function activateDelete(entity, status) {
    		if(status) {
    			this.send('crudDestroy', entity);
    		}
    	}

  	 var confirmCallback = this.get('crud.callbacks.confirm');
  	 if(confirmCallback && typeof(confirmCallback) === 'function')
  	   confirmCallback.bind(this)(entity, name, activateDelete);
    },

    crudDestroy: function(record) {
      if(record) {
      	Ember.debug('CRUD: Deleting record id "' + record.id + '" for model "' + this.get('crud.model') + '".');
        record.deleteRecord();
        record.save().then(
          this.crudSuccess.bind(this, 'delete', this.crudSuccessCallback),
          this.crudError.bind(this, 'delete')
        );
      }
    }
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Error = Ember.Mixin.create({
  crudError: function(action, callback, result) {
  	Ember.debug('CRUD: Error performing action "' + action + '" with result "' + result + '".');
  	var errorCallback = this.get('crud.callbacks.error');
  	if(errorCallback && typeof(errorCallback) === 'function')
  		errorCallback.bind(this)(action, result);

    if(callback && typeof(callback) === 'function')
      callback.bind(this)(result);
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Publish = Ember.Mixin.create({
  actions: {
    crudPublish: function(model) {
    	Ember.debug('CRUD: Publishing record id "' + model.id + '" for model "' + this.get('crud.model') + '".');
      if(!model)
        model = this.get('controller.model');

      model.set('publish', true);
      model.save().then(
        this.crudSuccess.bind(this, 'publish'),
        this.crudError.bind(this, 'publish')
      );
    }
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Save = Ember.Mixin.create({
	setupController: function(controller, model) {
		this._super(controller, model);
		controller.set('isEditing', true);
	},
  actions: {
    crudSave: function() {
    	Ember.debug('CRUD: Saving Record.');
      this.get('controller.model').save().then(
        this.crudSuccess.bind(this, 'save', this.crudSuccessCallback),
        this.crudError.bind(this, 'save')
      );
    }
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Setup = Ember.Mixin.create({
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('crud', this.get('crud'));
    controller.set('isEditing', false);
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Success = Ember.Mixin.create({
  crudSuccess: function(action, callback, result) {
  	Ember.debug('CRUD: Success!');
  	var successCallback = this.get('crud.callbacks.success');
  	if(successCallback && typeof(successCallback) === 'function')
  		successCallback.bind(this)(action, result);

    if (callback && typeof(callback) === 'function')
      callback.bind(this)(result);
  },
  crudSuccessCallback: function(result) {
    if(this.get('crud.routes.success')) {
      this.transitionTo(this.get('crud.routes.success'));
    }
  }
});

})();

(function() {

Ember.Fuel.Crud.Mixin.Unpublish = Ember.Mixin.create({
  actions: {
    crudUnpublish: function(model) {
    	Ember.debug('CRUD: Unpublishing record id "' + model.id + '" for model "' + this.get('crud.model') + '".');
      if (!model)
        model = this.get('controller.model');

      model.set('publish', false);
      model.save().then(
        this.crudSuccess.bind(this, 'crudUnpublish'),
        this.crudError.bind(this, 'crudUnpublish')
      );
    }
  }
});

})();

(function() {

Ember.Fuel.Crud.Route.Edit = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  Ember.Fuel.Crud.Mixin.Success,
  Ember.Fuel.Crud.Mixin.Error,
  Ember.Fuel.Crud.Mixin.Save,
  Ember.Fuel.Crud.Mixin.Cancel,
  Ember.Fuel.Crud.Mixin.Delete,
  {
    model: function(params) {
      if(this.get('crud.model')) {
        return this.store.find(this.get('crud.model'), params.id);
      } else {
        return this._super();
      }
    }
  }
);

})();

(function() {

Ember.Fuel.Crud.Route.List = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  Ember.Fuel.Crud.Mixin.Success,
  Ember.Fuel.Crud.Mixin.Error,
  Ember.Fuel.Crud.Mixin.Delete,
  {
    model: function() {
      if(this.get('crud.model')) {
        return this.store.find(this.get('crud.model'));
      } else {
        return this._super();
      }
    }
  }
);

})();

(function() {

Ember.Fuel.Crud.Route.New = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  Ember.Fuel.Crud.Mixin.Success,
  Ember.Fuel.Crud.Mixin.Error,
  Ember.Fuel.Crud.Mixin.Create,
  Ember.Fuel.Crud.Mixin.Cancel,
  {
    model: function(params) {
      if(this.get('crud.model')) {
        return this.store.createRecord(this.get('crud.model'));
      } else {
        return this._super();
      }
    },
    deactivate: function() {
      this.get('controller.model').rollback();
    }
  }
);

})();

(function() {

Ember.Fuel.Crud.Route.Related = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  Ember.Fuel.Crud.Mixin.Success,
  Ember.Fuel.Crud.Mixin.Error,
  {

  }
);

})();

(function() {

Ember.Fuel.Crud.Route.Tree = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  Ember.Fuel.Crud.Mixin.Success,
  Ember.Fuel.Crud.Mixin.Error,
  Ember.Fuel.Crud.Mixin.Delete,
  {
    model: function() {
      if(this.get('crud.model')) {
        return this.store.find(this.get('crud.model'));
      } else {
        return this._super();
      }
    }
  }
);

})();

(function() {

Ember.Fuel.Crud.Route.View = Ember.Route.extend(
  Ember.Fuel.Crud.Mixin.Setup,
  {
    model: function(params) {
      if(this.get('crud.model')) {
        return this.store.find(this.get('crud.model'), params.id);
      } else {
        return this._super(params);
      }
    }
  }
);

})();

(function() {

window.FlashMessages = Ember.Fuel.FlashMessages = Ember.Namespace.create({
	VERSION: Ember.Fuel.VERSION,
	Mixin: {},
	Controller: {}
});

Ember.libraries.registerCoreLibrary(' - FlashMessages', Ember.Fuel.FlashMessages.VERSION);


})();

(function() {

Ember.Fuel.FlashMessages.Mixin.Route = Ember.Mixin.create({
  flashMessage: function(message) {
    var controller = this.controllerFor('flashMessage');

    controller.set('queuedMessage', message);

    return controller;
  }
});

})();

(function() {

Ember.Application.initializer({
  name: 'flashMessage',
  initialize: function(container, application) {
    container.register('controller:flashMessage', Ember.Fuel.FlashMessages.Controller);
  }
});

})();

(function() {

Ember.Fuel.FlashMessages.Controller = Ember.Controller.extend({
  queuedMessage: null,
  currentMessage: null,

  message: Ember.computed.alias('currentMessage'),

  now: function() {
    this.setProperties({
      queuedMessage: null,
      currentMessage: this.get('queuedMessage')
    });
  }
});

})();

(function() {

Ember.Handlebars.registerHelper('flashMessage', function(options) {
  var template   = options.fn;
  var container  = options.data.keywords.controller.container;
  var controller = container.lookup('controller:flashMessage');

  var parent = Ember.ContainerView.extend({
        hideAndShowMessage: function() {
          var currentMessage = this.get('controller.currentMessage');
          var view;

          if(currentMessage) view = Ember.View.create({ template: template });

          this.set('currentView', view);
        }.observes('controller.currentMessage')
      });

  options.hash.controller = controller;
  options.hashTypes = options.hashTypes || {};

  Ember.Handlebars.helpers.view.call(this, parent, options);
});

})();

(function() {

Ember.Route.reopen(Ember.Fuel.FlashMessages.Mixin.Route, {
  activate: function() {
    this._super.apply(this, arguments);

    var controller = this.controllerFor('flashMessage');
    var routeName  = this.get('routeName');

    if (routeName !== "loading") controller.now();
  }
});

})();

(function() {

window.Grid = Ember.Fuel.Grid = Ember.Namespace.create({
	VERSION: Ember.Fuel.VERSION,
	Mixin: {},
	View: {},
	Controller: {},

	tableResponsive: true
});

Ember.libraries.registerCoreLibrary(' - Grid', Ember.Fuel.Grid.VERSION);


})();

(function() {

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

})();

(function() {

Ember.Fuel.Grid.Mixin.Base = Ember.Mixin.create({
	classNames: ['ember-fuel', 'fuel-grid'],

  template: Ember.computed('templateName', function(key, value) {
    if (value !== undefined) { return value; }

    var templateName = Ember.get(this, 'templateName');
    var template = this.templateForName(templateName, 'template');

    return template || Ember.get(this, 'defaultTemplate');
  })
});

})();

(function() {

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

})();

(function() {

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

})();

(function() {

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

})();

(function() {

Ember.Fuel.Grid.View.Base = Ember.View.extend(Ember.Fuel.Grid.Mixin.Base);
Ember.Fuel.Grid.View.ContainerBase = Ember.ContainerView.extend(Ember.Fuel.Grid.Mixin.Base);
Ember.Fuel.Grid.View.CollectionBase = Ember.CollectionView.extend(Ember.Fuel.Grid.Mixin.Base);


})();

(function() {

Ember.Fuel.Grid.View.Body = Ember.Fuel.Grid.View.CollectionBase.extend({
  tagName: 'tbody', //tbody
  contentBinding: 'controller.rows',
  classNames: ['fuel-grid-body'],
  itemViewClass: 'Ember.Fuel.Grid.View.Row',
  emptyView: Ember.Fuel.Grid.View.Base.extend({
    tagName: 'tr', //tr
    defaultTemplate: Ember.Handlebars.compile(
    	'<td {{bindAttr colspan="controller.columns.length"}} class="muted">Nothing to display.</td>' //td
    ),
    templateName: 'fuel/grid/empty-list'
  })
});

})();

(function() {

Ember.Fuel.Grid.View.Cell = Ember.Fuel.Grid.View.Base.extend({
  tagName: 'td', //td
  classNames: ['fuel-grid-cell']
});

})();

(function() {

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

})();

(function() {

Ember.Fuel.Grid.Filter = Ember.Fuel.Grid.View.Base.extend({
  tagName: 'form',
  classNames: ['form-search', 'btn-group', 'table-filter'],
  defaultTemplate: Ember.Handlebars.compile('{{view Ember.TextField class="search-query input-medium" placeholder="Type to filter" valueBinding="query"}}'),
  templateName: 'fuel/grid/filter'
});

})();

(function() {

Ember.Fuel.Grid.View.Footer = Ember.Fuel.Grid.View.Base.extend({
		tagName: 'tr',
    classNames: ['fuel-grid-footer'],
    defaultTemplate: Ember.Handlebars.compile('{{view Ember.Fuel.Grid.View.Page}}{{view Ember.Fuel.Grid.View.Pagination}}'),
    templateName: 'fuel/grid/footer'
});

})();

(function() {

Ember.Fuel.Grid.View.Grid = Ember.Fuel.Grid.View.Base.extend({
  tagName: 'div',
  classNames: [],
  template: Ember.Handlebars.compile('{{view Ember.Fuel.Grid.View.Toolbar}}{{view Ember.Fuel.Grid.View.InnerTable}}'),
  templateName: 'fuel/grid/grid'
});

})();

(function() {

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

})();

(function() {

Ember.Fuel.Grid.View.InnerTable = Ember.Fuel.Grid.View.Base.extend({
  tagName: 'table', //table
  classNames: ['table', 'fuel-grid-data'],
  defaultTemplate: Ember.Handlebars.compile('<thead>{{view Ember.Fuel.Grid.View.Header}}</thead><tfoot>{{view Ember.Fuel.Grid.View.Footer}}</tfoot>{{view Ember.Fuel.Grid.View.Body}}'), //<thead>{{view Ember.Fuel.Grid.View.Header}}</thead>
  templateName: 'fuel/grid/inner-table'
});

})();

(function() {

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


})();

(function() {

Ember.Fuel.Grid.View.PageList = Ember.Fuel.Grid.View.ContainerBase.extend({

    tagName: 'ul',
    classNames: ['pagination', 'pagination-sm'],

    firstPageView: Ember.View.extend({
        tagName: 'li',
        classNameBindings: ['parentView.hasFirstPage::disabled'],
        template: Ember.Handlebars.compile('<a href="#" {{action firstPage target="view.parentView"}}>&laquo;</a>')
    }),

    prevPageView: Ember.View.extend({
        tagName: 'li',
        classNameBindings: ['parentView.hasPrevPage::disabled'],
        template: Ember.Handlebars.compile('<a href="#" {{action prevPage target="view.parentView"}}>&lsaquo;</a>')
    }),

    pageView: Ember.View.extend({
        tagName: 'li',
        classNameBindings: ['content.isActive:active'],
        template: Ember.Handlebars.compile('<a href="#" {{action setPage view.content target="view.parentView"}}>{{view.content.page}}</a>')
    }),

    nextPageView: Ember.View.extend({
        tagName: 'li',
        classNameBindings: ['parentView.hasNextPage::disabled'],
        template: Ember.Handlebars.compile('<a href="#" {{action nextPage target="view.parentView"}}>&rsaquo;</a>')
    }),

    lastPageView: Ember.View.extend({
        tagName: 'li',
        classNameBindings: ['parentView.hasLastPage::disabled'],
        template: Ember.Handlebars.compile('<a href="#" {{action lastPage target="view.parentView"}}>&raquo;</a>')
    }),

    init: function () {
        this._super();
        this.refreshPageListItems();
    },

    refreshPageListItems: function () {
        var pages = this.get('pages');
        if (!pages.get('length'))
            return;

        this.clear();
        this.pushObject(this.get('firstPageView').create());
        this.pushObject(this.get('prevPageView').create());
        var self = this;
        this.get('pages').forEach(function (page) {
            var pageView = self.get('pageView').create({
                content: page
            });
            self.pushObject(pageView);
        });
        this.pushObject(this.get('nextPageView').create());
        this.pushObject(this.get('lastPageView').create());
    }.observes('pages'),

    pages: [],

    visiblePages: 3,

    createPages: function () {
        if (!this.get('controller')) return [];

        var page = this.get('controller.page');
        var pages = this.get('controller.pages') || [];
        var pagesFrom = Math.max(0, page - this.visiblePages);
        var pagesTo = Math.min(pages, page + this.visiblePages + 1);
        var limit = this.get('controller.limit');
console.log(pages);
        //var pages = []; //Already defined above
        for (var i = pagesFrom; i < pagesTo; i++) {
            pages.push({
                index: i,
                page: i + 1,
                isActive: (i == page)
            });
        }
        this.set('pages', pages);
    },

    didControllerContentChanged: function () {
        this.createPages();
        var pages = this.get('controller.pages');
        var page = this.get('controller.page');
        this.set('pagesCount', pages);
        this.set('hasNextPage', page + 1 < pages);
        this.set('hasPrevPage', page > 0);
        this.set('hasFirstPage', page > 0);
        this.set('hasLastPage', page + 1 < pages);
    }.observes('controller', 'controller.pages', 'controller.page'),

    setPage: function (context) {
        this.get('controller').set('page', context.index);
    },

    firstPage: function () {
        if (!this.get('hasFirstPage'))
            return;

        this.get('controller').firstPage();
    },

    lastPage: function () {
        if (!this.get('hasLastPage'))
            return;

        this.get('controller').lastPage();
    },

    prevPage: function () {
        if (!this.get('hasPrevPage'))
            return;

        this.get('controller').previousPage();
    },

    nextPage: function () {
        if (!this.get('hasNextPage'))
            return;

        this.get('controller').nextPage();
    }
});

})();

(function() {

Ember.Fuel.Grid.View.Pagination = Ember.Fuel.Grid.View.ContainerBase.extend({
    tagName: 'td',
    classNames: ['text-right'],
    childViews: ['pageList'],
    pageList: function () {
        return Ember.Fuel.Grid.View.PageList.create();
    }.property()
});

})();

(function() {

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

})();

(function() {

Ember.Fuel.Grid.View.Table = Ember.View.extend({
  classNames: [],
  //defaultTemplate: Ember.Handlebars.compile('{{view Ember.Fuel.Grid.View.Toolbar}}{{view Ember.Fuel.Grid.View.InnerTable}}{{view Ember.Fuel.Grid.View.Footer}}')
});

})();

(function() {

Ember.Fuel.Grid.View.Toolbar = Ember.Fuel.Grid.View.ContainerBase.extend({
  classNames: ['table-toolbar'],
  classNameBindings: ['childViews.length::hide'],
  childViewsBinding: 'controller.toolbar'
});

})();