(function() {
  // Setup Requirejs configuration
  requirejs.config({
    baseUrl: ABSPATH + "/javascripts",
    paths: {
      // Dependancies
      jquery:      "vendor/jquery.min",
      underscore:  "vendor/underscore",
      backbone:    "vendor/backbone",
      text:        "vendor/text", // allows async templates
      // Application
      modules:     "modules",
      // Backbone Application
      templates:   "../templates",
      routers:     "routers",
      models:      "models",
      views:       "views",
    }
  });

  // Require base dependancies
  require([
    'jquery',
    'modules/Project',
    'routers/MainRouter'
  ],
  function(
    $,
    Project,
    MainRouter,
  ) {

    $.ajaxSetup({
      statusCode: {
        401: function(err){
          console.log(err.responseJSON)
        },
        403: function(err) {
          console.log(err.responseJSON)
        }
      },
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="_csrf"]').getAttribute('content')
      }
    });

    // Fire up Project.
    window.Project = Project;
    Project.initialize();

  });

})();