define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/test.html',
], function (
  _,
  $,
  Backbone,
  TestTemplate
) {

  var TestView = Backbone.View.extend({
    tagName: 'section',
    className: 'test',
    events: {
      'click .test' : 'test',
    },
    initialize: function(options) {
      this.template = _.template(TestTemplate);
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON();));
      return this;
    },
    test: function () {
      console.log('Test fired in TestView.');
    }
  });

  return TestView;
});