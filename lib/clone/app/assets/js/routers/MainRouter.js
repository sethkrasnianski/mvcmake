define([
  'underscore',
  'jquery',
  'backbone',
],
function(
  _,
  $,
  Backbone,
  Ui
) {

  var MainRouter = Backbone.Router.extend({
    routes: {
      "": "home",
    },
    home: function() {
      var self = this;

      console.log('home')
    }
  });

  return MainRouter;

});