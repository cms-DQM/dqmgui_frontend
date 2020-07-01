webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/plots/zoomedPlots/zoomedOverlayPlots/index.tsx":
/*!*******************************************************************!*\
  !*** ./components/plots/zoomedPlots/zoomedOverlayPlots/index.tsx ***!
  \*******************************************************************/
/*! exports provided: ZoomedPlots */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomedPlots", function() { return ZoomedPlots; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zoomedOverlaidPlot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zoomedOverlaidPlot */ "./components/plots/zoomedPlots/zoomedOverlayPlots/zoomedOverlaidPlot.tsx");
/* harmony import */ var _zoomedOverlaidJSROOTPlot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zoomedOverlaidJSROOTPlot */ "./components/plots/zoomedPlots/zoomedOverlayPlots/zoomedOverlaidJSROOTPlot.tsx");
/* harmony import */ var _styledComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../styledComponents */ "./components/styledComponents.ts");
/* harmony import */ var _plot_singlePlot_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../plot/singlePlot/utils */ "./components/plots/plot/singlePlot/utils.ts");
/* harmony import */ var _contexts_rightSideContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../contexts/rightSideContext */ "./contexts/rightSideContext.tsx");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
var _this = undefined,
    _jsxFileName = "/mnt/c/Users/ernes/Desktop/test/dqmgui_frontend/components/plots/zoomedPlots/zoomedOverlayPlots/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







var ZoomedPlots = function ZoomedPlots(_ref) {
  var selected_plots = _ref.selected_plots;
  var globalState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_contexts_rightSideContext__WEBPACK_IMPORTED_MODULE_5__["store"]);
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_6__["useRouter"])();
  var query = router.query;
  return __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_3__["ZoomedPlotsWrapper"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, selected_plots.map(function (selected_plot) {
    var params_for_api = Object(_plot_singlePlot_utils__WEBPACK_IMPORTED_MODULE_4__["FormatParamsForAPI"])(globalState, query, selected_plot.name, selected_plot.path);
    console.log(params_for_api);

    if (globalState.JSROOTmode) {
      return __jsx(_zoomedOverlaidJSROOTPlot__WEBPACK_IMPORTED_MODULE_2__["ZoomedOverlaidJSROOTPlot"], {
        selected_plot: selected_plot,
        params_for_api: params_for_api,
        key: selected_plot.name,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 13
        }
      });
    }

    return __jsx(_zoomedOverlaidPlot__WEBPACK_IMPORTED_MODULE_1__["ZoomedOverlaidPlot"], {
      selected_plot: selected_plot,
      params_for_api: params_for_api,
      key: selected_plot.name,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 11
      }
    });
  }));
};

/***/ })

})
//# sourceMappingURL=index.js.f544885a4e62055be402.hot-update.js.map