webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/viewDetailsMenu/search/index.tsx":
/*!*****************************************************!*\
  !*** ./components/viewDetailsMenu/search/index.tsx ***!
  \*****************************************************/
/*! exports provided: CustomModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomModal", function() { return CustomModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Nav */ "./components/Nav.tsx");
/* harmony import */ var _hooks_useSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../hooks/useSearch */ "./hooks/useSearch.tsx");
/* harmony import */ var _containers_search_SearchResults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../containers/search/SearchResults */ "./containers/search/SearchResults.tsx");
/* harmony import */ var _styledComponents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styledComponents */ "./components/viewDetailsMenu/styledComponents.tsx");
/* harmony import */ var _contexts_leftSideContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../contexts/leftSideContext */ "./contexts/leftSideContext.tsx");
/* harmony import */ var _styledComponents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styledComponents */ "./components/styledComponents.ts");
/* harmony import */ var _styles_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../styles/theme */ "./styles/theme.ts");
var _this = undefined,
    _jsxFileName = "/mnt/c/Users/ernes/Desktop/test/dqmgui_frontend/components/viewDetailsMenu/search/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








var CustomModal = function CustomModal(_ref) {
  var id = _ref.id;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      search_run_number = _useState[0],
      setSearchRunNumber = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      search_dataset_name = _useState2[0],
      setSearchDatasetName = _useState2[1];

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_contexts_leftSideContext__WEBPACK_IMPORTED_MODULE_5__["store"]),
      change_value_in_reference_table = _useContext.change_value_in_reference_table,
      toggleOverlayDataMenu = _useContext.toggleOverlayDataMenu,
      openOverlayDataMenu = _useContext.openOverlayDataMenu;

  var navigationHandler = function navigationHandler(search_by_run_number, search_by_dataset_name) {
    setSearchRunNumber(search_by_run_number);
    setSearchDatasetName(search_by_dataset_name);
  };

  var clear = function clear() {
    setSearchRunNumber('');
    setSearchDatasetName('');
  };

  var onClosing = function onClosing() {
    clear();
    toggleOverlayDataMenu(false);
  };

  var searchHandler = function searchHandler(run_number, dataset_name) {
    change_value_in_reference_table(run_number, 'run_number', id);
    change_value_in_reference_table(dataset_name, 'dataset_name', id);
    toggleOverlayDataMenu(false);
    clear();
  };

  var _useSearch = Object(_hooks_useSearch__WEBPACK_IMPORTED_MODULE_2__["useSearch"])(search_run_number, search_dataset_name),
      results = _useSearch.results,
      results_grouped = _useSearch.results_grouped,
      searching = _useSearch.searching,
      isLoading = _useSearch.isLoading,
      errors = _useSearch.errors;

  return __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_4__["StyledModal"], {
    title: "Overlay Plots data search",
    visible: openOverlayDataMenu,
    onCancel: function onCancel() {
      return onClosing();
    },
    footer: [__jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_6__["StyledButton"], {
      color: _styles_theme__WEBPACK_IMPORTED_MODULE_7__["theme"].colors.secondary.main,
      background: "white",
      key: "Close",
      onClick: function onClick() {
        return onClosing();
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 9
      }
    }, "Close")],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 5
    }
  }, openOverlayDataMenu && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_Nav__WEBPACK_IMPORTED_MODULE_1__["default"], {
    handler: navigationHandler,
    setRunNumber: setSearchRunNumber,
    setDatasetName: setSearchDatasetName,
    type: "overlay",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 11
    }
  }), searching ? __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_4__["ResultsWrapper"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 13
    }
  }, __jsx(_containers_search_SearchResults__WEBPACK_IMPORTED_MODULE_3__["default"], {
    handler: searchHandler,
    isLoading: isLoading,
    results: results,
    results_grouped: results_grouped,
    errors: errors,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 15
    }
  })) : __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_4__["ResultsWrapper"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 15
    }
  })));
};

/***/ })

})
//# sourceMappingURL=index.js.800159330d73118d31b8.hot-update.js.map