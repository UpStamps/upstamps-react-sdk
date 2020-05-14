'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var localForage = _interopDefault(require('localforage'));
var isEqual = _interopDefault(require('lodash.isequal'));

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

              var _temp = function () {
                if (!ignore) {
                  dispatch({
                    type: "set-flags",
                    payload: {
                      flags: data,
                      loading: false
                    }
                  }); //Update or save on localStorage

                  return Promise.resolve(localForage.setItem("flags", data)).then(function () {});
                }
              }();

              if (_temp && _temp.then) return _temp.then(function () {});
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

              var _temp2 = function () {
                if (!ignore) {
                  dispatch({
                    type: "set-remotes",
                    payload: {
                      remotes: remotes,
                      loading: false
                    }
                  }); //Update or save on localStorage

                  return Promise.resolve(localForage.setItem("remotes", remotes)).then(function () {});
                }
              }();

              if (_temp2 && _temp2.then) return _temp2.then(function () {});
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
  }, []);
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

var useABTest = function useABTest(name, localStorage) {
  if (localStorage === void 0) {
    localStorage = false;
  }

  var context = useUpStampsContext();

  var _useState = React.useState({
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
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";
  React.useEffect(function () {
    var onFetch = function onFetch() {
      try {
        var _temp3 = _catch(function () {
          return Promise.resolve(localForage.getItem(name)).then(function (storageData) {
            var _temp = function () {
              if (localStorage && storageData !== null) {
                console.log("useABTest local");
                setState(function (prevState) {
                  return _extends({}, prevState, {}, storageData);
                });
              } else {
                console.log("useABTest remote");
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
                  }); //Updates local storage with the new data

                  return Promise.resolve(localForage.setItem(name, {
                    show: show,
                    variant: variant,
                    loading: loading
                  })).then(function () {});
                });
              }
            }();

            if (_temp && _temp.then) return _temp.then(function () {});
          }); //Checks the current data on local storage
        }, function () {
          setState(function (prevState) {
            return _extends({}, prevState, {
              error: true,
              loading: false
            });
          });
        });

        return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
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

var Container =
/*#__PURE__*/
React__default.forwardRef(function (props, ref) {
  React__default.useImperativeHandle(ref, function () {
    return {
      emitter: props.emitter
    };
  });
  return React__default.createElement(React.Fragment, null, props.children);
});
var ABTest = function ABTest(_ref) {
  var children = _ref.children,
      name = _ref.name,
      testRef = _ref.testRef,
      _ref$localStorage = _ref.localStorage,
      localStorage = _ref$localStorage === void 0 ? false : _ref$localStorage;
  var context = useUpStampsContext();

  var _useState = React.useState({
    component: [],
    loading: true,
    error: false,
    variant: "A",
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";

  var onRenderChildren = function onRenderChildren(variant) {
    var component = React__default.Children.map(children, function (child) {
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

  React.useEffect(function () {
    var onFetch = function onFetch() {
      try {
        var _temp3 = _catch(function () {
          return Promise.resolve(localForage.getItem(name)).then(function (storageData) {
            var _temp = function () {
              if (localStorage && storageData !== null) {
                console.log("ABTest local");
                onRenderChildren(storageData.variant);
                setState(function (prevState) {
                  return _extends({}, prevState, {}, storageData);
                });
              } else {
                console.log("ABTest remote");
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
                  }); //Updates local storage with the new data

                  return Promise.resolve(localForage.setItem(name, {
                    show: show,
                    variant: variant,
                    loading: loading
                  })).then(function () {});
                });
              }
            }();

            if (_temp && _temp.then) return _temp.then(function () {});
          }); //Checks the current data on local storage
        }, function () {
          setState(function (prevState) {
            return _extends({}, prevState, {
              error: true,
              loading: false
            });
          });
        });

        return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
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

  if (!state.loading && !state.show) return null;
  return React__default.createElement(Container, {
    ref: testRef,
    emitter: onEmitter
  }, state.component);
};

var Variant = function Variant(_ref3) {
  var children = _ref3.children,
      name = _ref3.name;
  return React__default.cloneElement(React__default.createElement(React.Fragment, null), {
    name: name
  }, React__default.createElement(React.Fragment, null, children));
};

Variant.displayName = "ABTest.Variant";
ABTest.Variant = Variant;

var queryBuilder = function queryBuilder(params) {
  var esc = encodeURIComponent;
  return Object.keys(params).filter(function (key) {
    return params[key] !== undefined && params[key] && params[key] !== null;
  }).map(function (key) {
    return esc(key) + "=" + esc(params[key]);
  }).join("&");
};

var handleFetch = function handleFetch(url, name, params) {
  try {
    return Promise.resolve(_catch(function () {
      var query = queryBuilder({
        name: name,
        country: params.country,
        client: params.client,
        clientType: params.clientType
      });
      return Promise.resolve(fetch(url + "?" + query, {
        method: "GET"
      })).then(function (response) {
        return Promise.resolve(response.json()).then(function (_ref) {
          var segment = _ref.segment;
          var show = segment.length > 0;
          return {
            segment: segment,
            show: show,
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

var useSegment = function useSegment(name, params, localStorage) {
  if (localStorage === void 0) {
    localStorage = false;
  }

  var context = useUpStampsContext();

  var _useState = React.useState({
    loading: true,
    error: false,
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/segment";
  React.useEffect(function () {
    var onFetch = function onFetch() {
      try {
        var _temp3 = _catch(function () {
          return Promise.resolve(localForage.getItem(name)).then(function (storageData) {
            var _temp = function () {
              if (localStorage && storageData !== null) {
                console.log("useSegment local");
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: isEqual(params, storageData.params),
                    loading: false
                  });
                });
              } else {
                return Promise.resolve(handleFetch(url, name, params)).then(function (_ref) {
                  var show = _ref.show,
                      loading = _ref.loading;
                  console.log("useSegment remote");
                  setState(function (prevState) {
                    return _extends({}, prevState, {
                      show: show,
                      loading: loading
                    });
                  }); //Updates local storage with the new data

                  return Promise.resolve(localForage.setItem(name, {
                    show: show,
                    loading: loading,
                    params: params
                  })).then(function () {});
                });
              }
            }();

            if (_temp && _temp.then) return _temp.then(function () {});
          }); //Checks the current data on local storage
        }, function () {
          setState(function (prevState) {
            return _extends({}, prevState, {
              error: true,
              loading: false
            });
          });
        });

        return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    onFetch();
  }, [name, context.state.params]);
  return {
    show: state.show,
    error: state.error,
    loading: state.loading
  };
};

var Segment = function Segment(_ref) {
  var children = _ref.children,
      name = _ref.name,
      params = _ref.params,
      _ref$localStorage = _ref.localStorage,
      localStorage = _ref$localStorage === void 0 ? false : _ref$localStorage;
  var context = useUpStampsContext();

  var _useState = React.useState({
    loading: true,
    error: false,
    show: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey,
      envKey = _context$state$params.envKey;
  var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/segment";
  React.useEffect(function () {
    var onFetch = function onFetch() {
      try {
        var _temp3 = _catch(function () {
          return Promise.resolve(localForage.getItem(name)).then(function (storageData) {
            var _temp = function () {
              if (localStorage && storageData !== null) {
                console.log("Segment local = ");
                setState(function (prevState) {
                  return _extends({}, prevState, {
                    show: isEqual(params, storageData.params),
                    loading: false
                  });
                });
              } else {
                return Promise.resolve(handleFetch(url, name, params)).then(function (_ref2) {
                  var show = _ref2.show,
                      loading = _ref2.loading;
                  console.log("Segment remote");
                  setState(function (prevState) {
                    return _extends({}, prevState, {
                      show: show,
                      loading: loading
                    });
                  }); //Updates local storage with the new data

                  return Promise.resolve(localForage.setItem(name, {
                    show: show,
                    loading: loading,
                    params: params
                  })).then(function () {});
                });
              }
            }();

            if (_temp && _temp.then) return _temp.then(function () {});
          }); //Checks the current data on local storage
        }, function () {
          setState(function (prevState) {
            return _extends({}, prevState, {
              error: true,
              loading: false
            });
          });
        });

        return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    };

    onFetch();
  }, [name, context.state.params]); //Hide the feature

  if (!state.show) return null;
  return React__default.createElement(React.Fragment, null, children);
};

var ScopesContext =
/*#__PURE__*/
React.createContext({});

var reducer$1 = function reducer(state, action) {
  switch (action.type) {
    case "set-scope":
      return _extends({}, state, {}, action.payload);

    case "set-scope-error":
      return _extends({}, state, {}, action.payload);

    default:
      throw new Error("Unhandled action type");
  }
};

var ScopesProvider = function ScopesProvider(_ref) {
  var children = _ref.children,
      name = _ref.name,
      email = _ref.email;
  var context = useUpStampsContext();
  var params = {
    name: name,
    email: email
  };

  var _useReducer = React.useReducer(reducer$1, {
    loading: true,
    error: false,
    params: params
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var _context$state$params = context.state.params,
      clientId = _context$state$params.clientId,
      projectKey = _context$state$params.projectKey;
  var value = React.useMemo(function () {
    return {
      state: state,
      dispatch: dispatch
    };
  }, [state, dispatch]);
  React.useEffect(function () {
    var ignore = false;

    var onSetScope = function onSetScope() {
      try {
        var _temp2 = _catch(function () {
          //Service Url
          var url = apiUrl + "/" + clientId + "/" + projectKey + "/scopes/add";
          var post_body = {
            name: name,
            email: email
          };
          return Promise.resolve(fetch(url, {
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(post_body)
          })).then(function () {
            window.localStorage.setItem("upstamps_scope_email", email);

            if (!ignore) {
              dispatch({
                type: "set-scope",
                payload: {
                  success: true,
                  loading: false
                }
              });
            }
          });
        }, function () {
          dispatch({
            type: "set-scope-error",
            payload: {
              loading: false,
              error: true
            }
          });
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    }; //Get the email from localStorage


    var storageEmail = window.localStorage.getItem("upstamps_scope_email"); //Only set a scope if the email is null or different

    if (storageEmail !== email) {
      onSetScope();
    }

    return function () {
      ignore = true;
    };
  }, [email]);
  return React__default.createElement(ScopesContext.Provider, {
    value: value
  }, children);
};

exports.ABTest = ABTest;
exports.Flag = Flag;
exports.RemoteFlag = RemoteFlag;
exports.ScopesContext = ScopesContext;
exports.ScopesProvider = ScopesProvider;
exports.Segment = Segment;
exports.UpStampsContext = UpStampsContext;
exports.UpStampsProvider = UpStampsProvider;
exports.useABTest = useABTest;
exports.useFlag = useFlag;
exports.useRemoteFlag = useRemoteFlag;
exports.useSegment = useSegment;
//# sourceMappingURL=upstamps-react.cjs.development.js.map
