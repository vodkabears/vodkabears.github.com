// For IE8
import $ from 'jquery';

/**
 * Instances of blocks
 * @private
 * @type {Object}
 */
var instances = {};

/**
 * Save instance of a block in a map
 * @private
 * @param {String} namespace Namespace of a block
 * @param {HTMLElement} block Node of a block
 * @param {Block} instance Instance of a block
 */
function addInstance(namespace, block, instance) {
  if (!instances[namespace]) {
    instances[namespace] = new Map();
  }

  instances[namespace].set(block, instance);
}

export default class Block {

  /**
   * @param {HTMLElement} block Node of a block
   */
  constructor(block) {
    this.block = block;
    this.namespace = this.constructor.namespace;

    this.block.classList.add(this.namespace);
    addInstance(this.namespace, this.block, this);
  }

  /**
   * Destroy a block
   * @public
   */
  destroy() {
    var map = instances[this.namespace];

    map.delete(this.block);
    map.size === 0 && delete instances[this.namespace];
  }

  /**
   * Returns an element of a block
   * @param {String} elemName
   * @returns {HTMLElement}
   */
  getElement(elemName) {
    return this.block.querySelector(`.${this.namespace}__${elemName}`);
  }

  /**
   * Returns a NodeList of elements of a block
   * @param {String|String[]} elemNames
   * @returns {NodeList}
   */
  getElements(elemNames) {
    var selectors = [];

    elemNames = Array.isArray(elemNames) ? elemNames : [elemNames];

    for (let i = 0, len = elemNames.length; i < len; i++) {
      selectors.push(`.${this.namespace}__${elemNames[i]}`);
    }

    return this.block.querySelectorAll(selectors.join(', '));
  }

  /**
   * Return all instances of a namespace
   * @public
   * @returns {Map} Map with instances
   */
  static getInstances() {
    return instances[this.namespace];
  }

  /**
   * Get instance of a block
   * @public
   * @returns {Block} Instance of a block
   */
  static getInstance(block) {
    var instances = this.getInstances();

    return instances && instances.get(block);
  }

  /**
   * Create blocks on DOMContentLoaded event
   * @public
   */
  static createOnDOMLoad() {
    var _this = this;

    $(document).ready(function() {
      let blocks = document.querySelectorAll(`.${_this.namespace}`);

      for (let i = 0, len = blocks.length; i < len; i++) {
        new _this(blocks[i]);
      }
    });
  }
}
