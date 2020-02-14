'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var React = require('react');
var React__default = _interopDefault(React);

var UpStampsContext =
/*#__PURE__*/
React.createContext({});
var apiUrl = "https://services.upstamps.com/api";
var UpStampsProvider = function UpStampsProvider(_a) {
  var children = _a.children,
      clientId = _a.clientId,
      envKey = _a.envKey,
      projectKey = _a.projectKey;
  var params = {
    clientId: clientId,
    envKey: envKey,
    projectKey: projectKey
  };

  var _b = React.useState({
    loading: true,
    error: false,
    flags: [],
    params: params
  }),
      state = _b[0],
      dispatch = _b[1];

  var _c = React.useState({
    state: state,
    dispatch: dispatch
  }),
      contextValue = _c[0],
      setContextValue = _c[1];

  React.useEffect(function () {
    var onFetchFlags = function onFetchFlags() {
      return tslib.__awaiter(void 0, void 0, void 0, function () {
        var url, response, flags, data_1, e_1;
        return tslib.__generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3,, 4]); //If the flags are collected, do not fetch again


              if (state.flags.length > 0) return [2
              /*return*/
              ];
              url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey;
              return [4
              /*yield*/
              , fetch(url)];

            case 1:
              response = _a.sent();
              return [4
              /*yield*/
              , response.json()];

            case 2:
              flags = _a.sent().flags;
              data_1 = flags.map(function (item) {
                return item.name;
              }); //Updates the state with the flags

              dispatch(function (prevState) {
                return tslib.__assign(tslib.__assign({}, prevState), {
                  flags: data_1,
                  loading: false
                });
              });
              return [3
              /*break*/
              , 4];

            case 3:
              e_1 = _a.sent();
              dispatch(function (prevState) {
                return tslib.__assign(tslib.__assign({}, prevState), {
                  error: true,
                  loading: false
                });
              });
              return [3
              /*break*/
              , 4];

            case 4:
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    onFetchFlags();
  }, [state.flags]); // Update context value and trigger re-render
  // This patterns avoids unnecessary deep renders
  // https://reactjs.org/docs/context.html#caveats

  React.useEffect(function () {
    setContextValue(tslib.__assign(tslib.__assign({}, contextValue), {
      state: state
    }));
  }, [state]);
  return React__default.createElement(UpStampsContext.Provider, {
    value: contextValue
  }, children);
};

var useFlag = function useFlag(name) {
  var state = React.useContext(UpStampsContext).state;
  return {
    show: state.flags.indexOf(name) !== -1
  };
};

var Flag = function Flag(_a) {
  var children = _a.children,
      name = _a.name;
  var state = React.useContext(UpStampsContext).state;
  var show = state.flags.indexOf(name) !== -1; //Hide the feature

  if (!show) return null;
  return React__default.createElement(React.Fragment, null, children);
};

exports.Flag = Flag;
exports.UpStampsContext = UpStampsContext;
exports.UpStampsProvider = UpStampsProvider;
exports.useFlag = useFlag;
//# sourceMappingURL=upstamps-react.cjs.development.js.map
