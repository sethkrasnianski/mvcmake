define(
  [
    'underscore',
    'backbone',
    'models/TestModel',
    'collections/TestCollection',
    'views/TestView',
    'routers/MainRouter'
  ],
function(
  _,
  Backbone,
  TestModel,
  TestCollection,
  TestView,
  MainRouter
) {

  // Application Object
  var Project = {};

  // Routers
  Project.routers  = {
    main: new MainRouter,
  };

  // Rendered views
  Project.rendered = {};

  // Application API
  Project.api = {
    test: {
      model: TestModel,
      collection: new TestCollection,
      views: {
        test: TestView
      }
    }
  };

  // Initialize Application
  Project.initialize = function() {
    // Event Aggregator
    Project.vent = _.extend({}, Backbone.Events);
    // this.vent.trigger("event", params);

    Backbone.history.start({pushState: Modernizr.history});
  };

  return Project;

});