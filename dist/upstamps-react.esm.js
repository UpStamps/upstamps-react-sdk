import { __awaiter, __generator, __assign } from 'tslib';
import React, { createContext, useState, useEffect, useContext, useMemo, Fragment } from 'react';

var UpStampsContext =
/*#__PURE__*/
createContext({});
var apiUrl = "https://services.upstamps.com/api/flags";
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

  var _b = useState({
    loading: true,
    error: false,
    flags: [],
    params: params
  }),
      state = _b[0],
      dispatch = _b[1];

  var _c = useState({
    state: state,
    dispatch: dispatch
  }),
      contextValue = _c[0],
      setContextValue = _c[1];

  useEffect(function () {
    var onFetchFlags = function onFetchFlags() {
      return __awaiter(void 0, void 0, void 0, function () {
        var url, response, flags, data_1, e_1;
        return __generator(this, function (_a) {
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
                return __assign(__assign({}, prevState), {
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
                return __assign(__assign({}, prevState), {
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
  }, [state.flags, clientId, envKey, projectKey]);
  useEffect(function () {
    setContextValue(__assign(__assign({}, contextValue), {
      state: state
    }));
  }, [state]);
  return React.createElement(UpStampsContext.Provider, {
    value: contextValue
  }, children);
};

var useFlag = function useFlag(name) {
  var state = useContext(UpStampsContext).state;
  var flags = useMemo(function () {
    return state.flags;
  }, [state.flags]);
  return {
    show: flags.indexOf(name) !== -1
  };
};

var Flag = function Flag(_a) {
  var children = _a.children,
      name = _a.name;
  var state = useContext(UpStampsContext).state;
  var show = state.flags.indexOf(name) !== -1; //Hide the feature

  if (!show) return null;
  return React.createElement(Fragment, null, children);
};

export { Flag, UpStampsContext, UpStampsProvider, useFlag };
//# sourceMappingURL=upstamps-react.esm.js.map
