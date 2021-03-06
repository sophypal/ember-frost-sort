import {expect} from 'chai'
import {sort} from 'ember-frost-sort'
import {beforeEach, describe, it} from 'mocha'

const items = [
  {name: 'c', value: 1},
  {name: 'a', value: 1},
  {name: 'b', value: 2}
]

describe('Unit / Utility / sort /', function () {
  describe('when no items are provided', function () {
    it('should assert that items must be an array', function (done) {
      try {
        sort()
      } catch (error) {
        expect(error.message).to.equal('Assertion Failed: items must be an array')
        done()
      }
    })
  })

  describe('when invalid items are provided', function () {
    it('should assert that items must be an array', function (done) {
      try {
        sort('foo')
      } catch (error) {
        expect(error.message).to.equal('Assertion Failed: items must be an array')
        done()
      }
    })
  })

  describe('when an invalid sort order is provided', function () {
    it('should assert that sort order must be an array', function (done) {
      try {
        sort([], 'foo')
      } catch (error) {
        expect(error.message).to.equal('Assertion Failed: sort order must be an array')
        done()
      }
    })
  })

  describe('when no sort order is provided', function () {
    let sortedItems

    beforeEach(function () {
      sortedItems = sort(items, [])
    })

    it('should return the items unsorted', function () {
      const actual = JSON.stringify(sortedItems)
      const expected = JSON.stringify([
        {name: 'c', value: 1},
        {name: 'a', value: 1},
        {name: 'b', value: 2}
      ])
      expect(actual).to.eql(expected)
    })
  })

  describe('when a sort order is provided', function () {
    let sortedItems

    beforeEach(function () {
      sortedItems = sort(items, ['name'])
    })

    it('should return the items sorted', function () {
      const actual = JSON.stringify(sortedItems)
      const expected = JSON.stringify([
        {name: 'a', value: 1},
        {name: 'b', value: 2},
        {name: 'c', value: 1}
      ])
      expect(actual).to.eql(expected)
    })
  })

  describe('when a descending sort order is provided', function () {
    let sortedItems

    beforeEach(function () {
      sortedItems = sort(items, ['-name'])
    })

    it('should return the items sorted in descending order', function () {
      const actual = JSON.stringify(sortedItems)
      const expected = JSON.stringify([
        {name: 'c', value: 1},
        {name: 'b', value: 2},
        {name: 'a', value: 1}
      ])
      expect(actual).to.eql(expected)
    })
  })

  describe('when multiple sort orders are provided', function () {
    let sortedItems

    beforeEach(function () {
      sortedItems = sort(items, ['value', '-name'])
    })

    it('should return the items sorted by each sort order in sequence', function () {
      const actual = JSON.stringify(sortedItems)
      const expected = JSON.stringify([
        {name: 'c', value: 1},
        {name: 'a', value: 1},
        {name: 'b', value: 2}
      ])
      expect(actual).to.eql(expected)
    })
  })
})
