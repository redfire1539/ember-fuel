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