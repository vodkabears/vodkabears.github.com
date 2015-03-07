import Block from './block';

/**
 * Max height of a section
 * @private
 * @type {Number}
 */
const MAX_HEIGHT = 1440;

/**
 * Height of the client area
 * @private
 * @type {Number}
 */
var clientHeight = document.documentElement.clientHeight;

/**
 * Previous clientHeight
 * @private
 * @type {Number}
 */
var prevClientHeight = clientHeight;

/**
 * Height of sections
 * @private
 * @type {Number}
 */
var height = clientHeight > MAX_HEIGHT ? MAX_HEIGHT : clientHeight;

/**
 * Window resize event handler
 * @private
 */
function resizeHandler() {
  clientHeight = document.documentElement.clientHeight;

  if (clientHeight !== prevClientHeight) {
    prevClientHeight = clientHeight;
    height = clientHeight > MAX_HEIGHT ? MAX_HEIGHT : clientHeight;

    for (let element of FSSection.getInstances().keys()) {
      element.style.height = height + 'px';
    }
  }
}

export default class FSSection extends Block {

  /**
   * @param {HTMLElement} elem
   */
  constructor(elem) {
    super(elem);

    elem.style.height = height + 'px';
  }

  /**
   * @public
   * @returns {String}
   */
  static get namespace() {
    return 'fs-section';
  }
}

FSSection.createOnDOMLoad();
window.addEventListener('resize', resizeHandler, false);
