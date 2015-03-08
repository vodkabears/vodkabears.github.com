import Block from './block';

/**
 * AnimationEnd event handler
 * @private
 */
function animationEndHandler() {
  if (!this.elem.classList.contains('shown')) {
    this.elem.style.display = 'none';
  }
}

/**
 * MouseOver event handler
 * @private
 */
function mouseOverHandler() {
  var notification = this;

  notification.elem.removeEventListener('mouseover', notification.mouseOverHandler, false);

  setTimeout(function() {
    notification.hide();
  }, 1000);
}

export default class Notification extends Block {

  /**
   * @param {HTMLElement} elem Node of a block
   */
  constructor(elem) {
    super(elem);

    this.mouseOverHandler = mouseOverHandler.bind(this);
    this.animationEndHandler = animationEndHandler.bind(this);

    this.elem.addEventListener('MSAnimationEnd', this.animationEndHandler, false);
    this.elem.addEventListener('oanimationend', this.animationEndHandler, false);
    this.elem.addEventListener('webkitAnimationEnd', this.animationEndHandler, false);
    this.elem.addEventListener('animationend', this.animationEndHandler, false);
  }

  /**
   * Shows a notification
   * @public
   * @param {String} content
   */
  show(content) {
    content && (this.elem.innerHTML = content);
    this.elem.style.display = 'block';
    this.elem.classList.add('shown');

    this.elem.addEventListener('mouseover', this.mouseOverHandler, false);
    this.elem.addEventListener('touchstart', this.mouseOverHandler, false);
  }

  /**
   * Hides a notification
   * @public
   */
  hide() {
    this.elem.classList.remove('shown');
  }

  /**
   * @public
   * @returns {String}
   */
  static get namespace() {
    return 'notification';
  }
}

Notification.createOnDOMLoad();
