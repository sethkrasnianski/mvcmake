define(['underscore', 'backbone', 'models/TestModel'], function (_, Backbone, TestModel) {

  var TestCollection = Backbone.Collection.extend({
    model: TestModel,
    url: '/api/test',
  });

  return TestCollection;
});