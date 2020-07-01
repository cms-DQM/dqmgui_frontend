webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/plots/zoomedPlots/zoomedPlots/index.tsx":
/*!************************************************************!*\
  !*** ./components/plots/zoomedPlots/zoomedPlots/index.tsx ***!
  \************************************************************/
/*! exports provided: ZoomedPlots */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomedPlots", function() { return ZoomedPlots; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zoomedPlot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zoomedPlot */ "./components/plots/zoomedPlots/zoomedPlots/zoomedPlot.tsx");
/* harmony import */ var _zoomedJSROOTPlot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zoomedJSROOTPlot */ "./components/plots/zoomedPlots/zoomedPlots/zoomedJSROOTPlot.tsx");
/* harmony import */ var _styledComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../styledComponents */ "./components/styledComponents.ts");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _contexts_rightSideContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../contexts/rightSideContext */ "./contexts/rightSideContext.tsx");
/* harmony import */ var _plot_singlePlot_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../plot/singlePlot/utils */ "./components/plots/plot/singlePlot/utils.ts");
var _this = undefined,
    _jsxFileName = "/mnt/c/Users/ernes/Desktop/test/dqmgui_frontend/components/plots/zoomedPlots/zoomedPlots/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







var ZoomedPlots = function ZoomedPlots(_ref) {
  var selected_plots = _ref.selected_plots;
  var globalState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_contexts_rightSideContext__WEBPACK_IMPORTED_MODULE_5__["store"]);
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  var query = router.query;
  return __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_3__["ZoomedPlotsWrapper"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, selected_plots.map(function (selected_plot) {
    var params_for_api = Object(_plot_singlePlot_utils__WEBPACK_IMPORTED_MODULE_6__["FormatParamsForAPI"])(globalState, query, selected_plot.name, selected_plot.path);
    console.log(params_for_api, query);

    if (globalState.JSROOTmode) {
      return __jsx(_zoomedJSROOTPlot__WEBPACK_IMPORTED_MODULE_2__["ZoomedJSROOTPlot"], {
        selected_plot: selected_plot,
        params_for_api: params_for_api,
        key: selected_plot.name,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 13
        }
      });
    }

    return __jsx(_zoomedPlot__WEBPACK_IMPORTED_MODULE_1__["ZoomedPlot"], {
      selected_plot: selected_plot,
      params_for_api: params_for_api,
      key: selected_plot.name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 11
      }
    });
  }));
};

/***/ })

})
//# sourceMappingURL=index.js.f16730a5923b3691878a.hot-update.js.map