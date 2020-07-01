webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/plots/plot/singlePlot/utils.ts":
/*!***************************************************!*\
  !*** ./components/plots/plot/singlePlot/utils.ts ***!
  \***************************************************/
/*! exports provided: removePlotFromSelectedPlots, addToSelectedPlots, addOverlayData, FormatParamsForAPI, addPlotToRightSide, removePlotFromRightSide, scroll, scrollToBottom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePlotFromSelectedPlots", function() { return removePlotFromSelectedPlots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToSelectedPlots", function() { return addToSelectedPlots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOverlayData", function() { return addOverlayData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatParamsForAPI", function() { return FormatParamsForAPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addPlotToRightSide", function() { return addPlotToRightSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePlotFromRightSide", function() { return removePlotFromRightSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scroll", function() { return scroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollToBottom", function() { return scrollToBottom; });
/* harmony import */ var clean_deep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clean-deep */ "./node_modules/clean-deep/src/index.js");
/* harmony import */ var clean_deep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clean_deep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _viewDetailsMenu_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../viewDetailsMenu/utils */ "./components/viewDetailsMenu/utils.ts");
/* harmony import */ var _containers_display_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../containers/display/utils */ "./containers/display/utils.ts");



var removePlotFromSelectedPlots = function removePlotFromSelectedPlots(plotsQuery, plotName) {
  var plotsWithDirs = plotsQuery ? plotsQuery.split('&') : [];
  var fileterdPlotsAndDirs = plotsWithDirs.map(function (plotWithDir) {
    var plotAndDir = plotWithDir.split('/');

    if (plotAndDir[plotAndDir.length - 1] !== plotName.name) {
      return plotWithDir;
    }
  });
  var cleanedFileterdPlotsAndDirs = clean_deep__WEBPACK_IMPORTED_MODULE_0___default()(fileterdPlotsAndDirs);
  var plotsForQuery = cleanedFileterdPlotsAndDirs.join('&');
  return plotsForQuery;
};
var addToSelectedPlots = function addToSelectedPlots(plotsQuery, plot) {
  return "".concat(plotsQuery ? plotsQuery + '&' : '').concat(plot.path, "/").concat(plot.name);
};
var addOverlayData = function addOverlayData(triples) {
  var params = triples && triples.map(function (triple) {
    return "".concat(triple.run_number).concat(triple.dataset_name, "/").concat(triple.label ? triple.label : triple.run_number);
  });
  var query = params === null || params === void 0 ? void 0 : params.join('&');
  return query;
};
var FormatParamsForAPI = function FormatParamsForAPI(globalState, query, plotName, path) {
  return {
    run_number: query.run_number ? query.run_number : '',
    dataset_name: query.dataset_name ? query.dataset_name : '',
    folders_path: path,
    plot_name: plotName,
    height: globalState.size.h,
    width: globalState.size.w,
    customizeProps: globalState.customizeProps,
    stats: globalState.stats,
    overlay: query.overlay,
    overlay_plot: query.overlay_data ? Object(_viewDetailsMenu_utils__WEBPACK_IMPORTED_MODULE_1__["formTriples"])(query.overlay_data) : [],
    normalize: query.normalize ? query.normalize : 'False',
    lumi: globalState.lumisection ? globalState.lumisection : query.lumi === '-1' ? '' : query.lumi
  };
};
var addPlotToRightSide = function addPlotToRightSide(query, plot) {
  return Object(_containers_display_utils__WEBPACK_IMPORTED_MODULE_2__["changeRouter"])(Object(_containers_display_utils__WEBPACK_IMPORTED_MODULE_2__["getChangedQueryParams"])({
    selected_plots: "".concat(addToSelectedPlots(query.selected_plots, plot))
  }, query));
};
var removePlotFromRightSide = function removePlotFromRightSide(query, plot) {
  return Object(_containers_display_utils__WEBPACK_IMPORTED_MODULE_2__["changeRouter"])(Object(_containers_display_utils__WEBPACK_IMPORTED_MODULE_2__["getChangedQueryParams"])({
    selected_plots: "".concat(removePlotFromSelectedPlots(query.selected_plots, plot))
  }, query));
};
var scroll = function scroll(imageRef) {
  if (imageRef) {
    imageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }
};
var scrollToBottom = function scrollToBottom(imageRef) {
  if (imageRef && imageRef.current) {
    imageRef.current.scrollTop = imageRef.current.scrollHeight;
  }
};

/***/ })

})
//# sourceMappingURL=index.js.f9b41330971828b99c39.hot-update.js.map