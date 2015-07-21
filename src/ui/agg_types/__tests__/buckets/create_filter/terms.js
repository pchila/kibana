define(function (require) {
  describe('AggConfig Filters', function () {
    var expect = require('expect.js');
    var ngMock = require('ngMock');

    describe('terms', function () {
      var AggConfig;
      var indexPattern;
      var Vis;
      var createFilter;

      beforeEach(ngMock.module('kibana'));
      beforeEach(ngMock.inject(function (Private) {
        Vis = Private(require('ui/vis/vis'));
        AggConfig = Private(require('ui/vis/AggConfig'));
        indexPattern = Private(require('fixtures/stubbed_logstash_index_pattern'));
        createFilter = Private(require('ui/agg_types/buckets/create_filter/terms'));
      }));

      it('should return a match filter for terms', function () {
        var vis = new Vis(indexPattern, {
          type: 'histogram',
          aggs: [ { type: 'terms', schema: 'segment', params: { field: '_type' } } ]
        });
        var aggConfig = vis.aggs.byTypeName.terms[0];
        var filter = createFilter(aggConfig, 'apache');
        expect(filter).to.have.property('query');
        expect(filter.query).to.have.property('match');
        expect(filter.query.match).to.have.property('_type');
        expect(filter.query.match._type).to.have.property('query', 'apache');
        expect(filter.query.match._type).to.have.property('type', 'phrase');
        expect(filter).to.have.property('meta');
        expect(filter.meta).to.have.property('index', indexPattern.id);

      });

    });
  });
});
