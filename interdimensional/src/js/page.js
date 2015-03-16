import 'babelify/polyfill';
import 'es5-shim';
import 'dom4';
import 'wowjs';
import 'interdimensional';
import Notification from './notification';

var interdimensionalControl;

document.addEventListener('DOMContentLoaded', function() {
  new WOW({
    mobile: false,
    live: false
  }).init();
  Interdimensional.charge({
    PPD: 1,
    insensitivity: 3
  });
}, false);

document.addEventListener('interdimensional:charge', function interdimensionalChargeListener() {
  document.removeEventListener('interdimensional:charge', interdimensionalChargeListener, false);

  interdimensionalControl = document.querySelector('.interdimensional-control');
  interdimensionalControl.classList.add('pulsatory');
}, false);

document.addEventListener('interdimensional:fail', function interdimensionalFailListener() {
  document.removeEventListener('interdimensional:fail', interdimensionalFailListener, false);

  var notification = Notification.getInstance(document.getElementById('notification'));

  setTimeout(function() {
    notification.show('Use mobile or tablet with a gyroscope to test a spatial scrolling.');
  }, 1000);

  setTimeout(function() {
    notification.hide();
  }, 9000);
}, false);

document.addEventListener('interdimensional:jump', function interdimensionalJumpListener() {
  document.removeEventListener('interdimensional:jump', interdimensionalJumpListener, false);

  interdimensionalControl.classList.remove('pulsatory');
}, false);
