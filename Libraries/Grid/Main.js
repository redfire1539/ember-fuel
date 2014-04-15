window.Grid = Ember.Fuel.Grid = Ember.Namespace.create({
	VERSION: Ember.Fuel.VERSION,
	Mixin: {},
	View: {},
	Controller: {},

	tableResponsive: true
});

Ember.libraries.registerCoreLibrary(' - Grid', Ember.Fuel.Grid.VERSION);

require('Grid/Column');

require('Grid/Mixins/Base');
require('Grid/Mixins/Query');
require('Grid/Mixins/Paginated');

require('Grid/Controllers/Table');

require('Grid/Views/Base');
require('Grid/Views/Body');
require('Grid/Views/Cell');
require('Grid/Views/ColumnSelector');
require('Grid/Views/Filter');
require('Grid/Views/Footer');
require('Grid/Views/Grid');
require('Grid/Views/Header');
require('Grid/Views/InnerTable');
require('Grid/Views/Page');
require('Grid/Views/PageList');
require('Grid/Views/Pagination');
require('Grid/Views/Row');
require('Grid/Views/Table');
require('Grid/Views/Toolbar');