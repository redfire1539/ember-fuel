var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'history'
});

Router.map(function() {
	this.route('new');
	this.route('edit', { path: 'edit/:id' });
	this.route('view', { path: 'view/:id' });
});

export default Router;
