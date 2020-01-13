import { __assign } from 'tslib';
import React, { createContext, useState, useEffect, useContext, Fragment } from 'react';

var UpStampsContext =
/*#__PURE__*/
createContext({});
var UpStampsProvider = function UpStampsProvider(_a) {
  var children = _a.children;

  var _b = useState({
    name: "Johhn",
    flags: ["car", "chat", "profile", "drawer"]
  }),
      state = _b[0],
      dispatch = _b[1];

  var _c = useState({
    state: state,
    dispatch: dispatch
  }),
      contextValue = _c[0],
      setContextValue = _c[1]; // Update context value and trigger re-render
  // This patterns avoids unnecessary deep renders
  // https://reactjs.org/docs/context.html#caveats


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
  return {
    show: state.flags.indexOf(name) !== -1
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
//# sourceMappingURL=upstamps-react-sdk.esm.js.map
