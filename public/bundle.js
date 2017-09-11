/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _navigator = __webpack_require__(1);

var _navigator2 = _interopRequireDefault(_navigator);

var _ajax = __webpack_require__(2);

var _ajax2 = _interopRequireDefault(_ajax);

var _serviceWorker = __webpack_require__(3);

var _serviceWorker2 = _interopRequireDefault(_serviceWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function entry() {
  var navigator = new _navigator2.default();
  var ajax = new _ajax2.default();
  var serviceWorker = new _serviceWorker2.default();

  if (navigator) {
    console.log('navigator created!');
  }

  if (ajax) {
    console.log('ajax created!');
  }

  if (serviceWorker) {
    console.log('serviceWorker created!');
  }
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigator = function () {
  function Navigator() {
    _classCallCheck(this, Navigator);

    this.nowModal = null;
    this.nowAddProduct = document.querySelector('#cpuDetails');
    this.init();
    console.log('=============================');
  }

  _createClass(Navigator, [{
    key: 'init',
    value: function init() {
      var _this = this;

      document.querySelector('.mdl-layout__drawer').addEventListener('click', function (e) {
        _this.navLogic(e);
      });

      setTimeout(function () {
        if (document.querySelector('.mdl-layout__obfuscator')) {
          document.querySelector('.mdl-layout__obfuscator').addEventListener('click', function () {
            _this.exitModal();
            _this.exitDim();
            _this.exitNav();
          });
        } else {
          console.log('dim is not loaded yet');
        }
      }, 120);

      document.querySelector('.selectPart').addEventListener('change', this.changeDetails.bind(this));
    }
  }, {
    key: 'changeDetails',
    value: function changeDetails() {
      var part = document.querySelector('.selectPart').value;

      var toShow = document.querySelector('#' + part + 'Details');
      if (toShow) {
        this.nowAddProduct.classList.remove('is-visible');
        this.nowAddProduct = toShow;
        this.nowAddProduct.classList.add('is-visible');
      }
    }
  }, {
    key: 'showModal',
    value: function showModal(name) {
      this.nowModal = document.querySelector('#' + name + 'Modal');
      this.nowModal.classList.add('is-visible');
    }
  }, {
    key: 'exitModal',
    value: function exitModal() {
      if (this.nowModal) {
        this.nowModal.classList.remove('is-visible');
        this.nowModal = null;
      }
    }
  }, {
    key: 'navLogic',
    value: function navLogic(e) {
      this.exitModal();
      this.showModal(e.target.id);
    }
  }], [{
    key: 'exitNav',
    value: function exitNav() {
      document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
    }
  }, {
    key: 'exitDim',
    value: function exitDim() {
      document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    }
  }]);

  return Navigator;
}();

exports.default = Navigator;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);

    this.init();
  }

  _createClass(Ajax, [{
    key: 'init',
    value: function init() {
      var _this = this;

      document.querySelector('#loginSubmit').addEventListener('click', function (e) {
        _this.login(e);
      });
    }
  }], [{
    key: 'login',
    value: function login(e) {
      e.preventDefault();
      var inputId = document.querySelector('#id').value;
      var inputPassword = document.querySelector('#password').value;

      var user = {
        id: inputId,
        password: inputPassword
      };

      console.log(user);

      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        document.querySelector('.mdl-layout__obfuscator').click();
      });
    }
  }]);

  return Ajax;
}();

exports.default = Ajax;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof importScripts === 'function') {
  importScripts('serviceworker-cache-polyfill.js');
  console.log('serviceworker imported!');
} else {
  console.log("can't import!");
}

var ServiceWorker = function () {
  function ServiceWorker() {
    _classCallCheck(this, ServiceWorker);
  }

  _createClass(ServiceWorker, [{
    key: 'init',
    value: function init() {
      // example usage:
      self.addEventListener('install', function (event) {
        event.waitUntil(caches.open('demo-cache').then(function (cache) {
          return cache.put('/', new Response('From the cache!'));
        }));
      });

      self.addEventListener('fetch', function (event) {
        event.respondWith(caches.match(event.request).then(function (response) {
          return response || new Response('Nothing in the cache for this request');
        }));
      });
    }
  }]);

  return ServiceWorker;
}();

exports.default = ServiceWorker;

/***/ })
/******/ ]);