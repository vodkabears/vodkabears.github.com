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
 * @param {HTMLElement} elem Node of a block
 * @param {Block} instance Instance of a block
 */
function addInstance(namespace, elem, instance) {
  if (!instances[namespace]) {
    instances[namespace] = new Map();
  }

  instances[namespace].set(elem, instance);
}

export default class Block {

  /**
   * @param {HTMLElement} elem Node of a block
   */
  constructor(elem) {
    this.elem = elem;
    this.namespace = this.constructor.namespace;

    this.elem.classList.add(this.namespace);
    addInstance(this.namespace, this.elem, this);
  }

  /**
   * Destroy a block
   * @public
   */
  destroy() {
    var map = instances[this.namespace];

    map.delete(this.elem);
    map.size === 0 && delete instances[this.namespace];
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
   * Get instance of an element
   * @public
   * @returns {Block} Instance of an element
   */
  static getInstance(elem) {
    var instances = this.getInstances();

    return instances && instances.get(elem);
  }

  /**
   * Create blocks on DOMContentLoaded event
   * @public
   */
  static createOnDOMLoad() {
    var Block = this;

    document.addEventListener('DOMContentLoaded', function Handler() {
      document.removeEventListener('DOMContentLoaded', Handler, false);

      var elements = document.querySelectorAll('.' + Block.namespace);

      for (let i = 0, len = elements.length; i < len; i++) {
        new Block(elements[i]);
      }
    }, false);
  }
}
