webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _components_Nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Nav */ "./components/Nav.tsx");
/* harmony import */ var _containers_search_SearchResults__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../containers/search/SearchResults */ "./containers/search/SearchResults.tsx");
/* harmony import */ var _containers_display_DisplayFolderAndPlot__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../containers/display/DisplayFolderAndPlot */ "./containers/display/DisplayFolderAndPlot.tsx");
/* harmony import */ var _hooks_useSearch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../hooks/useSearch */ "./hooks/useSearch.tsx");
/* harmony import */ var _styles_styledComponents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/styledComponents */ "./styles/styledComponents.ts");
/* harmony import */ var _containers_search_styledComponents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../containers/search/styledComponents */ "./containers/search/styledComponents.tsx");
/* harmony import */ var _workspaces_offline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../workspaces/offline */ "./workspaces/offline.ts");
/* harmony import */ var _components_navigation_composedSearch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/navigation/composedSearch */ "./components/navigation/composedSearch.tsx");
var _this = undefined,
    _jsxFileName = "/mnt/c/Users/ernes/Desktop/test/dqmgui_frontend/pages/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;













var navigationHandler = function navigationHandler(search_by_run_number, search_by_dataset_name) {
  next_router__WEBPACK_IMPORTED_MODULE_2___default.a.replace({
    pathname: '/',
    query: {
      search_run_number: search_by_run_number,
      search_dataset_name: search_by_dataset_name
    }
  });
};

var serchResultsHandler = function serchResultsHandler(run, dataset) {
  console.log(run);
  next_router__WEBPACK_IMPORTED_MODULE_2___default.a.replace({
    pathname: '/',
    query: {
      run_number: run,
      dataset_name: dataset,
      workspaces: _workspaces_offline__WEBPACK_IMPORTED_MODULE_10__["workspaces"][0].workspaces[2].label
    }
  });
};

var backToMainPage = function backToMainPage() {
  next_router__WEBPACK_IMPORTED_MODULE_2___default.a.replace({
    pathname: '/',
    query: {
      search_run_number: '',
      search_dataset_name: ''
    }
  });
};

var Index = function Index() {
  // We grab the query from the URL:
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  var query = router.query;

  var _useSearch = Object(_hooks_useSearch__WEBPACK_IMPORTED_MODULE_7__["useSearch"])(query.search_run_number, query.search_dataset_name),
      results = _useSearch.results,
      results_grouped = _useSearch.results_grouped,
      searching = _useSearch.searching,
      isLoading = _useSearch.isLoading,
      errors = _useSearch.errors;

  var isDatasetAndRunNumberSelected = !!query.run_number && !!query.dataset_name;
  return __jsx(_styles_styledComponents__WEBPACK_IMPORTED_MODULE_8__["StyledDiv"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }
  }, __jsx("script", {
    crossOrigin: "anonymous",
    type: "text/javascript",
    src: "/jsroot-5.8.0/scripts/JSRootCore.js?2d&hist&more2d",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 9
    }
  })), __jsx(_styles_styledComponents__WEBPACK_IMPORTED_MODULE_8__["StyledLayout"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 7
    }
  }, __jsx(_styles_styledComponents__WEBPACK_IMPORTED_MODULE_8__["StyledHeader"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], {
    title: "Back to main page",
    placement: "bottomLeft",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 11
    }
  }, __jsx(_styles_styledComponents__WEBPACK_IMPORTED_MODULE_8__["StyledLogoDiv"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 13
    }
  }, __jsx(_styles_styledComponents__WEBPACK_IMPORTED_MODULE_8__["StyledLogoWrapper"], {
    onClick: function onClick() {
      return backToMainPage();
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 15
    }
  }, __jsx(_styles_styledComponents__WEBPACK_IMPORTED_MODULE_8__["StyledLogo"], {
    src: "/images/CMSlogo_white_red_nolabel_1024_May2014.png",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 17
    }
  })))), //if all full set is selected: dataset name and run number, then regular search field is not visible.
  //Instead, run and dataset browser is is displayed.
  //Regular search fields are displayed just in the main page.
  isDatasetAndRunNumberSelected ? __jsx(_components_navigation_composedSearch__WEBPACK_IMPORTED_MODULE_11__["ComposedSearch"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 15
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_Nav__WEBPACK_IMPORTED_MODULE_4__["default"], {
    initial_search_run_number: query.search_run_number,
    initial_search_dataset_name: query.search_dataset_name,
    handler: navigationHandler,
    type: "top",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 19
    }
  }))), query.run_number && query.dataset_name ? // If a user already has a run_number and dataset_name, he is not searching nor is he in the homepage, he is
  __jsx(_containers_display_DisplayFolderAndPlot__WEBPACK_IMPORTED_MODULE_6__["default"], {
    run_number: query.run_number,
    dataset_name: query.dataset_name,
    folder_path: query.folder_path || '',
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 11
    }
  }) : searching ? __jsx(_containers_search_SearchResults__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isLoading: isLoading,
    results: results,
    results_grouped: results_grouped,
    handler: serchResultsHandler,
    errors: errors,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 11
    }
  }) : __jsx(_containers_search_styledComponents__WEBPACK_IMPORTED_MODULE_9__["NotFoundDivWrapper"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 17
    }
  }, __jsx(_containers_search_styledComponents__WEBPACK_IMPORTED_MODULE_9__["NotFoundDiv"], {
    noBorder: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 19
    }
  }, __jsx(_containers_search_styledComponents__WEBPACK_IMPORTED_MODULE_9__["ChartIcon"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 21
    }
  }), "Welcome to DQM GUI"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=index.js.ca1ff2e40b2b6b09fe02.hot-update.js.map