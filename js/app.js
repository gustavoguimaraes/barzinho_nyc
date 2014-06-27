var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

//Need to research on location
App.Router.reopen({
  location: 'history'
});
App.Router.reopen({
  location: 'hash'
});

App.Router.map(function() {
  this.route('about');

  this.resource('menus', function() {
    this.resource('menu', { path: '/:menu_id' });
  });
});

// Index
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('menu');
  }
});


// menus
App.MenusRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('menu');
  }
});
App.MenusIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('menus');
  }
});

//controllers
App.MenusController = Ember.ArrayController.extend({
  sortProperties: ['title']
});

App.MenusIndexController = Ember.ArrayController.extend({
  menuCount: function() {
    return this.get('length');
  }.property('length')
});

App.MenuReviewsNewController = Ember.ObjectController.extend({
  reviewText: '',
  actions: {
    createReview: function() {
      var menu = this.get('model'),
          review = this.store.createRecord('review', {review: this.get('reviewText')});
      menu.get('reviews').addObject(review);
    }
  }
});

// Handlebars
Ember.Handlebars.registerBoundHelper('money', function(value) {
  return accounting.formatMoney(value/100);
});


// Data
App.ApplicationAdapter = DS.FixtureAdapter.extend();
//App.ApplicationAdapter = DS.RESTAdapter.extend();
var attr = DS.attr;
App.Menu = DS.Model.extend({
  title: DS.attr(),
  price: DS.attr(),
  description: DS.attr(),
  image: DS.attr(),
  reviews: DS.hasMany('review', {async: true})
});

App.Menu.FIXTURES = [
  {
    id: 1,
    title: 'Frango à Passarinho',
    price: 800,
    description: 'Brazilian fried chicken with garlic and fresh parsley',
    image: 'images/menus/frango.jpg',
  },
  {
    id: 2,
    title: 'Mandioca Frita Com Queijo',
    price: 900,
    description: 'Yucca sticks with parmesan cheese',
    image: 'images/menus/mandiocafrita.jpg',
  },
  {
    id: 3,
    title: 'Camarão ao Alho e Óleo',
    price: 1100,
    description: 'shrimp sauteed with garlic and extra virgin olive oil',
    image: 'images/menus/camarao.jpg',
  },
  {
    id: 4,
    title: 'Linguiça Calabresa com Cebola',
    price: 800,
    description: 'Brazilian pork and sausage with sauteed onions',
    image: 'images/menus/calabresa.jpg',
  },
  {
    id: 5,
    title: 'Porção de Coxinhas',
    price: 900,
    description: 'Brazilian chicken croquette',
    image: 'images/menus/coxinha.jpg'
  },
  {
    id: 6,
    title: 'Cestinha de Pão de Queijo',
    price: 700,
    description: 'little basket of farm cheese bread',
    image: 'images/menus/paodequeijo.jpg'
  }
];

App.Review = DS.Model.extend({
  review: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  menu: DS.belongsTo('menu')
});
