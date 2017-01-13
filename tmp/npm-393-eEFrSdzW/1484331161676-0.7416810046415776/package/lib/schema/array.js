/*!
 * Module dependencies.
 */

var SchemaType = require('../schematype');
var CastError = SchemaType.CastError;
var Types = {
  Boolean: require('./boolean'),
  Date: require('./date'),
  Number: require('./number'),
  String: require('./string'),
  ObjectId: require('./objectid'),
  Buffer: require('./buffer')
};
var MongooseArray = require('../types').Array;
var EmbeddedDoc = require('../types').Embedded;
var Mixed = require('./mixed');
var cast = require('../cast');
var util = require('util');
var utils = require('../utils');
var castToNumber = require('./operators/helpers').castToNumber;
var geospatial = require('./operators/geospatial');

/**
 * Array SchemaType constructor
 *
 * @param {String} key
 * @param {SchemaType} cast
 * @param {Object} options
 * @inherits SchemaType
 * @api public
 */

function SchemaArray(key, cast, options, schemaOptions) {
  var typeKey = 'type';
  if (schemaOptions && schemaOptions.typeKey) {
    typeKey = schemaOptions.typeKey;
  }

  if (cast) {
    var castOptions = {};

    if (utils.getFunctionName(cast.constructor) === 'Object') {
      if (cast[typeKey]) {
        // support { type: Woot }
        castOptions = utils.clone(cast); // do not alter user arguments
        delete castOptions[typeKey];
        cast = cast[typeKey];
      } else {
        cast = Mixed;
      }
    }

    // support { type: 'String' }
    var name = typeof cast === 'string'
        ? cast
        : utils.getFunctionName(cast);

    var caster = name in Types
        ? Types[name]
        : cast;

    this.casterConstructor = caster;
    if (typeof caster === 'function') {
      this.caster = new caster(null, castOptions);
    } else {
      this.caster = caster;
    }

    if (!(this.caster instanceof EmbeddedDoc)) {
      this.caster.path = key;
    }
  }

  SchemaType.call(this, key, options, 'Array');

  var defaultArr;
  var fn;

  if (this.defaultValue != null) {
    defaultArr = this.defaultValue;
    fn = typeof defaultArr === 'function';
  }

  if (!('defaultValue' in this) || this.defaultValue !== void 0) {
    this.default(function() {
      var arr = [];
      if (fn) {
        arr = defaultArr();
      } else if (defaultArr != null) {
        arr = defaultArr;
      }
      // Leave it up to `cast()` to convert the array
      return arr;
    });
  }
}

/**
 * This schema type's name, to defend against minifiers that mangle
 * function names.
 *
 * @api public
 */
SchemaArray.schemaName = 'Array';

/*!
 * Inherits from SchemaType.
 */
SchemaArray.prototype = Object.create(SchemaType.prototype);
SchemaArray.prototype.constructor = SchemaArray;

/**
 * Check if the given value satisfies a required validator. The given value
 * must be not null nor undefined, and have a non-zero length.
 *
 * @param {Any} value
 * @return {Boolean}
 * @api public
 */

SchemaArray.prototype.checkRequired = function(value) {
  return !!(value && value.length);
};

/**
 * Overrides the getters application for the population special-case
 *
 * @param {Object} value
 * @param {Object} scope
 * @api private
 */

SchemaArray.prototype.applyGetters = function(value, scope) {
  if (this.caster.options && this.caster.options.ref) {
    // means the object id was populated
    return value;
  }

  return SchemaType.prototype.applyGetters.call(this, value, scope);
};

/**
 * Casts values for set().
 *
 * @param {Object} value
 * @param {Document} doc document that triggers the casting
 * @param {Boolean} init whether this is an initialization cast
 * @api private
 */

SchemaArray.prototype.cast = function(value, doc, init) {
  if (Array.isArray(value)) {
    if (!value.length && doc) {
      var indexes = doc.schema.indexedPaths();

      for (var i = 0, l = indexes.length; i < l; ++i) {
        var pathIndex = indexes[i][0][this.path];
        if (pathIndex === '2dsphere' || pathIndex === '2d') {
          return;
        }
      }
    }

    if (!(value && value.isMongooseArray)) {
      value = new MongooseArray(value, this.path, doc);
    } else if (value && value.isMongooseArray) {
      // We need to create a new 