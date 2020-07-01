webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/navigation/composedSearch.tsx":
/*!**************************************************!*\
  !*** ./components/navigation/composedSearch.tsx ***!
  \**************************************************/
/*! exports provided: ComposedSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComposedSearch", function() { return ComposedSearch; });
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _workspaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../workspaces */ "./components/workspaces/index.tsx");
/* harmony import */ var _styledComponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styledComponents */ "./components/styledComponents.ts");
/* harmony import */ var _browsing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../browsing */ "./components/browsing/index.tsx");
/* harmony import */ var _plots_plot_plotSearch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../plots/plot/plotSearch */ "./components/plots/plot/plotSearch/index.tsx");
/* harmony import */ var _freeSearchResultModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./freeSearchResultModal */ "./components/navigation/freeSearchResultModal.tsx");
/* harmony import */ var _searchButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../searchButton */ "./components/searchButton.tsx");
/* harmony import */ var _containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../containers/display/styledComponents */ "./containers/display/styledComponents.tsx");


var _this = undefined,
    _jsxFileName = "/mnt/c/Users/ernes/Desktop/test/dqmgui_frontend/components/navigation/composedSearch.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1__["createElement"];










var ComposedSearch = function ComposedSearch() {
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  var query = router.query;
  var run = query.run_number ? query.run_number : '';

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__["useState"](run),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState, 2),
      search_run_number = _React$useState2[0],
      setSearchRunNumber = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1__["useState"](query.dataset_name),
      _React$useState4 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState3, 2),
      search_dataset_name = _React$useState4[0],
      setSearchDatasetName = _React$useState4[1];

  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_1__["useState"](false),
      _React$useState6 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$useState5, 2),
      modalState = _React$useState6[0],
      setModalState = _React$useState6[1];

  react__WEBPACK_IMPORTED_MODULE_1__["useEffect"](function () {
    //when modal is open, run number and dataset search fields are filled with values from query
    if (modalState) {
      var _run = query.run_number ? query.run_number : '';

      setSearchDatasetName(query.dataset_name);
      setSearchRunNumber(_run);
    }
  }, [modalState]);
  return __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_5__["CustomRow"], {
    width: "100%",
    display: "flex",
    justifycontent: "space-between",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }, __jsx(_freeSearchResultModal__WEBPACK_IMPORTED_MODULE_8__["SearchModal"], {
    modalState: modalState,
    setModalState: setModalState,
    setSearchRunNumber: setSearchRunNumber,
    setSearchDatasetName: setSearchDatasetName,
    search_run_number: search_run_number,
    search_dataset_name: search_dataset_name,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }), __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_5__["CustomRow"], {
    width: "fit-content",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }
  }, __jsx(_browsing__WEBPACK_IMPORTED_MODULE_6__["Browser"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }), __jsx(_searchButton__WEBPACK_IMPORTED_MODULE_9__["SearchButton"], {
    onClick: function onClick() {
      return setModalState(true);
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }
  })), __jsx(_containers_display_styledComponents__WEBPACK_IMPORTED_MODULE_10__["WrapperDiv"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }
  }, __jsx(_workspaces__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 11
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }, __jsx(_plots_plot_plotSearch__WEBPACK_IMPORTED_MODULE_7__["PlotSearch"], {
    isLoadingFolders: false,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 11
    }
  }))));
};

/***/ })

})
//# sourceMappingURL=index.js.6cccc05cd9ddf6f641ed.hot-update.js.map