webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/plots/zoomedPlots/zoomedOverlayPlots/zoomedOverlaidJSROOTPlot.tsx":
/*!**************************************************************************************!*\
  !*** ./components/plots/zoomedPlots/zoomedOverlayPlots/zoomedOverlaidJSROOTPlot.tsx ***!
  \**************************************************************************************/
/*! exports provided: ZoomedOverlaidJSROOTPlot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomedOverlaidJSROOTPlot", function() { return ZoomedOverlaidJSROOTPlot; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clean_deep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clean-deep */ "./node_modules/clean-deep/src/index.js");
/* harmony import */ var clean_deep__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clean_deep__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../config/config */ "./config/config.ts");
/* harmony import */ var _hooks_useRequest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../hooks/useRequest */ "./hooks/useRequest.tsx");
/* harmony import */ var _containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../containers/display/styledComponents */ "./containers/display/styledComponents.tsx");
/* harmony import */ var _plot_singlePlot_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../plot/singlePlot/utils */ "./components/plots/plot/singlePlot/utils.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");



var _this = undefined,
    _jsxFileName = "/mnt/c/Users/ernes/Desktop/test/dqmgui_frontend/components/plots/zoomedPlots/zoomedOverlayPlots/zoomedOverlaidJSROOTPlot.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }











var drawJSROOT = function drawJSROOT(histogramParam, plot_name) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.async(function drawJSROOT$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(JSROOT.cleanup("".concat(histogramParam, "_").concat(plot_name)));

        case 2:
          //@ts-ignore
          JSROOT.redraw("".concat(histogramParam, "_").concat(plot_name), //@ts-ignore
          JSROOT.parse(JSON.stringify(overlaidJSROOTPlot)), "".concat(histogramParam));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

var ZoomedOverlaidJSROOTPlot = function ZoomedOverlaidJSROOTPlot(_ref) {
  var selected_plot = _ref.selected_plot,
      params_for_api = _ref.params_for_api;
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  var query = router.query;

  var _useRequest = Object(_hooks_useRequest__WEBPACK_IMPORTED_MODULE_6__["useRequest"])(Object(_config_config__WEBPACK_IMPORTED_MODULE_5__["get_jroot_plot"])(params_for_api), {}, [selected_plot.name]),
      data = _useRequest.data;

  var overlaid_plots_runs_and_datasets = (params_for_api === null || params_for_api === void 0 ? void 0 : params_for_api.overlay_plot) ? params_for_api.overlay_plot.map(function (plot) {
    var copy = _objectSpread({}, params_for_api);

    if (plot.dataset_name) {
      copy.dataset_name = plot.dataset_name;
    }

    copy.run_number = plot.run_number;

    var _useRequest2 = Object(_hooks_useRequest__WEBPACK_IMPORTED_MODULE_6__["useRequest"])(Object(_config_config__WEBPACK_IMPORTED_MODULE_5__["get_jroot_plot"])(copy), {}, [selected_plot.name, query.lumi]),
        data = _useRequest2.data;

    return data;
  }) : [];
  overlaid_plots_runs_and_datasets.push(data);
  var overlaidJSROOTPlot = {}; //checking how many histograms are overlaid, because just separated objects
  // (i.e separate variables ) to JSROOT.CreateTHStack() func

  if (overlaid_plots_runs_and_datasets.length === 0) {
    return null;
  } else if (overlaid_plots_runs_and_datasets.length === 1) {
    var histogram1 = overlaid_plots_runs_and_datasets[0]; //@ts-ignore

    overlaidJSROOTPlot = JSROOT.CreateTHStack(histogram1);
  } else if (overlaid_plots_runs_and_datasets.length === 2) {
    var _histogram = overlaid_plots_runs_and_datasets[0];
    var histogram2 = overlaid_plots_runs_and_datasets[1]; //@ts-ignore

    overlaidJSROOTPlot = JSROOT.CreateTHStack(_histogram, histogram2);
  } else if (overlaid_plots_runs_and_datasets.length === 3) {
    var _histogram2 = overlaid_plots_runs_and_datasets[0];
    var _histogram3 = overlaid_plots_runs_and_datasets[1];
    var histogram3 = overlaid_plots_runs_and_datasets[2]; //@ts-ignore

    overlaidJSROOTPlot = JSROOT.CreateTHStack(_histogram2, _histogram3, histogram3);
  } else if (overlaid_plots_runs_and_datasets.length === 4) {
    var _histogram4 = overlaid_plots_runs_and_datasets[0];
    var _histogram5 = overlaid_plots_runs_and_datasets[1];
    var _histogram6 = overlaid_plots_runs_and_datasets[2];
    var histogram4 = overlaid_plots_runs_and_datasets[3]; //@ts-ignore

    overlaidJSROOTPlot = JSROOT.CreateTHStack(_histogram4, _histogram5, _histogram6, histogram4);
  }

  var histogramParam = params_for_api.normalize ? 'hist' : 'nostack'; //make sure that no null histograms are passed to draw func.
  //on first, second reneder overlaidJSROOTPlot.fHists.arr is [null, null]
  //@ts-ignore

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (clean_deep__WEBPACK_IMPORTED_MODULE_3___default()(overlaidJSROOTPlot.fHists.arr).length === overlaidJSROOTPlot.fHists.arr.length) {
      drawJSROOT(histogramParam, selected_plot.name);
    }
  });
  return __jsx(_containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_7__["StyledCol"], {
    space: 2,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 5
    }
  }, __jsx(_containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_7__["StyledPlotRow"], {
    minheight: params_for_api.height,
    width: params_for_api.width,
    is_plot_selected: true.toString(),
    nopointer: true.toString() // report={selected_plot.properties.report}
    ,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 7
    }
  }, __jsx(_containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_7__["PlotNameCol"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 9
    }
  }, selected_plot.displayedName), __jsx(_containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_7__["Column"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_9__["Button"], {
    type: "link",
    onClick: function onClick() {
      return Object(_plot_singlePlot_utils__WEBPACK_IMPORTED_MODULE_8__["removePlotFromRightSide"])(query, selected_plot);
    },
    icon: __jsx(_containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_7__["MinusIcon"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 138,
        columnNumber: 19
      }
    }),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 11
    }
  })), __jsx(_containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_7__["ImageDiv"], {
    style: {
      display: params_for_api.normalize ? '' : 'none'
    },
    id: "hist_".concat(selected_plot.name),
    width: params_for_api.width,
    height: params_for_api.height,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 9
    }
  }), __jsx(_containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_7__["ImageDiv"], {
    style: {
      display: params_for_api.normalize ? 'none' : ''
    },
    id: "nostack_".concat(selected_plot.name),
    width: params_for_api.width,
    height: params_for_api.height,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 9
    }
  })));
};

/***/ })

})
//# sourceMappingURL=index.js.7077d954ce75b327b46e.hot-update.js.map