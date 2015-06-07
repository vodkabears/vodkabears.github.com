import Block from 'block';
import $ from 'jquery';
import 'remodal';

/**
 * Handles click event
 * @private
 * @listens click
 */
function handleClickEvent() {
  this._remodal.open();
}

export default class Intro extends Block {
  constructor(block) {
    super(block);

    /**
     * @private
     * @type {Remodal}
     */
    this._remodal = $('[data-remodal-id=modal]').remodal();

    /**
     * @private
     * @type {HTMLElement}
     */
    this._$logo = $(this.getElement('logo'));

    /**
     * @private
     * @type {Function}
     */
    this._handleClickEvent = handleClickEvent.bind(this);

    this._$logo.on('click', this._handleClickEvent);
  }

  /**
   * @override
   */
  destroy() {
    super.destroy();

    this._$logo.off('click', this._handleClickEvent);
  }
}

Intro.namespace = 'intro';
Intro.createOnDOMLoad();
