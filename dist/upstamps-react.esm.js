import { __awaiter, __generator, __assign } from 'tslib';
import React, { createContext, useReducer, useMemo, useEffect, useContext, Fragment } from 'react';

var apiUrl = "https://services.upstamps.com/api";

var UpStampsContext =
/*#__PURE__*/
createContext({});

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "set-flags":
      return __assign(__assign({}, state), action.payload);

    default:
      throw new Error("Unhandled action type: " + action.type);
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

  var _b = useReducer(reducer, {
    loading: true,
    error: false,
    flags: [],
    params: params
  }),
      state = _b[0],
      dispatch = _b[1];

  var value = useMemo(function () {
    return {
      state: state,
      dispatch: dispatch
    };
  }, [state, dispatch]);
  useEffect(function () {
    var ignore = false;

    var onFetchFlags = function onFetchFlags() {
      return __awaiter(void 0, void 0, void 0, function () {
        var url, response, flags, data, e_1;
        return __generator(this, function (_a) {
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
                type: "set-flags",
                payload: {
                  flags: [],
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
  return React.createElement(UpStampsContext.Provider, {
    value: value
  }, children);
};

var useUpStampsContext = function useUpStampsContext() {
  var context = useContext(UpStampsContext);

  if (context === undefined) {
    throw new Error("UpStampsContext must be used with UpStampsProvider!");
  }

  return context;
};

var useFlag = function useFlag(name) {
  var state = useUpStampsContext().state;
  var flags = useMemo(function () {
    return state.flags;
  }, [state.flags]);
  console.log("Render");
  return {
    show: flags.indexOf(name) !== -1
  };
};

var Flag = function Flag(_a) {
  var children = _a.children,
      name = _a.name;
  var state = useUpStampsContext().state;
  var show = useMemo(function () {
    return state.flags.indexOf(name) !== -1;
  }, [state.flags]); //Hide the feature

  if (!show) return null;
  return React.createElement(Fragment, null, children);
};

export { Flag, UpStampsContext, UpStampsProvider, useFlag };
//# sourceMappingURL=upstamps-react.esm.js.map
