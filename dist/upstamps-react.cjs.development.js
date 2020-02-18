'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var React = require('react');
var React__default = _interopDefault(React);

var apiUrl = "https://services.upstamps.com/api";

var UpStampsContext =
/*#__PURE__*/
React.createContext({});

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "set-flags":
      return tslib.__assign(tslib.__assign({}, state), action.payload);

    case "set-flags-error":
      return tslib.__assign(tslib.__assign({}, state), action.payload);

    default:
      throw new Error("Unhandled action type");
  }
};

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

  var _b = React.useReducer(reducer, {
    loading: true,
    error: false,
    flags: [],
    params: params
  }),
      state = _b[0],
      dispatch = _b[1];

  var value = React.useMemo(function () {
    return {
      state: state,
      dispatch: dispatch
    };
  }, [state, dispatch]);
  React.useEffect(function () {
    var ignore = false;

    var onFetchFlags = function onFetchFlags() {
      return tslib.__awaiter(void 0, void 0, void 0, function () {
        var url, response, flags, data, e_1;
        return tslib.__generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3,, 4]); //If the flags are collected, do not fetch again


              if (state.flags.length > 0) return [2
              /*return*/
              ];
              url = apiUrl + "/flags/" + clientId + "/" + projectKey + "/" + envKey;
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
              data = flags.map(function (item) {
                return item.name;
              }); //Updates the state with the flags

              if (!ignore) {
                dispatch({
                  type: "set-flags",
                  payload: {
                    flags: data,
                    loading: false
                  }
                });
              }

              return [3
              /*break*/
              , 4];

            case 3:
              e_1 = _a.sent();
              dispatch({
                type: "set-flags-error",
                payload: {
                  loading: false,
                  error: true
                }
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
    return function () {
      ignore = true;
    };
  }, [state.flags, clientId, envKey, projectKey]);
  return React__default.createElement(UpStampsContext.Provider, {
    value: value
  }, children);
};

var useUpStampsContext = function useUpStampsContext() {
  var context = React.useContext(UpStampsContext);

  if (context === undefined) {
    throw new Error("UpStampsContext must be used with UpStampsProvider!");
  }

  return context;
};

var useFlag = function useFlag(name) {
  var state = useUpStampsContext().state;
  var flags = React.useMemo(function () {
    return state.flags;
  }, [state.flags]);
  console.log("-------");
  console.log("Render = ", flags);
  return {
    show: flags.indexOf(name) !== -1
  };
};

var Flag = function Flag(_a) {
  var children = _a.children,
      name = _a.name;
  var state = useUpStampsContext().state;
  var show = React.useMemo(function () {
    return state.flags.indexOf(name) !== -1;
  }, [state.flags]); //Hide the feature

  if (!show) return null;
  return React__default.createElement(React.Fragment, null, children);
};

exports.Flag = Flag;
exports.UpStampsContext = UpStampsContext;
exports.UpStampsProvider = UpStampsProvider;
exports.useFlag = useFlag;
//# sourceMappingURL=upstamps-react.cjs.development.js.map
