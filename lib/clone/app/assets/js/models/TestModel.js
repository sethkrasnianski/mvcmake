define(['underscore', 'backbone'], function (_, Backbone) {

  var TestModel = Backbone.Model.extend({
    idAttribute: "_id",
    urlRoot: '/api/test',
  });

  return TestModel;
});