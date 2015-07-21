define(function (require) {
  var angular = require('angular');
  var expect = require('expect.js');
  var _ = require('lodash');
  var ngMock = require('ngMock');

  // Load the kibana app dependencies.
  require('angular-route');
  require('plugins/kibana/discover/index');
  require('ui/filters/short_dots');

  var filter, config;

  var init = function (expandable) {
    // Load the application
    ngMock.module('kibana');

    // Create the scope
    ngMock.inject(function ($filter, _config_) {
      config = _config_;
      filter = $filter('shortDots');
    });
  };


  describe('shortDots filter', function () {

    beforeEach(function () {
      init();
    });

    it('should have a uriescape filter', function () {
      expect(filter).to.not.be(null);
    });

    it('should shorten foo.bar.baz to f.b.baz when shortDots:enable is true', function () {
      config.set('shortDots:enable', true);
      expect(filter('foo.bar.baz')).to.be('f.b.baz');
    });

    it('should not shorten when shortDots:enable is false', function () {
      config.set('shortDots:enable', false);
      expect(filter('foo.bar.baz')).to.be('foo.bar.baz');
    });

    it('should not shorten floating point numbers in any case', function () {
      config.set('shortDots:enable', false);
      expect(filter(12345.6789)).to.be(12345.6789);
      config.set('shortDots:enable', true);
      expect(filter(12345.6789)).to.be(12345.6789);
    });


  });

});
