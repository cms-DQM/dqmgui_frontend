webpackHotUpdate("static/development/pages/index.js",{

/***/ "./hooks/useRequest.tsx":
/*!******************************!*\
  !*** ./hooks/useRequest.tsx ***!
  \******************************/
/*! exports provided: useRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRequest", function() { return useRequest; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config/config */ "./config/config.ts");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




//for traching, which req. should be canceled
var useRequest = function useRequest(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var watchers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var should_we_fetch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(null),
      data = _useState[0],
      setData = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var cancelSource = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([]),
      errors = _useState3[0],
      setEerrors = _useState3[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (cancelSource) {
      var _cancelSource$current;

      (_cancelSource$current = cancelSource.current) === null || _cancelSource$current === void 0 ? void 0 : _cancelSource$current.cancel();
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var CancelToken = axios__WEBPACK_IMPORTED_MODULE_3___default.a.CancelToken;
    cancelSource.current = CancelToken.source();

    var fetchData = function fetchData() {
      var _cancelSource$current2, _cancelSource$current3, response, _data, _cancelSource$current4;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function fetchData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.prev = 1;
              setTimeout((_cancelSource$current2 = cancelSource.current) === null || _cancelSource$current2 === void 0 ? void 0 : _cancelSource$current2.cancel, 180000);
              _context.next = 5;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_3___default.a.request(_objectSpread({
                url: "".concat(_config_config__WEBPACK_IMPORTED_MODULE_4__["root_url"]).concat(url),
                method: options.method || 'get',
                cancelToken: (_cancelSource$current3 = cancelSource.current) === null || _cancelSource$current3 === void 0 ? void 0 : _cancelSource$current3.token
              }, options)));

            case 5:
              response = _context.sent;
              _data = response.data;
              setData(_data);
              setIsLoading(false);
              _context.next = 17;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);
              setIsLoading(false);
              setEerrors([_context.t0.toString()]);

              if (axios__WEBPACK_IMPORTED_MODULE_3___default.a.isCancel(_context.t0)) {
                setIsLoading(false);
                setEerrors(['Request Timeout']);
              }

              (_cancelSource$current4 = cancelSource.current) === null || _cancelSource$current4 === void 0 ? void 0 : _cancelSource$current4.cancel();

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 11]], Promise);
    };

    if (should_we_fetch) {
      fetchData();
    }
  }, watchers);
  return {
    data: data,
    isLoading: isLoading,
    errors: errors,
    cancelSource: cancelSource
  };
};

/***/ })

})
//# sourceMappingURL=index.js.9e713fc871a5d830405f.hot-update.js.map