import Navigator from './javascripts/navigator';
import Ajax from './javascripts/ajax';
import ServiceWorker from './javascripts/service-worker';

(function entry() {
  const navigator = new Navigator();
  const ajax = new Ajax();
  const serviceWorker = new ServiceWorker();

  if (navigator) {
    console.log('navigator created!');
  }

  if (ajax) {
    console.log('ajax created!');
  }

  if (serviceWorker) {
    console.log('serviceWorker created!');
  }
}());
