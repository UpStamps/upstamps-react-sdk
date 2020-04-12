'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var apiUrl = "https://services.upstamps.com/api";

var UpStampsContext =
/*#__PURE__*/
React.createContext({});

var reducer = function reducer(state, action) {
  switch (action.type) {
    case "set-flags":
      return _extends({}, state, {}, action.payload);

    case "set-flags-error":
      return _extends({}, state, {}, action.payload);

    case "set-remotes":
      return _extends({}, state, {}, action.payload);

    case "set-remotes-error":
      return _extends({}, state, {}, action.payload);

    default:
      throw new Error("Unhandled action type");
  }
};

var UpStampsProvider = function UpStampsProvider(_ref) {
  var children = _ref.children,
      clientId = _ref.clientId,
      envKey = _ref.envKey,
      projectKey = _ref.projectKey;
  var params = {
    clientId: clientId,
    envKey: envKey,
    projectKey: projectKey
  };

  var _useReducer = React.useReducer(reducer, {
    loading: true,
    error: false,
    flags: [],
    remotes: [],
    params: params
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var value = React.useMemo(function () {
    return {
      state: state,
      dispatch: dispatch
    };
  }, [state, dispatch]); //Get All Flags on Init

  React.useEffect(function () {
    var ignore = false; //Get All the Flags

    var onFetchFlags = function onFetchFlags() {
      try {
        return Promise.resolve(_catch(function () {
          //If the flags are collected, do not fetch again
          if (state.flags.length > 0) return; //Service Url

          var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/flags"; //Response with the all the flags

          return Promise.resolve(fetch(url)).then(function (response) {
            return Promise.resolve(response.json()).then(function (_ref2) {
              var flags = _ref2.flags;
              //Filters flags a creates a simple array
              var data = flags.map(function (item) {
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
            });
          });
        }, function () {
          dispatch({
            type: "set-flags-error",
            payload: {
              loading: false,
              error: true
            }
          });
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    }; //Get All the Remote Flags


    var onFetchRemotes = function onFetchRemotes() {
      try {
        return Promise.resolve(_catch(function () {
          //If the Remotes Flags are collected, do not fetch again
          if (state.remotes.length > 0) return; //Service Url

          var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/remotes"; //Response with the all the remotes flags

          return Promise.resolve(fetch(url)).then(function (response) {
            return Promise.resolve(response.json()).then(function (_ref3) {
              var remotes = _ref3.remotes;

              if (!ignore) {
                dispatch({
                  type: "set-remotes",
                  payload: {
                    remotes: remotes,
                    loading: false
                  }
                });
              }
            }); //Updates the state with the remotes flags
          });
        }, function () {
          dispatch({
            type: "set-remotes-error",
            payload: {
              loading: false,
              error: true
            }
          });
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };

    onFetchFlags();
    onFetchRemotes();
    return function () {
      ignore = true;
    };
  }, [state.flags, state.remotes, clientId, envKey, projectKey]);
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
  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var flags = React.useMemo(function () {
    return state.flags;
  }, [state.flags]);
  return {
    show: flags.indexOf(name) !== -1
  };
};

var Flag = function Flag(_ref) {
  var children = _ref.children,
      name = _ref.name;

  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var show = React.useMemo(function () {
    return state.flags.indexOf(name) !== -1;
  }, [state.flags, name]); //Hide the feature

  if (!show) return null;
  return React__default.createElement(React.Fragment, null, children);
};

var useRemoteFlag = function useRemoteFlag(name) {
  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var remote = React.useMemo(function () {
    return state.remotes.filter(function (item) {
      return item.name === name;
    });
  }, [state.remotes, name]);
  var verifyRemote = React.useMemo(function () {
    return remote.length > 0;
  }, [remote]);
  return {
    show: verifyRemote,
    data: verifyRemote ? remote[0].data : {}
  };
};

var RemoteFlag = function RemoteFlag(_ref) {
  var children = _ref.children,
      name = _ref.name;

  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var remote = React.useMemo(function () {
    return state.remotes.filter(function (item) {
      return item.name === name;
    });
  }, [state.remotes, name]);
  var verifyRemote = React.useMemo(function () {
    return remote.length > 0;
  }, [remote]);
  var data = verifyRemote ? remote[0].data : {}; //Hide the feature

  if (!verifyRemote) return null;
  return React__default.createElement(React.Fragment, null, children(data));
};

exports.Flag = Flag;
exports.RemoteFlag = RemoteFlag;
exports.UpStampsContext = UpStampsContext;
exports.UpStampsProvider = UpStampsProvider;
exports.useFlag = useFlag;
exports.useRemoteFlag = useRemoteFlag;
//# sourceMappingURL=upstamps-react.cjs.development.js.map
