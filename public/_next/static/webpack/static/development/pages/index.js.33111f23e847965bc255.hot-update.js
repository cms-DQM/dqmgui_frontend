webpackHotUpdate("static/development/pages/index.js",{

/***/ "./containers/display/DisplayFolderAndPlot.tsx":
/*!*****************************************************!*\
  !*** ./containers/display/DisplayFolderAndPlot.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useRequest */ "./hooks/useRequest.tsx");
/* harmony import */ var _components_plots_zoomedPlots__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/plots/zoomedPlots */ "./components/plots/zoomedPlots/index.tsx");
/* harmony import */ var _components_viewDetailsMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/viewDetailsMenu */ "./components/viewDetailsMenu/index.tsx");
/* harmony import */ var _styledComponents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styledComponents */ "./containers/display/styledComponents.tsx");
/* harmony import */ var _folderPath__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./folderPath */ "./containers/display/folderPath.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "./containers/display/utils.ts");
/* harmony import */ var _search_styledComponents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../search/styledComponents */ "./containers/search/styledComponents.tsx");
/* harmony import */ var _contexts_rightSideContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../contexts/rightSideContext */ "./contexts/rightSideContext.tsx");
/* harmony import */ var _components_plots_plot__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/plots/plot */ "./components/plots/plot/index.tsx");
/* harmony import */ var _directories__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directories */ "./containers/display/directories.tsx");
/* harmony import */ var _search_noResultsFound__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../search/noResultsFound */ "./containers/search/noResultsFound.tsx");
/* harmony import */ var _components_styledComponents__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../components/styledComponents */ "./components/styledComponents.ts");
/* harmony import */ var _hooks_useFilterFolders__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../hooks/useFilterFolders */ "./hooks/useFilterFolders.tsx");
/* harmony import */ var _components_settings__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../components/settings */ "./components/settings/index.tsx");
/* harmony import */ var _contexts_leftSideContext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../contexts/leftSideContext */ "./contexts/leftSideContext.tsx");
var _this = undefined,
    _jsxFileName = "/mnt/c/Users/ernes/Desktop/test/dqmgui_frontend/containers/display/DisplayFolderAndPlot.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




















var DiplayFolder = function DiplayFolder(_ref) {
  var folder_path = _ref.folder_path,
      run_number = _ref.run_number,
      dataset_name = _ref.dataset_name;

  var _useRequest = Object(_hooks_useRequest__WEBPACK_IMPORTED_MODULE_4__["useRequest"])("/data/json/archive/".concat(run_number).concat(dataset_name, "/").concat(folder_path), {}, [folder_path]),
      data = _useRequest.data,
      isLoading = _useRequest.isLoading;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      openSettings = _useState[0],
      toggleSettingsModal = _useState[1];

  var contents = Object(_utils__WEBPACK_IMPORTED_MODULE_9__["getContents"])(data);
  var allDirectories = Object(_utils__WEBPACK_IMPORTED_MODULE_9__["getDirectories"])(contents);
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  var query = router.query;
  var selectedPlots = query.selected_plots;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_contexts_leftSideContext__WEBPACK_IMPORTED_MODULE_18__["store"]),
      viewPlotsPosition = _useContext.viewPlotsPosition,
      proportion = _useContext.proportion; //filtering directories by selected workspace


  var _useFilterFolders = Object(_hooks_useFilterFolders__WEBPACK_IMPORTED_MODULE_16__["useFilterFolders"])(query, allDirectories),
      foldersByPlotSearch = _useFilterFolders.foldersByPlotSearch,
      plots = _useFilterFolders.plots;

  var filteredFolders = foldersByPlotSearch ? foldersByPlotSearch : [];
  var selected_plots = Object(_utils__WEBPACK_IMPORTED_MODULE_9__["getSelectedPlots"])(selectedPlots, plots);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    style: {
      padding: 8,
      width: '100%',
      justifyContent: 'space-between'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 7
    }
  }, __jsx(_components_settings__WEBPACK_IMPORTED_MODULE_17__["SettingsModal"], {
    openSettings: openSettings,
    toggleSettingsModal: toggleSettingsModal,
    isAnyPlotSelected: selected_plots.length === 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 9
    }
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    style: {
      padding: 8
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 9
    }
  }, __jsx(_folderPath__WEBPACK_IMPORTED_MODULE_8__["FolderPath"], {
    folder_path: folder_path,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 11
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 9
    }
  }, __jsx(_components_styledComponents__WEBPACK_IMPORTED_MODULE_15__["StyledSecondaryButton"], {
    icon: __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["SettingOutlined"], {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 19
      }
    }),
    onClick: function onClick() {
      return toggleSettingsModal(true);
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 11
    }
  }, "Settings"))), __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_7__["DivWrapper"], {
    selectedPlots: selected_plots.length > 0,
    position: viewPlotsPosition,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 7
    }
  }, __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_7__["Wrapper"], {
    zoomed: selected_plots.length > 0,
    notZoomedPlot: true,
    position: viewPlotsPosition,
    proportion: proportion,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }
  }, Object(_utils__WEBPACK_IMPORTED_MODULE_9__["doesPlotExists"])(contents).length > 0 && __jsx(_components_viewDetailsMenu__WEBPACK_IMPORTED_MODULE_6__["ViewDetailsMenu"], {
    selected_plots: selected_plots.length > 0,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 13
    }
  }), isLoading ? __jsx(_search_styledComponents__WEBPACK_IMPORTED_MODULE_10__["SpinnerWrapper"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 13
    }
  }, __jsx(_search_styledComponents__WEBPACK_IMPORTED_MODULE_10__["Spinner"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 15
    }
  })) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_styledComponents__WEBPACK_IMPORTED_MODULE_15__["CustomRow"], {
    width: "100%",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 17
    }
  }, __jsx(_directories__WEBPACK_IMPORTED_MODULE_13__["Directories"], {
    directories: filteredFolders,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 19
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 17
    }
  }, plots.map(function (plot) {
    if (plot) {
      return __jsx("div", {
        key: plot.name,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121,
          columnNumber: 25
        }
      }, __jsx(_components_plots_plot__WEBPACK_IMPORTED_MODULE_12__["LeftSidePlots"], {
        plot: plot,
        selected_plots: selected_plots,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122,
          columnNumber: 27
        }
      }));
    }

    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
  }))), !isLoading && filteredFolders.length === 0 && plots.length === 0 && __jsx(_components_styledComponents__WEBPACK_IMPORTED_MODULE_15__["CustomDiv"], {
    fullwidth: "true",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 13
    }
  }, __jsx(_search_noResultsFound__WEBPACK_IMPORTED_MODULE_14__["NoResultsFound"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 15
    }
  }))), selected_plots.length > 0 && __jsx(_styledComponents__WEBPACK_IMPORTED_MODULE_7__["Wrapper"], {
    zoomed: selected_plots.length,
    position: viewPlotsPosition,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 11
    }
  }, __jsx(_contexts_rightSideContext__WEBPACK_IMPORTED_MODULE_11__["RightSideStateProvider"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 13
    }
  }, __jsx(_components_plots_zoomedPlots__WEBPACK_IMPORTED_MODULE_5__["ZoomedPlots"], {
    selected_plots: selected_plots,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 15
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (DiplayFolder);

/***/ })

})
//# sourceMappingURL=index.js.33111f23e847965bc255.hot-update.js.map