import 'babelify/polyfill';
import 'wowjs';
import 'interdimensional';

var interdimensionalControl;

new WOW().init();
Interdimensional.charge();

document.addEventListener('interdimensional:charge', function interdimensionalChargeListener() {
  document.removeEventListener('interdimensional:charge', interdimensionalChargeListener, false);

  interdimensionalControl = document.querySelector('.interdimensional-control');
  interdimensionalControl.classList.add('pulsatory');
}, false);

document.addEventListener('interdimensional:jump', function interdimensionalJumpListener() {
  document.removeEventListener('interdimensional:jump', interdimensionalJumpListener, false);

  interdimensionalControl.classList.remove('pulsatory');
}, false);
