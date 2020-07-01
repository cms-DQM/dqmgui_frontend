webpackHotUpdate("static/development/pages/index.js",{

/***/ "./config/utils.ts":
/*!*************************!*\
  !*** ./config/utils.ts ***!
  \*************************/
/*! exports provided: get_customize_params, getRunsWithLumisections, getRunsWithLumisectionsForOverlaidPlots */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_customize_params", function() { return get_customize_params; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRunsWithLumisections", function() { return getRunsWithLumisections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRunsWithLumisectionsForOverlaidPlots", function() { return getRunsWithLumisectionsForOverlaidPlots; });
var get_customize_params = function get_customize_params() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var xtype = params.xtype ? "xtype=".concat(params.xtype, ";") : '';
  var xmin = params.xmin ? "xmin=".concat(params.xmin, ";") : '';
  var xmax = params.xmax ? "xmax=".concat(params.xmax, ";") : '';
  var ytype = params.ytype ? "ytype=".concat(params.ytype, ";") : '';
  var ymin = params.ymin ? "ymin=".concat(params.ymin, ";") : '';
  var ymax = params.ymax ? "ymax=".concat(params.ymax, ";") : '';
  var ztype = params.ztype ? "ztype=".concat(params.ztype, ";") : '';
  var zmin = params.zmin ? "zmin=".concat(params.zmin, ";") : '';
  var zmax = params.zmax ? "zmax=".concat(params.zmax, ";") : '';
  var drawopts = params.drawopts ? "drawopts=".concat(params.drawopts, ";") : '';
  var withref = params.withref ? "withref=".concat(params.withref, ";") : '';
  var parameters = "".concat(xtype).concat(xmin).concat(xmax).concat(ytype).concat(ymin).concat(ymax).concat(ztype).concat(zmin).concat(zmax).concat(drawopts).concat(withref);
  return parameters;
};
var getRunsWithLumisections = function getRunsWithLumisections(params) {
  console.log(params);
  var lumisectionValue = params.lumi === -1 ? undefined : params.lumi;
  var lumisectionParameter = lumisectionValue ? "".concat(params.run_number, ":").concat(lumisectionValue) : params.run_number;
  return lumisectionParameter;
};
var getRunsWithLumisectionsForOverlaidPlots = function getRunsWithLumisectionsForOverlaidPlots(params) {
  var lumisectionValue = params.lumi === -1 ? undefined : params.lumi;
  var lumisectionParameter = lumisectionValue ? "".concat(params.run_number, ":").concat(lumisectionValue) : params.run_number;
  return lumisectionParameter;
};

/***/ })

})
//# sourceMappingURL=index.js.2b7f6de84f31c8ecf48a.hot-update.js.map