webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/browsing/lumesectionBroweser.tsx":
/*!*****************************************************!*\
  !*** ./components/browsing/lumesectionBroweser.tsx ***!
  \*****************************************************/
/*! exports provided: LumesectionBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LumesectionBrowser", function() { return LumesectionBrowser; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _hooks_useRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useRequest */ "./hooks/useRequest.tsx");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./config/config.ts");
/* harmony import */ var _hooks_useChangeRouter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useChangeRouter */ "./hooks/useChangeRouter.tsx");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
var _this = undefined,
    _jsxFileName = "/mnt/c/Users/ernes/Desktop/test/dqmgui_frontend/components/browsing/lumesectionBroweser.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];






var Option = antd__WEBPACK_IMPORTED_MODULE_1__["Select"].Option;
var LumesectionBrowser = function LumesectionBrowser(_ref) {
  var color = _ref.color,
      currentLumisection = _ref.currentLumisection,
      handler = _ref.handler,
      currentRunNumber = _ref.currentRunNumber,
      currentDataset = _ref.currentDataset;

  //getting all run lumisections 
  var _useRequest = Object(_hooks_useRequest__WEBPACK_IMPORTED_MODULE_2__["useRequest"])(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["getLumisections"])({
    run_number: currentRunNumber,
    dataset_name: currentDataset,
    lumi: -1
  }), {}, [currentRunNumber, currentDataset]),
      data = _useRequest.data,
      isLoading = _useRequest.isLoading,
      errors = _useRequest.errors;

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])();
  var query = router.query;
  var all_runs_with_lumi = data ? data.data : []; //extracting just lumisections from data object

  var lumisections = all_runs_with_lumi.length > 0 ? all_runs_with_lumi.map(function (run) {
    return {
      label: run.lumi.toString(),
      value: run.lumi
    };
  }) : []; //-1 - it represents ALL lumisections. If none lumisection is selected, then plots which are displaid 
  //consist of ALL lumisections. 
  //*TO DO** change -1 to ALL

  lumisections.unshift({
    label: 'All',
    value: -1
  }); //if lumisection is not setted to url, we set lumisection to -1

  var lumisectionsValues = lumisections.map(function (lumi) {
    return lumi.value;
  });
  Object(_hooks_useChangeRouter__WEBPACK_IMPORTED_MODULE_4__["useChangeRouter"])({
    lumi: lumisectionsValues[0]
  }, [], !query.lumi);
  var currentLumiIndex = lumisectionsValues.indexOf(currentLumisection);
  console.log(lumisections);
  return __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 5
    }
  });
};

/***/ })

})
//# sourceMappingURL=index.js.7a56d3bc9700a77dbf71.hot-update.js.map