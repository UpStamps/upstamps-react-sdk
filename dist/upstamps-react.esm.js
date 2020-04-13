import React, { createContext, useReducer, useMemo, useEffect, useContext, Fragment, useState } from 'react';

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
createContext({});

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

  var _useReducer = useReducer(reducer, {
    loading: true,
    error: false,
    flags: [],
    remotes: [],
    params: params
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var value = useMemo(function () {
    return {
      state: state,
      dispatch: dispatch
    };
  }, [state, dispatch]); //Get All Flags on Init

  useEffect(function () {
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
  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var flags = useMemo(function () {
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

  var show = useMemo(function () {
    return state.flags.indexOf(name) !== -1;
  }, [state.flags, name]); //Hide the feature

  if (!show) return null;
  return React.createElement(Fragment, null, children);
};

var useRemoteFlag = function useRemoteFlag(name) {
  var _useUpstampsContext = useUpStampsContext(),
      state = _useUpstampsContext.state;

  var remote = useMemo(function () {
    return state.remotes.filter(function (item) {
      return item.name === name;
    });
  }, [state.remotes, name]);
  var verifyRemote = useMemo(function () {
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

  var remote = useMemo(function () {
    return state.remotes.filter(function (item) {
      return item.name === name;
    });
  }, [state.remotes, name]);
  var verifyRemote = useMemo(function () {
    return remote.length > 0;
  }, [remote]);
  var data = verifyRemote ? remote[0].data : {}; //Hide the feature

  if (!verifyRemote) return null;
  return React.createElement(Fragment, null, children(data));
};

var variantTypes = ["A", "B"];
var fetchHandler = function fetchHandler(url, name) {
  try {
    return Promise.resolve(_catch(function () {
      //Response with the all the A/B Tests
      return Promise.resolve(fetch(url)).then(function (response) {
        return Promise.resolve(response.json()).then(function (_ref) {
          var ABTesting = _ref.ABTesting;
          var result = ABTesting.filter(function (item) {
            return item.name === name;
          });
          var show = result.length > 0;
          var randomVariant = Math.floor(Math.random() * variantTypes.length);
          return {
            show: show,
            variant: variantTypes[randomVariant],
            loading: false
          };
        });
      });
    }, function (e) {
      throw e;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var emitterHandler = function emitterHandler(variant, name, url) {
  return Promise.resolve(_catch(function () {
    var post_body = {
      name: name,
      varA: variant === "A" ? 1 : 0,
      varB: variant === "B" ? 1 : 0
    };
    return Promise.resolve(fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(post_body)
    })).then(function (response) {
      return Promise.resolve(response.json());
    });
  }, function (e) {
    return e;
  }));
};

var useABTest = function useABTest(name) {
  var context = useUpStampsContext();

  var _useState = useState({
    loading: true,
    error: false,
    show: false,
    variant: "A"
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing"; // const variantTypes = ["A", "B"];

  useEffect(function () {
    var onFetch = function onFetch() {
      try {
        var _temp2 = _catch(function () {
          return Promise.resolve(fetchHandler(url, name)).then(function (_ref) {
            var show = _ref.show,
                loading = _ref.loading,
                variant = _ref.variant;
            setState(function (prevState) {
              return _extends({}, prevState, {
                show: show,
                variant: variant,
                loading: loading
              });
            });
          });
        }, function () {
          setState(function (prevState) {
            return _extends({}, prevState, {
              error: true,
              loading: false
            });
          });
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    onFetch();
  }, [name, context.state.params]);

  var onEmitter = function onEmitter() {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(emitterHandler(state.variant, name, url));
    }, function (e) {
      return e;
    }));
  };

  return {
    show: state.show,
    error: state.error,
    loading: state.loading,
    variant: state.variant,
    emitter: onEmitter
  };
};

var ABTest = function ABTest(_ref) {
  var children = _ref.children;
  var context = useUpStampsContext();

  var _useState = useState({
    component: [],
    loading: true,
    error: false,
    variant: "A"
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";

  var onRenderChildren = function onRenderChildren(variant) {
    var component = React.Children.map(children, function (child) {
      if (child.props.name === variant) {
        return child;
      }
    });
    setState(function (prevState) {
      return _extends({}, prevState, {
        component: component
      });
    });
  };

  useEffect(function () {
    var onFetch = function onFetch() {
      try {
        var _temp2 = _catch(function () {
          return Promise.resolve(fetchHandler(url, name)).then(function (_ref2) {
            var show = _ref2.show,
                loading = _ref2.loading,
                variant = _ref2.variant;
            onRenderChildren(variant);
            setState(function (prevState) {
              return _extends({}, prevState, {
                show: show,
                variant: variant,
                loading: loading
              });
            });
          });
        }, function () {
          setState(function (prevState) {
            return _extends({}, prevState, {
              error: true,
              loading: false
            });
          });
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    onFetch();
  }, [name, context.state.params]);
  /* const onEmitter = async () => {
    try {
      return await emitterHandler(state.variant, name, url);
    } catch (e) {
      return e;
    }
  };*/

  /* return React.cloneElement(
    <Fragment />,
    { emitter: onEmitter, ...props },
    <Fragment>{state.component}</Fragment>
  );*/

  return React.createElement(Fragment, null, state.component);
};

var Variant = function Variant(_ref3) {
  var children = _ref3.children;
  return React.createElement(Fragment, null, children);
};

Variant.displayName = "ABTest.Variant";
ABTest.Variant = Variant;

export { ABTest, Flag, RemoteFlag, UpStampsContext, UpStampsProvider, useABTest, useFlag, useRemoteFlag };
//# sourceMappingURL=upstamps-react.esm.js.map
